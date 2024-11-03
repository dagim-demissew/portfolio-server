import express from "express";
import {
  getAllProjects,
  getMainProjects,
} from "../controllers/projects-controller.js";
import { getAllService } from "../controllers/admin-controller.js";

const router = express.Router();

// gets all the projects for display
router.get("/projects", getAllProjects);

//gets all the services provided
router.get("/servies", getAllService);

// gets main projects for display
router.get("/projectsMain", getMainProjects);

export default router;
