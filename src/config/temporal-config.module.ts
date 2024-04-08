import { Global, Module } from '@nestjs/common';
import { TemporalConfigService } from './temporal-config.service';

@Global()
@Module({
  providers: [TemporalConfigService],
  exports: [TemporalConfigService],
})
export class TemporalConfigModule {}
