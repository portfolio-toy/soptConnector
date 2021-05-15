import express from "express"; //서버 구축 도와주는 친구
const app = express();
import connectDB from "./Logger/db"; //데베에 붙여주는 것

// Connect Database
connectDB();

app.use(express.json());

// Define Routes
app.use("/api/profile", require("./api/profile"));
app.use("/api/users", require("./api/users"));
app.use("/api/auth", require("./api/auth"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {}; //여기가 무슨 뜻일까?.....?.....

  // render the error page
  res.status(err.status || 500);
  res.render("error"); //render이 뭘까..? 뭔가를 만들어..?
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
