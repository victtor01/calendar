import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmationCodesService } from './confirmation-codes.service';

describe('ConfirmationCodesService', () => {
  let service: ConfirmationCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmationCodesService],
    }).compile();

    service = module.get<ConfirmationCodesService>(ConfirmationCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
