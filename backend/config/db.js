import mongoose from "mongoose";

const connectDB = async () => {
    const Mongo_url=process.env.MONGODB_URI
    try {
        const conn = await mongoose.connect(Mongo_url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;