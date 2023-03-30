import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Roles') private readonly roleModel) {}

  // 添加角色
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto
    const role = await this.roleModel.findOne({ name })
    if (role) {
      throw new HttpException('角色已存在', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const ret = await this.roleModel(createRoleDto)
    return ret.save()
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    const role = await this.roleModel.findById(id)
    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.NOT_FOUND)
    }
    return role
  }

  update(id: number, updateUserDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
