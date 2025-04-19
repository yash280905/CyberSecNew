import mongoose from "mongoose";

const DetectionSchema=new mongoose.Schema({
    detectedAt:{
        type: Date,
        default: Date.now
    },
    details: {
        type: Object,
        required: true
    },
    interpretation: {
        type: String,
        required: true
    }
})

export default mongoose.models.Detections || mongoose.model('Detections', DetectionSchema)