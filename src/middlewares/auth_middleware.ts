import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Definisikan tipe kustom untuk Request yang menyertakan properti user
interface AuthenticatedRequest extends Request {
  user?: any; // Anda bisa mengganti 'any' dengan tipe yang lebih spesifik jika diperlukan
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Jika tidak ada token

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) return res.sendStatus(403); // Jika token tidak valid
    req.user = user;
    next(); // Lanjutkan ke handler berikutnya
  });
}
