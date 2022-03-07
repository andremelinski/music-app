import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/models';
import { UserRepository } from './login/login.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategyService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
