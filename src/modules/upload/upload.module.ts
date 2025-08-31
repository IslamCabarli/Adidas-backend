import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UploadEntity from 'src/entities/Upload.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UploadEntity])],
    controllers: [UploadController],
    providers: [UploadService, CloudinaryService],
})
export class UploadModule { };