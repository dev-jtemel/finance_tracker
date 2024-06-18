import { cert, initializeApp }  from 'firebase-admin/app';
const path = require('./private_key.json')
const app = initializeApp({ credential: cert(path) });
export default app;