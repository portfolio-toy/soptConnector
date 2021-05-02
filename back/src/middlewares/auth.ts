import jwt from "jsonwebtoken";
import config from "../config";

export default (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token"); // 로그인했을 때 F12 > Header를 확인해보면 해당값이 들어가있다!

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.body.user = decoded.user; // req 객체에 임의의 값을 넣어서 사용해야하는 경우가 있다.
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};