import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import "./passport/github.auth.js";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
// import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
// const __dirname = path.resolve();

// console.log(__dirname);
//session manage data in web application its a middleware
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.get("/", (req, res) => {
  res.send("connected ");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

//frontend and baackend run in same port
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.listen(9000, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  connectMongoDB();
});
