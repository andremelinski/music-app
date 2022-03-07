import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Music } from 'src/database/models';
import { MusicRepository } from './repository/music.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [MusicService, MusicRepository],
  controllers: [MusicController]
})
export class MusicModule {}
