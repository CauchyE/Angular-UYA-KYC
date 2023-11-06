import { onCall } from 'firebase-functions/v2/https';
import { complyCubeApiKey } from './config.js';
import { ComplyCube } from '@complycube/api';

export const getKycToken = onCall<
  { givenName: string; familyName: string; email: string },
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
  });

  const token = await complyCube.token.generate(client.id, { referrer: '*://*/*' });

  return token.token;
});