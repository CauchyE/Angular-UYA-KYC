import type { Timestamp } from 'firebase/firestore';

export type IVerification = {
  verification_id: string;
  contract_address: string;
  address: string;
  provider_id: number;
};

export type IVerificationStore = IVerification & {
  created_at: Timestamp;
  updated_at: Timestamp;
};

export class Verification implements IVerification {
  constructor(
    public id: string,
    public verification_id: string,
    public contract_address: string,
    public address: string,
    public provider_id: number,
    public created_at: Date,
    public updated_at: Date
  ) {}

  dropRedundancy(): IVerification {
    return {
      verification_id: this.verification_id,
      contract_address: this.contract_address,
      address: this.address,
      provider_id: this.provider_id,
    };
  }
}
