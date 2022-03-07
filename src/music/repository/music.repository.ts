import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from '../../database/models';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MusicRepository {
  constructor(@InjectRepository(Music) private musicModel: Repository<Music>) {}

  async hasDifference(keys: string[], object1: Object, object2: Object) {
    const hasChange = keys.find((key) => !!object2[key] && object1[key] != object2[key])
    return hasChange
  }

  async getMusicsByQueryParams(user_id: number, filter = {}): Promise<Music[]> {
    const filters = { ...filter, user_id };
    return await this.musicModel.find({ where: filters });
  }

  async create({ user_id, artist, album, song_name }: any): Promise<Music> {
    const newUser = this.musicModel.create({
      user_id,
      artist,
      album,
      song_name,
    });
    return await this.musicModel.save(newUser);
  }

  async update(music: any, favoriteId:string): Promise<UpdateResult> {
    const musicUpdated = await this.musicModel.update(favoriteId, music);
    return musicUpdated;
  }

  async delete(favoriteId:number): Promise<any> {
    await this.musicModel.delete(favoriteId);
    return true;
  }
}
