import { Test, TestingModule } from '@nestjs/testing';
import { RegistersController } from './registers.controller';

describe('RegistersController', () => {
  let controller: RegistersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistersController],
    }).compile();

    controller = module.get<RegistersController>(RegistersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
