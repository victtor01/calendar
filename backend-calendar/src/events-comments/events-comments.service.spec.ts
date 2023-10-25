import { Test, TestingModule } from '@nestjs/testing';
import { EventsCommentsService } from './events-comments.service';

describe('EventsCommentsService', () => {
  let service: EventsCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsCommentsService],
    }).compile();

    service = module.get<EventsCommentsService>(EventsCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
