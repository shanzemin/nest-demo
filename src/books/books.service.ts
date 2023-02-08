import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Books') private readonly bookModel) {}

  // 添加图书
  async create(createBookDto: CreateBookDto) {
    const book = await this.bookModel(createBookDto)
    return book.save()
  }

  // 图书列表
  async findAll(page: number, limit: number) {
    const promiseArr = [
      this.bookModel.find().limit(limit).skip((page - 1) * limit),
      this.bookModel.countDocuments()
    ]
    const ret = await Promise.all(promiseArr)
    const [books, count] = ret
    return { list: books, count }
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id)
    if (!book) {
      throw '图书不存在'
    }
    return book
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
