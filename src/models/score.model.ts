import mongoose, { Document, Schema } from 'mongoose';

export interface IScore extends Document {
  Name: string;
  startTime: Date;
  endTime: Date;
  guesses: any[]; // Adjust this type according to your actual data structure
  score: number;
  letterCount: number;
  letterRepeat: boolean;
}

const scoreSchema: Schema = new Schema({
  Name: {
    type: String,
    required: true,
    minlength: 1,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  guesses: {
    type: Array,
    required: true,
    default: [],
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  letterCount: {
    type: Number,
    required: true,
    min: 1,
  },
  letterRepeat: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IScore>('Score', scoreSchema);
