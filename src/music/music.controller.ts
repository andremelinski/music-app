import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Music } from 'src/database/models';
import { JwtGuard } from 'src/jwt.guard';
import { MusicService } from './music.service';
import { AddMusicDto } from './repository/dto/addMusic.dto';
import { MusicFilterDto } from './repository/dto/musicFilter.dto';

@UseGuards(JwtGuard)
@Controller('favorite-songs')
export class MusicController {
  constructor(private musicService: MusicService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async login(
    @Req() req,
    @Query() musicFilterDto: MusicFilterDto,
  ): Promise<Music[]> {
    try {
      const user_id = parseInt(req.user.sub);
      const musics = await this.musicService.fidingMusics(
        musicFilterDto,
        user_id,
      );
      return musics;
    } catch (err) {
      return err;
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createMusic(@Req() req, @Body() body: AddMusicDto): Promise<any> {
    try {
      const user_id = parseInt(req.user.sub);
      let newMusic: any = { ...body, user_id };
      newMusic = await this.musicService.creatingMusic(newMusic);
      return newMusic;
    } catch (err) {
      return err;
    }
  }

  @Put('/:favoriteId')
  @UsePipes(ValidationPipe)
  async updateMusic(
    @Req() req,
    @Param('favoriteId') id: number,
    @Body() newMusic: MusicFilterDto,
  ): Promise<any> {
    const user_id = parseInt(req.user.sub);
    const [musicExist] = await this.musicService.fidingMusics({ id }, user_id);
    const updatedMusic = await this.musicService.updateMusic(
      musicExist,
      newMusic,
      id,
    );
    return updatedMusic;
  }

  @Delete('/:favoriteId')
  async deleteMusic(@Req() req, @Param('favoriteId') id: number): Promise <any> {
    const user_id = parseInt(req.user.sub);
    const [musicExist] = await this.musicService.fidingMusics({ id }, user_id);
    const musicDeleted = musicExist ? await this.musicService.deleteMusic(id): false
    return musicDeleted
  }
}
