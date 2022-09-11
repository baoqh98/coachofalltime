import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp({
  projectId: 'teststorage-4fa79',
  storageBucket: 'gs://teststorage-4fa79.appspot.com/',
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
