import { Request, Response } from "express";
import { z } from "zod";

export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email({ message: "Email inválido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    response.json({ email, password });
  }
}
