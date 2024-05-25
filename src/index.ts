import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import {v2 as cloudinary} from 'cloudinary';
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute"
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=> console.log("coonected successfully to db"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app= express(); //create new express server and initialize to app
app.use(express.json()) //json is called the middleware it will automatically convert the body of any request we make to our API server to Json so that we dont have to do this ourselves in every request

app.use(cors())

// app.get("/test", async(req: Request, res: Response)=> {
//     res.json({message: "Hello!"});
// });
app.get("/health", async (req: Request, res: Response)=> {
    res.send({ message: "health OK!"});
});

// whenever listen to /api/my/user the below run is going to run
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.listen(5000, ()=> {
    console.log("server started on localhost:5000")
})