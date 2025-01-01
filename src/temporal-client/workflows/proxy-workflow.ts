import { executeChild } from '@temporalio/workflow';

export async function proxyWorkflow(
  taskQueue: string,
  workflow: string,
  args: any,
  searchAttributes?: any,
) {
  return await executeChild(workflow, {
    args,
    taskQueue,
    searchAttributes,
  });
}
