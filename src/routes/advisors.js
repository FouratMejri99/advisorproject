import express from "express";
import Advisor from "../models/Advisor.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, price, apartmentType, postalCode } = req.body;

  if (!username || !password || !price || !apartmentType || !postalCode) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const existing = await Advisor.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newAdvisor = new Advisor({
    username,
    password,
    price,
    apartmentType,
    postalCode,
  });

  await newAdvisor.save();
  res.status(201).json({ message: "Advisor signed up successfully" });
});

export default router;
