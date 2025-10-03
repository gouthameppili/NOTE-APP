import express from 'express';
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json()); // this middleware will parse json bodies: req.body
app.use(rateLimiter);




app.use("/api/notes", notesRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
   