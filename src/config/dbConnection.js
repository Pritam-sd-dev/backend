import mongoose from "mongoose"

mongoose.set('strictQuery', false);
const mongo_uri = 'mongodb+srv://root:root@cluster0.sn6zeyu.mongodb.net/twitter_db';
const connectToDB = async () => {
    console.log(process.env.DATABASE_PASSWORD);
    const {connection} = await mongoose.connect(mongo_uri);

    if(connection) {
        console.log(`Database connected at ${connection.host}`);
    }
}

export default connectToDB;