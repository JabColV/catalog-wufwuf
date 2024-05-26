import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

let storage: any;

const initializeFirebase = async () => {
  try {
    const response = await fetch('/firebase-config.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const firebaseConfig = await response.json();

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    storage = getStorage(); // Note that getStorage does not take arguments

    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error al cargar las credenciales de Firebase:', error);
  }
};

// Call the initializeFirebase function
initializeFirebase();

export { storage };

export const uploadFile = async (foldername: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `${foldername}/${uuidv4()}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};






