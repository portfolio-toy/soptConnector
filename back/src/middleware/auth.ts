import jwt from "jsonwebtoken";
import config from "../config";

export default (req, res, next) => {
<<<<<<< HEAD
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
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
=======
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
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
