import firebase from "../config/firebaseConfig.js";

const getAllProjects = async (req, res) => {
  try {
    const projects = {
      website: [],
      mobile: [],
      uiux: [],
      fullstack: [],
    };

    for (const category of Object.keys(projects)) {
      const querySnapshot = await firebase.collection(category).get();
      projects[category] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
    res.status(200).json(projects);
  } catch (error) {
    console.log("Failed to get all projects", error);
    res.status(500).json(error);
  }
};
const getMainProjects = async (req, res) => {
  try {
    const projects = {
      website: [],
      mobile: [],
      uiux: [],
      fullstack: [],
    };

    for (const category of Object.keys(projects)) {
      const mainQuerySnapshot = await firebase
        .collection(category)
        .where("main", "==", true)
        .get();
      projects[category] = mainQuerySnapshot.docs.map((doc) => doc.data());
    }

    res.status(200).json(projects);
  } catch (error) {
    console.log("Failed to get main projects", error);
    res.status(500).json(error);
  }
};

export { getAllProjects, getMainProjects };
