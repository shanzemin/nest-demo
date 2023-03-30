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
  async findAll(params: any) {
    const { name = '', page = 1, limit = 10, category = '' } = params
    let query = {}
    if (name) {
      query = Object.assign(query, { name: { $regex: name } })
    }
    if (category) {
      query = Object.assign(query, { category: { $in: category } })
    }
    const skip = (page - 1) * limit
    const promiseArr = [
      this.bookModel.find(query).limit(limit).skip(skip).sort({ score: -1 }),
      this.bookModel.countDocuments(query)
    ]
    const ret = await Promise.all(promiseArr)
    const [books, count] = ret
    return { list: books, count }
  }

  // 书籍详情
  async findOne(id: string) {
    const book = await this.bookModel.findById(id)
    if (!book) {
      throw '图书不存在'
    }
    return book
  }

  // 更新书籍
  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto)
  }

  // 删除书籍
  async remove(id: string) {
    return this.bookModel.deleteOne({ _id: id })
  }
}
