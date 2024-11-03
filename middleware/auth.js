configDotenv();
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Authorization failed! No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    req.adminId = decoded.id;
    next();
  });
};

export { verifyToken };
