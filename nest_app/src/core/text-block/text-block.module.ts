import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';

@Module({
  providers: [TextBlockService]
})
export class TextBlockModule {}
