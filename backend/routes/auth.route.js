import experss from "express";
import {verifyJwtToken }from "../middleware/verifyJwtToken.js"
import {signup,login,logout,verifyEmail,forgotPassword,resetPassword,checkAuth} from "../controllers/auth.controller.js"
const router = experss.Router();

router.get("/check-auth",verifyJwtToken,checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;