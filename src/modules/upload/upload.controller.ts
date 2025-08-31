import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { uploadImageFilter } from './upload.filter';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload.dto';
import { UploadService } from './upload.service';
import { UPLOAD_IMAGE_MAX_SIZE } from 'src/shared/constants/upload.constants';

@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService
    ) { }

    @Post('image')
    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
        fileFilter: uploadImageFilter,
        limits: {
            fileSize: UPLOAD_IMAGE_MAX_SIZE
        },
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadImageDto })
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.uploadImage(file)
    }
}