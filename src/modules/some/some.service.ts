// import { Injectable } from "@nestjs/common";
// import { getDataSourceByUrl } from "src/config/datasource.manager";
// import CategoryEntity from "src/entities/Category.entity";
// import { ProductEntity } from "src/entities/Products.entity";
// import UploadEntity from "src/entities/Upload.entity";
// import { UserEntity } from "src/entities/User.entity";
// import DatabaseDto from "./dto/create.dto";

// @Injectable()
// export class SomeService {
//     async getData(params: DatabaseDto) {
//         const dataSource = await getDataSourceByUrl(params.databaseURL as any);

//         const uploadRepo = dataSource.getRepository(UploadEntity);
//         const productRepo = dataSource.getRepository(ProductEntity);
//         const categoryRepo = dataSource.getRepository(CategoryEntity);
//         const userRepo = dataSource.getRepository(UserEntity);

//         // Məsələn, uploadlardan məlumat alaq:
//         const uploads = await uploadRepo.find();

//         // Productlardan məlumat almaq üçün:
//         const products = await productRepo.find();

//         const category = await categoryRepo.find();

//         const user = await userRepo.find();

//         // Category və User-lar üçün də oxşar

//         return {
//             uploads,
//             products,
//             category,
//             user
//         };
//     }
// }
