import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AdminRoute from "./routes/admin_route";
import AuthRoute from "./routes/auth_route";
import DonationRoute from "./routes/donation_route";
import DonorRoute from "./routes/donor_route";
import FileRoute from "./routes/file_route";
import requestedDonationRoute from "./routes/requestedDonation_route";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import cors from "cors";


const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    let url;
    if(process.env.NODE_ENV === 'production'){
      url = process.env.DB_URL;
    }
    else{
      url = process.env.DB_URL_PROD;
    }
    console.log("url",url);
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
      })
      

      app.use(cors({
        origin: 'http://localhost:5173', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    }));
      app.use("/admin", AdminRoute);
      app.use("/auth", AuthRoute);
      app.use("/donation", DonationRoute);
      app.use("/donor", DonorRoute);
      app.use('/photos', FileRoute); 
      app.use("/requestedDonation", requestedDonationRoute);
      
      app.use('/public', express.static('public'));
      //   app.use(express.static('dist/client'))
    //   app.get('*',function (req, res) {
    //     res.sendfile('dist/client/index.html')
    //   });
       resolve(app);
    });
  });
  return promise;
};

export default initApp;
