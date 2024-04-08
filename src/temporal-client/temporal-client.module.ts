import { Module } from '@nestjs/common';
import { Connection } from '@temporalio/client';
import { TemporalModule } from 'nestjs-temporal';
import { TemporalClientService } from './temporal-client.service';
import { TemporalConfigService } from '../config/temporal-config.service';
import { TemporalConfigModule } from '../config/temporal-config.module';
import { NativeConnection, Runtime } from '@temporalio/worker';
import { Queue } from '../enum/queue.enum';

@Module({
  imports: [
    TemporalConfigModule,
    TemporalModule.registerWorkerAsync({
      imports: [TemporalConfigModule],
      inject: [TemporalConfigService],
      useFactory: async (configService: TemporalConfigService) => {
        if (!Runtime._instance) {
          Runtime.install({ logger: console });
        }
        const config = configService.generateConfig();
        const connection = await NativeConnection.connect({
          address: config.address,
          tls: config.tls,
        });
        return {
          workerOptions: {
            connection,
            namespace: config.namespace,
            taskQueue: Queue.PROXY,
            workflowsPath: require.resolve('./workflows'),
          },
        };
      },
    }),
    TemporalModule.registerClientAsync({
      imports: [TemporalConfigModule],
      inject: [TemporalConfigService],
      useFactory: async (configService: TemporalConfigService) => {
        const config = configService.generateConfig();
        const connection = await Connection.connect({
          address: config.address,
          tls: config.tls,
        });
        return {
          connection,
          namespace: config.namespace,
        };
      },
    }),
  ],
  providers: [TemporalClientService],
  exports: [TemporalClientService],
})
export class TemporalClientModule {}
