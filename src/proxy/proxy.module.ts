import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { TemporalClientModule } from '../temporal-client/temporal-client.module';

@Module({
  imports: [TemporalClientModule],
  controllers: [ProxyController],
})
export class ProxyModule {}
