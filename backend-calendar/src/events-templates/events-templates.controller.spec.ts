import { Test, TestingModule } from '@nestjs/testing';
import { EventsTemplatesController } from './events-templates.controller';

describe('EventsTemplatesController', () => {
  let controller: EventsTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsTemplatesController],
    }).compile();

    controller = module.get<EventsTemplatesController>(EventsTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
