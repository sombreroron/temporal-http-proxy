import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProxyDto } from './proxy.dto';
import { TemporalClientService } from '../temporal-client/temporal-client.service';
import { randomUUID } from 'crypto';
import { proxyWorkflow } from '../temporal-client/workflows/proxy.workflow';
import { Queue } from '../enum/queue.enum';

@Controller()
export class ProxyController {
  constructor(private temporalClient: TemporalClientService) {}

  @Post(':taskQueue')
  async proxy(@Body() body: ProxyDto, @Param('taskQueue') taskQueue: string) {
    return this.temporalClient.client.workflow.start(proxyWorkflow, {
      args: [taskQueue, body.activity, body.args],
      workflowId: randomUUID(),
      taskQueue: Queue.PROXY,
    });
  }
}
