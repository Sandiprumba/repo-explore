import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: process.env.CLIENT_BASE_URL + "/login" }), function (req, res) {
  res.redirect(process.env.CLIENT_BASE_URL);
});

//check whether user authenticated !
router.get("/check", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.send({ user: req.user });
    } else {
      res.send({ user: null });
    }
  } catch (error) {
    console.log(error, "Error in checking check endpoint");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session", err);
      res.status(500).json({ error: "Failed to logout" });
    } else {
      res.json({ message: "Logged out" });
    }
  });
});
export default router;
