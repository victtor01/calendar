import { Test, TestingModule } from '@nestjs/testing';
import { RegistersService } from './registers.service';

describe('RegistersService', () => {
  let service: RegistersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistersService],
    }).compile();

    service = module.get<RegistersService>(RegistersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
