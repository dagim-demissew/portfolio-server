configDotenv();
import { configDotenv } from "dotenv";
import { authenticate } from "./controllers/auth-controller.js";
import { verifyToken } from "./middleware/auth.js";
import adminRoute from "./routes/admin-route.js";
import projectRoutes from "./routes/projects-route.js";
import cors from "cors";

import e from "express";
const PORT = process.env.PORT || 5000;

const app = e();

app.use(e.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//verfies login to admin panel
app.post("/login", authenticate);

// app.use(cors({ origin: ["http://localhost:3000", "https://your-frontend-domain.com"] }));

app.use("/", projectRoutes);
app.use("/admin", verifyToken, adminRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
