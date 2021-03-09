import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const surveysUsersController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);

router.get("/answers/:value", answerController.execute);

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

router.post("/sendMail", surveysUsersController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };
