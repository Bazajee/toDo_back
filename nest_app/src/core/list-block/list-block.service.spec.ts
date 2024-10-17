import { Test, TestingModule } from '@nestjs/testing';
import { ListBlockService } from './list-block.service';

describe('ListBlockService', () => {
  let service: ListBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListBlockService],
    }).compile();

    service = module.get<ListBlockService>(ListBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
