const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const fs = require("fs");
const https = require("https");

const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Determine server URL for Swagger based on environment
const isLocal = process.env.NODE_ENV !== "production";
const swaggerServerUrl =
  process.env.SWAGGER_SERVER_URL || "https://careerproject-2.onrender.com";

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User Auth API",
      version: "1.0.0",
      description: "Signup and Login endpoints",
    },
    servers: [
      {
        url: swaggerServerUrl,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("Swagger docs available at:", swaggerServerUrl + "/api-docs");

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connect & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    if (isLocal) {
      // Run HTTPS server locally (requires server.cert and server.key)
      const sslOptions = {
        key: fs.readFileSync("./ssl/server.key"),
        cert: fs.readFileSync("./ssl/server.cert"),
      };

      https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`HTTPS Server running at https://localhost:${PORT}`);
      });
    } else {
      // Run HTTP server on platforms like Render (Render auto-upgrades to HTTPS)
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
