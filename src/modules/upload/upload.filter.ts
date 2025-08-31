import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { extname } from "path";
import { UPLOAD_IMAGE_ALLOWED_MIME_TYPES, UPLOAD_IMAGE_ALLOWED_TYPES } from "src/shared/constants/upload.constants";

export const uploadImageFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
) => {

    let ext = extname(file.originalname).slice(1)
    const checkMimeType = UPLOAD_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype)
    const checkFileType = UPLOAD_IMAGE_ALLOWED_TYPES.includes(ext)

    if (!checkMimeType || !checkFileType) return callback(new BadRequestException('Image type is not correct'), false)

    callback(null, true)
}