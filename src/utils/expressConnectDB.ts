import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const expressConnectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_DB;
    if (!mongoURI) {
      throw new Error('MONGO_DB environment variable not set');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default expressConnectDB;
