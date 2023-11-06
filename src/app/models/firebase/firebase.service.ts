import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { VerificationData } from '../kyc/kyc.application.service';
import { Observable, map } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private verificationCollection: AngularFirestoreCollection<VerificationData>;
  verifications$: Observable<VerificationData[]>;

  constructor(private afs: AngularFirestore) {
    this.verificationCollection = this.afs.collection<VerificationData>(
      'create_verification'
    );
    this.verifications$ = this.verificationCollection.snapshotChanges().pipe(
      map((v) =>
        v.map((a) => {
          const data = a.payload.doc.data() as VerificationData;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  async addVerification(data: VerificationData) {
    try {
      const docRef: any = data;
      const now = serverTimestamp();
      docRef.created_at = now as any;
      docRef.updated_at = now as any;
      await this.verificationCollection.add(data);
    } catch (error) {
      console.error('Firestore error:', error);
    }
  }
}
