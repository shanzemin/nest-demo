import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesSchema } from './roles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema, collection: 'role' }])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
