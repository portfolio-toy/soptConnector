import express from "express";
const app = express();
import connectDB from "./Logger/db";

// Connect Database
connectDB();

app.use(express.json());

// Define Routes
app.use("/api/users", require("./api/users"));
app.use("/api/profile", require("./api/profile"));
app.use("/api/auth", require("./api/auth"));
// Define Routes

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
  import dotenv from "dotenv";

  // Set the NODE_ENV to 'development' by default
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process
  
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
  
  export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
  
    /**
     * That long string from mlab
     */
    mongoURI: process.env.MONGODB_URI,
  
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
  
    /**
     * Your secret sauce
     */
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_SECRET,
  };