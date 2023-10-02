import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersRepository,
          useClass: PrismaUsersRepository,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
