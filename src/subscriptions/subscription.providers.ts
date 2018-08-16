import { createServer } from 'http';

import { SUBSCRIPTION_SERVER } from './subscription.constants';
//server
 export const createSubscriptionProviders = (port: number = 3001) => [
// export const createSubscriptionProviders = (port: number = 8080) => [
  {
    provide: SUBSCRIPTION_SERVER,
    useFactory: () => {
      const server = createServer();
      return new Promise(resolve => server.listen(port, () => resolve(server)));
    },
  },
];
