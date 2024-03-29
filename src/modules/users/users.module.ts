import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSchema } from './users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema, collection: 'user' }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
