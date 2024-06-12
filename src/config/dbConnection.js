import mongoose from "mongoose"

mongoose.set('strictQuery', false);

const connectToDB = async () => {
    console.log(process.env.DATABASE_PASSWORD);
    const {connection} = await mongoose.connect(process.env.DB_URL);

    if(connection) {
        console.log(`Database connected at ${connection.host}`);
    }
}

export default connectToDB;