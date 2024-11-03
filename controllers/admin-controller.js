import firebase from "../config/firebaseConfig.js";

const uploadProject = async (req, res) => {
  const { title, image, link, main, details } = req.body;
  let collectionRef;
  try {
    switch (title) {
      case "website":
        collectionRef = firebase.collection("website");
        break;
      case "uiux":
        collectionRef = firebase.collection("uiux");
        break;
      case "mobile":
        collectionRef = firebase.collection("mobile");
        break;
      case "fullstack":
        collectionRef = firebase.collection("fullstack");
        break;
      default:
        return res.status(400).json({ message: "Invalid project title" });
    }

    const docRef = await collectionRef.add({
      title,
      image,
      link,
      main,
      details,
    });
    res.status(200).json({ id: docRef.id, title, image, link, main, details });
  } catch (error) {
    console.log("Failed to create project", error);
    res.status(500).json({ message: "Error creating project", error });
  }
};

import admin from "firebase-admin";

// Assuming you have already initialized admin and firebase

const editProject = async (req, res) => {
  const projectId = req.params.pid; // Extract project ID from request params
  const { title, image, link, main, details } = req.body;

  const collectionMap = {
    website: "website",
    uiux: "uiux",
    mobile: "mobile",
    fullstack: "fullstack",
  };

  const collectionName = collectionMap[title];

  if (!collectionName) {
    return res.status(400).json({ message: "Invalid project title" });
  }

  try {
    const projectRef = firebase.collection(collectionName).doc(projectId); // Use Admin SDK method
    const projectSnapshot = await projectRef.get(); // Fetch the document

    if (!projectSnapshot.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    await projectRef.update({ title, image, link, main, details }); // Update the document
    res.status(200).json({ id: projectId, title, image, link, main });
  } catch (error) {
    console.log("Error while updating project", error);
    res.status(500).json({ message: "Error updating project", error });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.pid;
  const { title } = req.body;
  console.log(req.body);

  const collectionMap = {
    website: "website",
    uiux: "uiux",
    mobile: "mobile",
    fullstack: "fullstack",
  };

  const collectionName = collectionMap[title];

  if (!collectionName) {
    return res.status(400).json({ message: "Invalid project title" });
  }

  try {
    const projectRef = firebase.collection(collectionName).doc(projectId);
    await projectRef.delete();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error while deleting project", error);
    res.status(500).json({ message: "Error deleting project", error });
  }
};

const getAllService = async (req, res) => {
  try {
    const servicesRef = firebase.collection("services");
    const querySnapshot = await servicesRef.get();
    const services = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      frontend: services.filter((service) => service.title === "frontend"),
      backend: services.filter((service) => service.title === "backend"),
      uiux: services.filter((service) => service.title === "uiux"),
    });
  } catch (error) {
    console.log("Error while getting services", error);
    res.status(500).json(error);
  }
};

const addService = async (req, res) => {
  const { title, service } = req.body;
  console.log(req.body);
  try {
    const newService = {
      title: title,
      service: service,
    };
    const docRef = firebase.collection("services").doc();
    await docRef.set(newService);
    res.status(200).json({ id: docRef.id, title, service });
  } catch (error) {
    console.log("Error while creating service", error);
    res.status(500).json(error);
  }
};

const deleteService = async (req, res) => {
  const sid = req.params.sid;
  const serviceRef = firebase.collection("services").doc(sid);
  try {
    await serviceRef.delete();
    res.status(200).json({ message: "service deleted successfully" });
  } catch (error) {
    console.log("error while deleting the service", error);
    res.status(500).json(error);
  }
};

export {
  deleteProject,
  editProject,
  uploadProject,
  getAllService,
  addService,
  deleteService,
};
