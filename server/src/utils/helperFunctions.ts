
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";


export const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 6;
  let code = "";

  // Generate random bytes (secure random number) and map them to characters
  for (let i = 0; i < codeLength; i++) {
    // Generate random byte (0 to 255)
    const randomByte = crypto.randomBytes(1)[0];

    // Map the random byte to a character from the defined set
    const characterIndex = randomByte % characters.length;
    code += characters.charAt(characterIndex);
  }

  return code;
};

// Function to generate JWT tokens
export const generateJwt = (userId: string, expiresTime: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "", {
    expiresIn: expiresTime,
  });
};

// function to get a random number 
export const getRandomNumber = (min: number = 0, max: number = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};