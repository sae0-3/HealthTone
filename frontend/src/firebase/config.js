import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyCbEnA7ZWOuOmzpioszzCURLhP8xzSFTMg",
  authDomain: "healthtone-39885.firebaseapp.com",
  projectId: "healthtone-39885",
  storageBucket: "healthtone-39885.appspot.com",
  messagingSenderId: "564008922731",
  appId: "1:564008922731:web:00a99a85c66cee27c30b2e",
  measurementId: "G-WF3KNJ4WW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export const uploadFile = async (file) => {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}