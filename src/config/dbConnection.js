import mongoose from "mongoose"

mongoose.set('strictQuery', false);
const mongo_uri = 'mongodb://localhost:27017';
const connectToDB = async () => {
    console.log(process.env.DATABASE_PASSWORD);
    const {connection} = await mongoose.connect(mongo_uri);

    if(connection) {
        console.log(`Database connected at ${connection.host}`);
    }
}

export default connectToDB;