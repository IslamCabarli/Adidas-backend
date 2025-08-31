// import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
// import { SomeService } from './some.service';
// import DatabaseDto from './dto/create.dto';

// @Controller('data')
// export class SomeController {
//     constructor(private readonly someService: SomeService) { }

//     @Post()
//     async fetchData(@Body() params: DatabaseDto) {
//         if (!params) {
//             throw new Error('databaseURL is required');
//         }
//         if (typeof params.databaseURL !== 'string') {
//             throw new BadRequestException('databaseURL must be a string');
//         }

//         return this.someService.getData(params);
//     }
// }
