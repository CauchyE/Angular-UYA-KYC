import { type IVerificationStore, Verification } from './verification';
import { type FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export class VerificationFirestore {
  static collectionId = 'create_verification';
  static documentId = 'verification_id';
  static virtualPath = `${VerificationFirestore.collectionId}/{${VerificationFirestore.documentId}}`;

  static converter: FirestoreDataConverter<Verification> = {
    toFirestore: (data: Verification) => ({
      ...data.dropRedundancy(),
      created_at:
        data.created_at instanceof Date
          ? Timestamp.fromDate(data.created_at)
          : data.created_at,
      updated_at:
        data.updated_at instanceof Date
          ? Timestamp.fromDate(data.updated_at)
          : data.updated_at,
    }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options) as IVerificationStore;
      return new Verification(
        snapshot.id,
        data.verification_id,
        data.contract_address,
        data.address,
        data.provider_id,
        data.created_at.toDate(),
        data.updated_at.toDate()
      );
    },
  };

  static collectionPath() {
    return `${VerificationFirestore.collectionId}`;
  }

  static documentPath(id: string) {
    return `${VerificationFirestore.collectionPath()}/${id}`;
  }
}
