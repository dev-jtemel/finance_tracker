import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import './firebase';
import * as admin from 'firebase-admin';

import groceryRouter from './grocery/router';

dotenv.config();

admin.firestore().settings({ ignoreUndefinedProperties: true });

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/grocery', groceryRouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/", (_1: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});