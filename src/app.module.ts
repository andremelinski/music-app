import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MusicModule } from './music/music.module';
const providers = require('./database/database.providers')


console.log(providers)
@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(providers()), MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
