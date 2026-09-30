import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("KochiGo backend is running");
});

export default app;