import dbConnect from "@/lib/dbConnect";
import Detections from "@/lib/models/Detections";

export default async function handler(req, res){
    await dbConnect();

    if(req.method==='GET'){
        try{
            const detections=await Detections.find({});
            res.status(200).json({success: true, data: detections});
        } catch(error){
            res.status(500).json({success: false, error: error.message});
        }
    }else{
        res.status(405).json({success: false, message: 'Method not allowed'})
    }
}