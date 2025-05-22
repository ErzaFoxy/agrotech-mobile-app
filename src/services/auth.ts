import { getAuth, Auth } from 'firebase/auth';
import { app } from './firebaseConfig';

let authInstance: Auth | null = null;

export const getFirebaseAuth = (): Auth | null => {
  if (!authInstance) {
    try {
      authInstance = getAuth(app);
    } catch (e) {
      console.warn('⚠️ Firebase Auth is not ready yet:', e);
      return null;
    }
  }

  return authInstance;
};