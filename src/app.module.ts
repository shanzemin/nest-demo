import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AuthMiddleware } from './common/middleware/auth.middleware'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-demo', {
      useNewUrlParser: true
    }),
    UsersModule, RolesModule
    // ConfigModule.forRoot({})
  ],
  controllers: [],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // 排除某些无需走中间件的路由
      // .exclude({ path: 'roles', method: RequestMethod.GET })
      // 匹配所有的路由
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
