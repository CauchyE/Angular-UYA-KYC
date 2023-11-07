import { Injectable } from '@angular/core';
import { getFunctions } from '@angular/fire/functions';
import { httpsCallable } from 'firebase/functions';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor() {}

  async getKycToken(
    givenName: string,
    familyName: string,
    email: string,
    address: string
  ) {
    const functions = getFunctions();
    const getKycToken = httpsCallable<
      { givenName: string; familyName: string; email: string; address: string },
      string
    >(functions, 'getkyctoken');
    const token = await getKycToken({ givenName, familyName, email, address });
    console.log('token:', token);
    return token;
  }

  async txVerification(
    address: string,
    providerId: number,
    contractAddress: string,
    endpoint: string
  ) {
    const functions = getFunctions();
    const txVerification = httpsCallable<
      {
        address: string;
        providerId: number;
        contractAddress: string;
        endpoint: string;
      },
      string
    >(functions, 'txverification');
    const txHash = await txVerification({
      address,
      providerId,
      contractAddress,
      endpoint,
    });
    console.log('txHash: ', txHash);
    return txHash;
  }
}
