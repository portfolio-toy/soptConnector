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

    req.body.user = decoded.user; // req 객체에 임의의 값을 넣어서 사용 -> 에러 발생 방지를 위해 express가 제공하는 타입에 user 속성을 더해야 함.
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid "});
  }
};