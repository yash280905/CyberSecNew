
Intrusion Detection System (IDS) Project

This is  built by our team to detect bad stuff (like cyberattacks) happening on a computer network. Think of it as a security guard for the internet! We’ve combined machine learning, live traffic sniffing, and a smart language model to make it work. Here’s a simple guide to understand what we’ve done and how to use it.

What Does This Project Do?
- Spot Threats : It checks network packets (tiny data pieces traveling online) to see if they’re normal or harmful.
- Learn from Data : Uses a machine learning model to figure out what’s suspicious.
- Sniff Live Traffic : Watches network activity in real-time using a tool called Wireshark.
- Explain Simply : A language model tells you in easy words if something’s a threat and what it might be (e.g., a DDoS attack or port scanning).

How It Works
1. Training Module : 
   - We fed it a big dataset (like a list of past network activities) to teach the system what normal and bad packets look like.
   - It uses a Decision Tree (a smart decision-making tool) to learn patterns and predict threats.
   - The trained model is saved so we can use it later.

2. Sniffing Module :
   - This part acts like a spy, capturing live network packets using Wireshark.
   - It pulls out important details (like time, source, destination, and data size) and checks them with our trained model.
   - If something looks fishy, it flags it as "Benign" or "Malicious."

3. LLM Module :
   - A smart language model (like a chatbot) takes the flagged packets and explains them in simple language.
   - You can ask it, “Is this a threat? What kind?” and it gives a short, easy answer.
   - It runs as a web app using FastAPI, so you can send packet details and get responses.



