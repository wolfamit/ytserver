import mongoose from "mongoose"

const connectionToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://shivammahrolia:Pnl5GUXmPk5r6hpZ@cluster0.r11islc.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0");
        console.log("db connected successfully")
    } catch (error) {
        console.log("db connected get error ",error.message)
        
    }
}

export default connectionToDatabase;