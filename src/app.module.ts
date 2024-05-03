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
import { Movie, History, Profile, User, Wishlist, Record } from './utils/entities';
import { ProfilesModule } from './profiles/profiles.module';
import { AccountModule } from './account/account.module';
import { HistoryModule } from './history/history.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/amazonPrime.sqlite',
      synchronize: true,
      entities: [User,Movie,Wishlist, Profile, History, Record],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    WishlistModule,
    MoviesModule,
    ProfilesModule,
    AccountModule,
    HistoryModule,
    RecordModule
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
