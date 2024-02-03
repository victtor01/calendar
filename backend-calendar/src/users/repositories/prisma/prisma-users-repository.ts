import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.users.create({
      data: {
        ...data,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany({
      where: {
        role: 'USER',
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.users.findFirst({
      where: { id },
    });
  }

  async findOneByKey(key: string): Promise<User> {
    return await this.prisma.users.findUnique({
      where: {
        key,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findOneByEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | undefined> {
    return await this.prisma.users.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
  }

  async update(userId: number, data: UpdateUserDto): Promise<boolean> {
    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: data,
    });
    return true;
  }
}
