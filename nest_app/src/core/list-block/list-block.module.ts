import { Module } from '@nestjs/common';
import { ListBlockService } from './list-block.service';

@Module({
  providers: [ListBlockService]
})
export class ListBlockModule {}
