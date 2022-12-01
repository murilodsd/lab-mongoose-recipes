import mongoose from "mongoose";
import RecipeModel from '../models/Recipe.model.js';

async function connect() {
    try{
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to the database: "${dbConnect.connection.name}"`);
    }
    catch(e){
        console.error('Error connecting to the database', e);
    }
}
export default connect;


