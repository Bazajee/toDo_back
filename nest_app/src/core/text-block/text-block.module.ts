import { Module } from '@nestjs/common'
import { TextBlockService } from './text-block.service'

@Module({
  providers: [TextBlockService],
  exports: [TextBlockService], 
})
export class TextBlockModule {}
