import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel(createUserDto)
    return user.save()
  }

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
      this.userModel.find(query).limit(limit).skip(skip).sort({ score: -1 }),
      this.userModel.countDocuments(query)
    ]
    const ret = await Promise.all(promiseArr)
    const [books, count] = ret
    return { list: books, count }
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw '用户不存在'
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto)
  }

  remove(id: number) {
    return this.userModel.deleteOne({ _id: id })
  }
}
