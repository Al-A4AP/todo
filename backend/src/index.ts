import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.get("/api/todos", (req: Request, res: Response) => {
  const todos = [
    { id: 1, text: "Belajar Express", completed: false },
    { id: 2, text: "Integrasi dengan frontend", completed: true },
  ];
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
