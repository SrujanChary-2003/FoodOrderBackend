import { ObjectId } from "mongodb";
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        auth0Id:{
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        email:{
            type:String,
        },
        addressLine1:{
            type:String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        }
    }
);

const User = mongoose.model("User", userSchema);
export default User;