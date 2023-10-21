import { Test, TestingModule } from '@nestjs/testing';
import { EventsTemplatesService } from './events-templates.service';

describe('EventsTemplatesService', () => {
  let service: EventsTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsTemplatesService],
    }).compile();

    service = module.get<EventsTemplatesService>(EventsTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
