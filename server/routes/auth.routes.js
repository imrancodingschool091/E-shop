import express from "express";
import { getProfile, login, logout, refresh, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router=express.Router();

router.post("/register",validate(registerSchema), register);
router.post("/login", validate(loginSchema),login);
router.post("/refresh",refresh)
router.post("/logout",logout);
router.get("/me",authMiddleware,getProfile);

export default router