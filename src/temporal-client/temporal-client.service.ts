import { Injectable } from '@nestjs/common';
import { Client, WorkflowClient } from '@temporalio/client';
import { InjectTemporalClient } from 'nestjs-temporal';

@Injectable()
export class TemporalClientService {
  readonly client: Client;

  constructor(
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
  ) {
    this.client = new Client({
      connection: this.temporalClient.connection,
      namespace: this.temporalClient.options.namespace,
    });
  }
}
