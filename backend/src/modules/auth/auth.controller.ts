import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await authService.register(req.body);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Registration failed",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        message: "Login successful",
        ...result,
      });
    } catch (error) {
      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    }
  }
async getProfile(req: Request, res: Response): Promise<void> {
  try {
    const user = await authService.getProfile(req.userId!);

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "User not found",
    });
  }
}

}

export default new AuthController();