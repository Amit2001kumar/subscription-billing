import express from "express";
import usageRoutes from "./routes/usage.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/usage", usageRoutes);
app.use("/users", userRoutes);

export default app;
