import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './Schema/book.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
      name:'Book',
      schema:BookSchema
    }
    ])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
