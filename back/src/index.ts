import express from "express";
const app = express();
import connectDB from "./Logger/db";

// Connect Database
connectDB();

<<<<<<< HEAD
// 이 코드가 업스면 json 인식을 못해..
=======
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
app.use(express.json());

// Define Routes
app.use("/api/users", require("./api/users"));
app.use("/api/profile", require("./api/profile"));
app.use("/api/auth", require("./api/auth"));

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