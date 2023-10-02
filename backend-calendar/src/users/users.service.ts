import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async createNameFile(originalname: string) {
    return `${randomUUID()}${originalname} ${new Date().getTime()}`;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

}
