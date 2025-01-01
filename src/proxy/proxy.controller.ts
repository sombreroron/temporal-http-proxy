import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProxyDto } from './proxy.dto';
import { TemporalClientService } from '../temporal-client/temporal-client.service';
import { randomUUID } from 'crypto';
import { Queue } from '../enum/queue.enum';
import { proxyActivity } from '../temporal-client/workflows/proxy-activity';
import { proxyWorkflow } from '../temporal-client/workflows/proxy-workflow';

@Controller()
export class ProxyController {
  constructor(private temporalClient: TemporalClientService) {}

  @Post(':taskQueue/activity/:activity')
  async proxyActivity(
    @Param('taskQueue') taskQueue: string,
    @Param('activity') activity: string,
    @Body() body: ProxyDto,
  ) {
    return this.temporalClient.client.workflow.start(proxyActivity, {
      args: [taskQueue, activity, body.args],
      workflowId: randomUUID(),
      taskQueue: Queue.PROXY,
      searchAttributes: body.searchAttributes,
      retry: { maximumAttempts: 1 },
    });
  }

  @Post(':taskQueue/workflow/:workflow')
  async proxyWorkflow(
    @Param('taskQueue') taskQueue: string,
    @Param('workflow') workflow: string,
    @Body() body: ProxyDto,
  ) {
    return this.temporalClient.client.workflow.start(proxyWorkflow, {
      args: [taskQueue, workflow, body.args],
      workflowId: randomUUID(),
      taskQueue: Queue.PROXY,
      searchAttributes: body.searchAttributes,
      retry: { maximumAttempts: 1 },
    });
  }
}
