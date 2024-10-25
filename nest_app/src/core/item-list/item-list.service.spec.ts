import { Test, TestingModule } from '@nestjs/testing';
import { ItemListService } from './item-list.service';

describe('ItemListService', () => {
  let service: ItemListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemListService],
    }).compile();

    service = module.get<ItemListService>(ItemListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
