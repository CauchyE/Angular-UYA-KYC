import { onCall } from 'firebase-functions/v2/https';
import { complyCubeApiKey } from './config.js';
import { ComplyCube } from '@complycube/api';

export const getKycToken = onCall<
  { givenName: string; familyName: string; email: string; address: string },
  Promise<string | null>
>({ secrets: [complyCubeApiKey] }, async (request) => {
  const complyCube = new ComplyCube({ apiKey: complyCubeApiKey.value() });

  const client = await complyCube.client.create({
    type: 'person',
    email: request.data.email,
    personDetails: {
      firstName: request.data.givenName,
      lastName: request.data.familyName,
    },
    externalId: request.data.address,
  });

  const token = await complyCube.token.generate(client.id, { referrer: '*://*/*' });
  console.log('token', token);
  // Types are different between Types and actual
  return token as unknown as string;
});
