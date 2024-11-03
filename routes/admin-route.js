import express from "express";
import { getAllProjects } from "../controllers/projects-controller.js";
import {
  deleteProject,
  editProject,
  uploadProject,
  getAllService,
  addService,
  deleteService,
} from "../controllers/admin-controller.js";
const router = express.Router();

// gets all the projects for display
router.get("/projects", getAllProjects);

//create new project
router.post("/newProject", uploadProject);

//updates a project
router.put("/update/:pid", editProject);

//deletes a project
router.post("/delete/:pid", deleteProject);

//gets all the services provided
router.get("/servies", getAllService);

//adds a new service
router.post("/newService", addService);

//deletes an existing service
router.delete("/deleteService/:sid", deleteService);

export default router;
