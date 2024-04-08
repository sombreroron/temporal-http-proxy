import { executeChild } from '@temporalio/workflow';

export async function proxyWorkflow(
  taskQueue: string,
  workflow: string,
  args: any,
) {
  return await executeChild(workflow, {
    args,
    taskQueue,
  });
}
