import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt'
import config from './config';
import { ClsModule } from 'nestjs-cls';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
// import { SomeModule } from './modules/some/some.module';
import database from './config/database';
import { BrandModule } from './modules/brand/brand.module';
import { BasketModule } from './modules/basket/basket.module';

@Module({
  imports: [
    // SomeModule,
    TypeOrmModule.forRoot(database.options),
    JwtModule.register({
      global: true,
      secret: config.superSecret,
      signOptions: { expiresIn: '1d' }
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    AuthModule,
    UserModule,
    BrandModule,
    UploadModule,
    CategoryModule,
    ProductModule,
    BasketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
