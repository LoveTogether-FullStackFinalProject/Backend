
import env from "dotenv";
console.log(process.env.NODE_ENV);
env.config();

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_URL);
import initApp from "./App";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from "path";



initApp().then((app) => {
  console.log('Server started')
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Vehahavtem Together 2024",
        version: "1.0.1",
        description: "Full Stack Project 2024",
      },
      //servers: [{ url: "http://localhost:3000", },],
      servers: [{ url: "https://ve-be.cs.colman.ac.il", },],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 

  if (process.env.NODE_ENV !== 'production') {
    console.log('development');
    http.createServer(app).listen(process.env.PORT);
  }
  else {
  console.log('PRODUCTION');
  const keyPath = path.join(__dirname, '../../myserver.key');
  const certPath = path.join(__dirname, '../../CSB.crt');

  console.log('Key Path:', keyPath);
  console.log('Cert Path:', certPath);

  const options2 = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  console.log("ENV:", process.env.NODE_ENV);
  const server = https.createServer(options2, app);

  console.log("HTTPS_PORT:", process.env.HTTPS_PORT);
  server.listen(process.env.HTTPS_PORT, () => {
    console.log("HTTPS server running on port", process.env.HTTPS_PORT);
  });

  server.on('error', (error) => {
    console.error('HTTPS server error:', error);
  });

  }
});