// import { DataSource } from 'typeorm';
// import { join } from 'path';
// import DatabaseDto from 'src/modules/some/dto/create.dto';

// const dataSourceMap = new Map<string, DataSource>();

// export async function getDataSourceByUrl(databaseURL: DatabaseDto): Promise<DataSource> {
//     if (dataSourceMap.has(databaseURL as any)) {
//         const existingDataSource = dataSourceMap.get(databaseURL as any)!;
//         if (!existingDataSource.isInitialized) {
//             await existingDataSource.initialize();
//         }
//         return existingDataSource;
//     }

//     const newDataSource = new DataSource({
//         type: 'postgres',
//         url: databaseURL as any,
//         entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
//         migrations: [join(__dirname, '../migrations/*.entity.{ts,js}')],
//         synchronize: true,
//         logging: false,
//     });

//     await newDataSource.initialize();

//     dataSourceMap.set(databaseURL as any, newDataSource);

//     return newDataSource;
// }
