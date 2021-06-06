"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //서버 구축 도와주는 친구
const app = express_1.default();
const db_1 = __importDefault(require("./Logger/db")); //데베에 붙여주는 것
// Connect Database
db_1.default();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// Define Routes
app.use("/api/users", require("./api/users"));
app.use("/api/profile", require("./api/profile"));
app.use("/api/posts", require("./api/post"));
app.use("/api/auth", require("./api/auth"));
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    //클라이언트의 환경이 production이면 locals에 error를 세팅하겠다는 뜻
    //환경변수는 보통 development(개발), testing(테스트), staging(상용 테스트), production(상용)
    // render the error page
    res.status(err.status || 500);
    res.render("error"); // error를 렌더링해서 보내겠다
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
//# sourceMappingURL=index.js.map