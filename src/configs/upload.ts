import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_SIZE = 3;
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.relative(TMP_FOLDER, "uploads");

const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

export default {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_SIZE,
  MULTER,
  TMP_FOLDER,
  UPLOADS_FOLDER,
};
