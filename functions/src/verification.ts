import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { providerMnemonic } from './config.js';
import { onCall } from 'firebase-functions/v2/https';

export const txVerification = onCall<
  { address: string; providerId: number; contractAddress: string; endpoint: string },
  Promise<string | null>
>({ secrets: [providerMnemonic] }, async (request) => {
  const data = request.data;
  const mnemonic = providerMnemonic.value();
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'ununifi' });
  const [account] = await wallet.getAccounts();
  console.log('signer: ', account.address);
  const signingClient = await SigningCosmWasmClient.connectWithSigner(data.endpoint, wallet);
  const msg = {
    create_verification: {
      customer: data.address,
      provider_id: data.providerId,
    },
  };
  console.log('contract: ' + data.contractAddress, 'msg: ' + msg);
  const result = await signingClient.execute(account.address, data.contractAddress, msg, {
    amount: [],
    gas: '200000',
  });
  console.log('height: ', result.height);
  console.log('txHash: ', result.transactionHash);
  return result.transactionHash;
});
