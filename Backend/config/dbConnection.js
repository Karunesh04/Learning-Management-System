import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectToDB = async ()=>{
    try{
        const {connection} = mongoose.connect(
            process.env.MONGO_URI
        )

        if(connection){
            console.log(`Connection to MongoDB: ${connection.host}`);
        }
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectToDB