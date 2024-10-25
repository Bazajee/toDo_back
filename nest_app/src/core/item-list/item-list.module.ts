import { Module } from '@nestjs/common';
import { ItemListService } from './item-list.service';

@Module({
  providers: [ItemListService]
})
export class ItemListModule {}
