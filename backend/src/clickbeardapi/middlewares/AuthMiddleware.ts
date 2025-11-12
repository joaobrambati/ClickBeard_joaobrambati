import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ mensagem: "Token não fornecido" });

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).usuario = usuario;
    next();
  } catch {
    return res.status(403).json({ mensagem: "Token inválido" });
  }
}

export function somenteAdmin(req: Request, res: Response, next: NextFunction) {
  const usuario = (req as any).usuario;
  if (usuario?.tipo !== "admin") {
    return res.status(403).json({ mensagem: "Acesso restrito a administradores" });
  }
  next();
}
