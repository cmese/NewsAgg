import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { 
  REACT_APP_API_KEY, 
  REACT_APP_AUTH_DOMAIN, 
  REACT_APP_PROJECT_ID, 
  REACT_APP_STORAGE_BUCKET, 
  REACT_APP_MESSAGING_SENDER_ID, 
  REACT_APP_APP_ID, 
  REACT_APP_MEASUREMENT_ID 
} from '@env'
//import * as dotenv from 'dotenv'
//dotenv.config()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(REACT_APP_PROJECT_ID)
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db
