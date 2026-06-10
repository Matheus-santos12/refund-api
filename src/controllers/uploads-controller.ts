import upload from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z, { ZodError } from "zod";

export class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage();

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

      const file = fileSchema.parse(request.file);
      const filename = await diskStorage.saveFile(file.filename);

      response.json({ filename });
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, "tmp");
        }

        throw new AppError(error.issues[0].message);
      }
      throw error;
    }
  }
}
