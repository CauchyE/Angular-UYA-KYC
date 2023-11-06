import { initializeApp } from 'firebase-admin/app';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// initializeApp({
//   credential: cert(resolve(__dirname, './service-account.json')),
// });
initializeApp();

export { firestoreBackup } from './firestore-backup/index.js';
// export { onCreate as onCreateUser } from './users/controller.js';
// export { getKycToken as getkyctoken } from './get-kyc-token.js';
export { createVerification as createverification } from './verification.js';
export { getKycToken as getkyctoken } from './kyc-token.js';
