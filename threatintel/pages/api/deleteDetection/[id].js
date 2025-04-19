import dbConnect from '@/lib/dbConnect';
import Detections from '@/lib/models/Detections';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const deletedDetection = await Detections.findByIdAndDelete(id);
      if (!deletedDetection) {
        return res.status(404).json({ success: false, message: 'Detection not found' });
      }
      res.status(200).json({ success: true, message: 'Detection deleted', data: deletedDetection }); // ✅ fixed
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
