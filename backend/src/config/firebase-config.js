// src/config/firebase-config.js
import admin from 'firebase-admin';
import { createRequire } from 'module';
import * as dotenv from 'dotenv';

dotenv.config();

const require = createRequire(import.meta.url);

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Asegúrate de reemplazar los saltos de línea
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

// Función para obtener URL de un EPUB
export async function getEpubUrl(fileName) {
  try {
    const file = bucket.file(`books/${fileName}`);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600000
    });
    return url;
  } catch (error) {
    console.error('Error al obtener URL:', error);
    throw error;
  }
}

export { bucket };