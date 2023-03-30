import { Module } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/libraries', {
      useNewUrlParser: true
    }),
    UsersModule
    // ConfigModule.forRoot({})
  ],
  controllers: [],
  providers: []
})

export class AppModule {}
