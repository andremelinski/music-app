import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models';

import { ObjectID, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async create(email:string, password:string): Promise<User> {
    const newUser = this.userModel.create({email, password});
    return await this.userModel.save(newUser);
  }
}
