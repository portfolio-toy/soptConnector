"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.default = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.body.user = decoded.user;
        next(); //middleware의 핵심기능. auth라는 middleware를 통과해야 로직대로 흘러갈 수 있다. router하기 전에 미들웨어로 검사하는데 검사 후 router로 넘겨준다는 뜻
    }
    catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
//# sourceMappingURL=auth.js.map