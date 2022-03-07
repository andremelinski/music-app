import { Injectable } from '@nestjs/common';
import { MusicRepository } from './repository/music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async fidingMusics(filter: any, user_id: number): Promise<any> {
    try {
      if (filter?.songName) {
        filter.song_name = filter.songName;
        delete filter.songName;
      }

      const musics = await this.musicRepository.getMusicsByQueryParams(
        user_id,
        filter,
      );
      if (!musics || !musics.length) {
        return { body: [], statusCode: 404 };
      }

      musics.map((music) => {
        delete music.id;
        delete music.user_id;
      });

      return musics;
    } catch (err) {
      throw new Error(err);
    }
  }

  async creatingMusic(newMusic: Object) {
    try {
      const music: any = await this.musicRepository.create(newMusic);
      music.favoriteId = music.id;
      delete music.user_id;
      delete music.id;
      return music;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateMusic(musicExist: any, newMusic: any, favoriteId: any) {
    try {
      const keys = ['song_name', 'artist', 'album'];
      let music = musicExist;
      const hasChange = await this.musicRepository.hasDifference(
        keys,
        musicExist,
        newMusic,
      );
      if (hasChange) {
        await this.musicRepository.update(newMusic, favoriteId);
        [music] = await this.musicRepository.getMusicsByQueryParams(
          musicExist.user_id,
        );
      }
      delete music.id;
      delete music.user_id;
      return music;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteMusic(musicId: number) {
    try {
      return await this.musicRepository.delete(musicId);
    } catch (err) {
      throw new Error(err);
    }
  }
}
