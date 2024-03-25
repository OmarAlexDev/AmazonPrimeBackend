import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { GetToken } from './utils/middlewares/get-token.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/ml.sqlite',
      synchronize: true,
      entities: [User],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetToken)
      .forRoutes('*');
  }
}
