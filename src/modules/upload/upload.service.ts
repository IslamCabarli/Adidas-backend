import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UploadEntity from 'src/entities/Upload.entity';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
    constructor(
        private cloudinaryService: CloudinaryService,
        @InjectRepository(UploadEntity)
        private imageRepo: Repository<UploadEntity>
    ) { }


    async uploadImage(file: Express.Multer.File) {
        try {
            let result = await this.cloudinaryService.uploadFile(file)
            if (!result?.url) throw new Error()
            let image = this.imageRepo.create({
                url: result.url,
            })

            await image.save()
            return image
        } catch (err) {
            throw new BadRequestException('Something went wrong');
        }
    }
}