// express는 프레임 워크인데 서버 구축을 도와주는 프레임 워크이다. 
import express from "express";

const app = express();

// 이건 데이터 베이스에 붙여주는 것.
// 우리는 몽고 db를 사용할텐데 관련 코드는 3주차 이후에 알게 될 것.
import connectDB from "./Logger/db";

// Connect Database
connectDB();

app.use(express.json());

// Define Routes
app.use("/api/users", require("./api/users"));


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
