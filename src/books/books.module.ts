import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksSchema } from './books.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Books', schema: BooksSchema, collection: 'book' }])],
  controllers: [BooksController],
  providers: [BooksService]
})

export class BooksModule {}
