configDotenv();
import { configDotenv } from "dotenv";
import firebase from "../config/firebaseConfig.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const authenticate = async (req, res) => {
  const { username, password } = req.body;
  try {
    const adminSnapshot = await firebase
      .collection("admin")
      .where("username", "==", username)
      .get();

    if (adminSnapshot.empty) {
      return res.status(401).json({ message: "invalid credentials!" });
    }

    const adminData = adminSnapshot.docs[0].data();
    const passwordMatch = await argon2.verify(adminData.passwordHash, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: adminData._id, username: adminData.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      admin: { username: adminData.username, token },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { authenticate };
