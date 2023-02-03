const express = require("express");
const scriptfs = require("./scripts/fs");

const router = express.Router();
const { validateUser } = require("./midleware/validator");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./midleware/Password");
const usersControllers = require("./controllers/usersControllers");
const speedApiControllers = require("./controllers/speedApiControllers");
const speedrunControllers = require("./controllers/speedrunsControllers");
const katasControllers = require("./controllers/katasControllers");
const scoresControllers = require("./controllers/scoresControllers");
// const itemControllers = require("./controllers/itemControllers");

router.use(express.json());
router.post("/readfs", scriptfs.readallfiles);
router.post("/login", usersControllers.login, verifyPassword);
router.post("/register", validateUser, hashPassword, usersControllers.add);
// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

router.use(verifyToken);
router.get("/speedrun/api", speedApiControllers.call);
router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", validateUser, hashPassword, usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

router.get("/sr", speedrunControllers.browse);
router.get("/katas/:id", katasControllers.read);
router.post("/scores", scoresControllers.add);
router.put("/scores/:id", scoresControllers.edit);
router.get("/scores/:id", scoresControllers.read);
router.get("/katas/:iduser/:id", katasControllers.read);

module.exports = router;
