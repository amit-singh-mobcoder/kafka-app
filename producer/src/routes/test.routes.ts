import { Router, RequestHandler } from "express";
import { TestController } from "../controllers/test.controller";
const router = Router()
const testController = new TestController();

router.route('/').post(testController.test as RequestHandler)

export default router;