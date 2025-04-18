import pyshark
import joblib
import requests

global model
model = joblib.load('intrusion_detector_new.joblib')

global conn_state_mapping
conn_state_mapping = {
    '0x0000': 0, '0x0010': 6, '0x0020': 7, '0x0030': 8,
    '0x0040': 9, '0x0050': 10, '0x0060': 1, '0x0070': 2,
    '0x0080': 3, '0x0090': 4, '0x00A0': 5
}

global proto_mapping
proto_mapping = {'icmp': 0, 'tcp': 1, 'udp': 2}

async def send_for_analysis(details):
    resp=await requests.post("http://localhost:8000/analyze", json=details)
    resp=resp.content
    return resp

try:
    # Capture network traffic on the first available network interface
    capture = pyshark.LiveCapture(interface="Wi-Fi")
except pyshark.capture.capture.TSharkNotFoundException:
    print("TShark not found. Please ensure Wireshark is installed and in PATH.")
    exit(1)
except Exception as e:
    print(f"Error initializing capture: {e}")
    exit(1)

# Initialize results list
results = []

detection_attributes = ['ts', 'originPort', 'respPort', 'proto', 'duration', 'orig_bytes',
                        'conn_state', 'orig_pkts', 'orig_ip_bytes']

# Iterate over captured packets
for pkt in capture:
    try:
        packet_data = {
            'ts': pkt.sniff_time.timestamp() if hasattr(pkt, 'sniff_time') else None,
            'proto': proto_mapping.get(pkt.transport_layer, None),
            'orig_bytes': len(pkt) if hasattr(pkt, 'length') else None,
            'orig_pkts': 1,  # Each iteration corresponds to one packet
        }

        # Check IP layer for origin/response hosts
        if 'IP' in pkt:
            packet_data.update({
                'originIP': pkt.ip.src,
                'respIP': pkt.ip.dst,
                'orig_ip_bytes': int(pkt.length),
            })

        # Check for TCP/UDP layer to get ports and other attributes
        if 'TCP' in pkt or 'UDP' in pkt:
            transport_layer = pkt.tcp if 'TCP' in pkt else pkt.udp
            packet_data.update({
                'originPort': getattr(transport_layer, 'srcport', None),
                'respPort': getattr(transport_layer, 'dstport', None),
                'conn_state': conn_state_mapping.get(getattr(transport_layer, 'flags', None)),
                'seq': getattr(transport_layer, 'seq', None),
                'ack': getattr(transport_layer, 'ack', None),
                'window': getattr(transport_layer, 'window', None),
                'checksum': getattr(transport_layer, 'checksum', None),
                'urp': getattr(transport_layer, 'urp', None),
            })

        # Collect additional fields if available
        if hasattr(pkt, 'frame_info'):
            packet_data.update({
                'duration': pkt.frame_info.time_delta_displayed,
                'history': pkt.frame_info.protocols,
            })

        # Append packet data to results
        results.append(packet_data)

        # Prepare features and make prediction
        try:
            values = [packet_data[key] for key in detection_attributes]
            prediction = model.predict([values])
            prediction = 'Benign' if prediction == [0] else 'Malicious'
            if(prediction=="Malicious"):
                resp=send_for_analysis(packet_data)
                print(resp)
        except (KeyError, ValueError, TypeError) as e:
            prediction = f"Prediction Error: {e}"

        # Print packet details
        print(packet_data)
        print(prediction)
        print("------------------------")

    except AttributeError:
        print("Packet missing expected attributes. Skipping...")
        print("------------------------")
        continue
    except Exception as e:
        print(f"Unexpected error processing packet: {e}")
        print("------------------------")
        continue

# Close the capture
capture.close()
