import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js"
import * as topicsController from "./controllers/topicsController.js"
import * as questionController from "./controllers/questionController.js"
import * as quizController from "./controllers/quizController.js"
import * as answerController from "./controllers/answerController.js"
import * as questionAPI from "./apis/questionAPI.js"
const router = new Router();

router.get("/", mainController.showMain);
router.get("/auth/register", registrationController.showRegistrationForm)
router.post("/auth/register", registrationController.registerUser)
router.get("/auth/login", loginController.showLoginForm)
router.post("/auth/login", loginController.processLogin)
router.get("/topics", topicsController.showTopics)
router.post("/topics", topicsController.insertTopic)
router.post("/topics/:id/delete", topicsController.removeTopic)
router.get("/topics/:tId", questionController.showQuestions)
router.get("/topics/:tId/questions", questionController.showQuestions)
router.post("/topics/:tId/questions", questionController.appendQuestion)
router.get("/topics/:id/questions/:qId", questionController.showQuestion)
router.post("/topics/:id/questions/:qId/options", answerController.appendAnswer)
router.post("/topics/:id/questions/:qId/options/:oId/delete", answerController.removeAnswer)
router.post("/topics/:id/questions/:qId/delete", questionController.removeQuestion)
router.get("/quiz", quizController.showTopics)
router.get("/quiz/:tId", quizController.getRandomQuestion)
router.get("/quiz/:tId/questions/:qId", quizController.showOptions)
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.checkAnswer)
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer)
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectAnswer)
router.get("/api/questions/random", questionAPI.getRandomQuestion)
router.post("/api/questions/answer", questionAPI.getValidityOfAnswer)
export { router };