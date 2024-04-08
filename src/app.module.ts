import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { GetToken } from './utils/middlewares/get-token.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WishlistModule } from './wishlist/wishlist.module';
import { MoviesModule } from './movies/movies.module';
import { Movie, Profile, User, Wishlist } from './entities';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/amazonPrime.sqlite',
      synchronize: true,
      entities: [User,Movie,Wishlist, Profile],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    WishlistModule,
    MoviesModule,
    ProfilesModule
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
