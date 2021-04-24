import express from "express"; // [1]
const app = express(); // [2]
import connectDB from "./Logger/db";

// Connect Database
connectDB();

app.use(express.json()); // [3]

// Define Routes
app.use("/api/users", require("./api/users")); // [4]

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app // [5]
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