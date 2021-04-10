import express from "express"; //express: 서버의 구동을 도와주는 아이
const app = express(); 
import connectDB from "./Logger/db"; // 데이터베이스와 연결

// Connect Database
connectDB();

// input을 json형태(객체형태)로 받는다!
app.use(express.json());

// Define Routes
app.use("/api/users", require("./api/users"));
// app.use("/api/profile", require("./api/profile"));

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
