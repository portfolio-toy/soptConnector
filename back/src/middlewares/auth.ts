import jwt from "jsonwebtoken";
import config from "../config";

export default (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.body.user = decoded.user;
    next(); //middleware의 핵심기능. auth라는 middleware를 통과해야 로직대로 흘러갈 수 있다.
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};