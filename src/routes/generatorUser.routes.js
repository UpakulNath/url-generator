import { Router } from "express";
import {
  login,
  registerUser
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  longUrlValidator
} from "../validators/index.js";
import { generateShortUrl } from "../controllers/url.controllers.js";

const router = Router()

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/generateURL").post(longUrlValidator(), validate, generateShortUrl);

export default router;

