import { Test, TestingModule } from '@nestjs/testing';
import { EventsCommentsController } from './events-comments.controller';

describe('EventsCommentsController', () => {
  let controller: EventsCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsCommentsController],
    }).compile();

    controller = module.get<EventsCommentsController>(EventsCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
