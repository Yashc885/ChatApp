import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getUserForSidewar} from "../controllers/userController.js";
const router = express.Router();

router.get("/",protectRoute ,getUserForSidewar)

export default router;