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
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

// Load environment variables conditionally
if (process.env.NODE_ENV === "production") {
  env.config({ path: ".env.prod" });
} else {
  env.config({ path: ".env" });
}

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve, reject) => {
    // Add error handling and debug logging
    try {
      const db = mongoose.connection;
      db.once("open", () => console.log("Connected to Database"));
      db.on("error", (error) => {
        console.error("MongoDB connection error:", error);
        reject(error);
      });

      const url = process.env.DB_URL;
      if (!url) {
        throw new Error("DB_URL is not defined in the environment variables");
      }
      
      mongoose.connect(url)
        .then(() => {
          const app = express();
          app.use(cors());
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));

          app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "*");
            next();
          });

          const options = {
            definition: {
              openapi: "3.0.0",
              info: {
                title: "Vehahavtem Together 2024",
                version: "1.0.1",
                description: "Full Stack Project 2024",
              },
              servers: [{ url: "http://localhost:3000" }],
            },
            apis: ["./src/routes/*.ts"],
          };
          const specs = swaggerJsDoc(options);
          app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
          
          resolve(app);
        })
        .catch(error => {
          console.error("MongoDB connection error:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Initialization error:", error);
      reject(error);
    }
  });

  return promise;
};

export default initApp;