import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: 'dodf3g7bm',
            api_key: '763965117596542',
            api_secret: 'UPvIR6nTz1bdeujuAYAAYaNo9tY'
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const resource_type = 'image'
        let result: any = await new Promise((resolve, reject) =>
            cloudinary.uploader
                .upload_stream(
                    { resource_type },
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    })
                .end(file.buffer),
        );

        return { url: result?.url, type: file.mimetype };
    }

}