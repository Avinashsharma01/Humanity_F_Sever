import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successful");
    } catch (error) {
        console.log(error, "Not connect to db");
    }
}


export default connectToDB