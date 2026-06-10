import upload from "@/configs/upload";
import { Request, Response } from "express";
import z from "zod";

export class UploadsController {
  async create(request: Request, response: Response) {
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, "Arquivo é obrigatório"),
          mimetype: z
            .string()
            .refine(
              (type) => upload.ACCEPTED_IMAGE_TYPES.includes(type),
              `Formato de arquivo inválido. Formatos permitidos: ${upload.ACCEPTED_IMAGE_TYPES}`,
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= upload.MAX_SIZE,
              `Arquivo excede o tamanho máximo de ${upload.MAX_SIZE}`,
            ),
        })
        .passthrough();

      const { file } = fileSchema.parse(request.file);
    } catch (error) {
      throw error;
    }
  }
}
