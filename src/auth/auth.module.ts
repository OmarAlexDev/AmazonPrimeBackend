import { Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UsersModule],
  providers: [AuthService]
})
export class AuthModule {}
