import { Injectable } from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { UserRepository } from './login/login.repository';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<Observable<string>> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    newPassword: string,
    passwortHash: string,
  ): Promise<Observable<any>> {
    return bcrypt.compare(newPassword, passwortHash);
  }

  async login(email: string, password: string) {
    const userExist = await this.usersRepository.findUserByEmail(email);
    const matchpsw = await this.comparePasswords(password, userExist.password);
    if (!userExist || !matchpsw) {
      return {
        body: "User dosen't exist or incorrect password",
        statusCode: 404,
      };
    }
    const jwtPayload: Object = {
      sub: userExist.id,
      email: userExist.email,
    };
    const token = await this.jwtService.signAsync(jwtPayload);
    return { token };
  }

  async createUser(email: string, password: string) {
    try {
      const userExist = await this.usersRepository.findUserByEmail(email);
      if (userExist) {
        return { body: 'User already exist', statusCode: 404 };
      }

      const hashPassword:any = await this.hashPassword(password);
      const user = await this.usersRepository.create(email, hashPassword);
      delete user.password;
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
