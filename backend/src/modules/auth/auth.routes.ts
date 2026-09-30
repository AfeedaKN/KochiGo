import { Router } from "express";
import authController from "./auth.controller";
import { authMiddleware } from "./auth.midddleware";

const router = Router();

router.post("/register", (req, res) => {
  authController.register(req, res);
});

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.get("/profile", authMiddleware, (req, res) => {
  authController.getProfile(req, res);
});

export default router;