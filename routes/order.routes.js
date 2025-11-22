import express from "express";
import {
  createOrder,

  q1,q2,q3,q4,q5,
  q6,q7, q8, q9,
  q10,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/q1", q1);
router.get("/q2", q2);
router.get("/q3", q3);
router.get("/q4", q4);
router.get("/q5", q5);
router.get("/q6", q6);
router.get("/q7", q7);
router.get("/q8", q8);
router.get("/q9", q9);
router.get("/q10", q10);

export default router;
