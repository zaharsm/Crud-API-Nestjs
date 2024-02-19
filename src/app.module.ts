import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MagazineController } from './magazine/magazine.controller';
import { MagazineService } from './magazine/magazine.service';
import { MagazineModule } from './magazine/magazine.module';
import { ActyvEntityService } from './actyv-entity/actyv-entity.service';
import { ActyvEntityModule } from './actyv-entity/actyv-entity.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb+srv://zaharswork:${process.env.PASSWORD}@cluster0.1g8qyni.mongodb.net/?retryWrites=true&w=majority`),
    BookModule,
    MagazineModule,
    ActyvEntityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
    
})
export class AppModule {}

