import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { providerMnemonic } from './config.js';

export const createVerification = onDocumentCreated(
  'create_verification/{id}',
  async (event: { data: any }) => {
    const snapshot = event.data;
    const data = snapshot.data();
    console.log('register ', data.address, data.provider_id, data.contract_address);
    const endpoint = 'https://a.ununifi-test-v1.cauchye.net';
    const contractAddress = 'ununifi1ds5m6wwuu0cr35kmhxmq3up2w0tamsplnna3wm0dkxnyu5x8k03s3c4luw';
    // const chainId = 'ununifi-test-v1';
    const mnemonic = providerMnemonic.value();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'ununifi' });
    const [account] = await wallet.getAccounts();
    console.log('signer: ', account.address);
    const signingClient = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet);
    const msg = {
      create_verification: {
        customer: data.address,
        provider_id: data.provider_id,
      },
    };
    const result = await signingClient.execute(account.address, contractAddress, msg, {
      amount: [],
      gas: '200000',
    });
    console.log('height: ', result.height);
    console.log('txHash: ', result.transactionHash);
  },
);
