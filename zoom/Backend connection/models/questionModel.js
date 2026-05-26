import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    company: {
        type: String,
        required: true
    },
    companyAbbreviation: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    roleDescription: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    focusAreas: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
