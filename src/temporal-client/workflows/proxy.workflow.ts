import { proxyActivities } from '@temporalio/workflow';

export async function proxyWorkflow(
  taskQueue: string,
  activity: string,
  args: any,
) {
  const activities = proxyActivities({
    retry: { maximumAttempts: 1 },
    startToCloseTimeout: '6 hours',
    taskQueue,
  });

  return await activities[activity](...args);
}
