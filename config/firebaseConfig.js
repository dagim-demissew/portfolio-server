import admin from "firebase-admin";
import { config } from "dotenv";
import fs from "fs";
config();

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../firebase-service-account.json", import.meta.url))
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

const firebase = admin.firestore();
export default firebase
