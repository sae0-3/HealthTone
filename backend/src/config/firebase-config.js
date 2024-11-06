import admin from 'firebase-admin'


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

export const bucket = admin.storage().bucket()

export async function getEpubUrl(fileName) {
  try {
    const file = bucket.file(`books/${fileName}`)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600000
    })
    return url
  } catch (error) {
    console.error('Error al obtener URL:', error)
    throw error
  }
}
