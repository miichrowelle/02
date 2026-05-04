const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

let db;

const initFirebase = () => {
  try {
    initializeApp({
      credential: applicationDefault(),
    });
    db = getFirestore();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

const initDb = () => {
  // Firestore doesn't need schema initialization like SQLite
  // Collections are created automatically
  console.log('Firestore ready');
};

const insertFermentation = async (id, type, temperature, startTime, plan) => {
  const docRef = db.collection('fermentations').doc(id);
  await docRef.set({
    type,
    temperature,
    start_time: startTime,
    plan: JSON.stringify(plan),
    created_at: Timestamp.now(),
    updated_at: null,
  });
  return { id };
};

const getFermentation = async (id) => {
  const docRef = db.collection('fermentations').doc(id);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    return null;
  }
  
  const data = doc.data();
  return {
    id: doc.id,
    type: data.type,
    temperature: data.temperature,
    startTime: data.start_time,
    plan: JSON.parse(data.plan),
    createdAt: data.created_at?.toDate()?.toISOString(),
    updatedAt: data.updated_at?.toDate()?.toISOString(),
  };
};

const updateFermentation = async (id, plan) => {
  const docRef = db.collection('fermentations').doc(id);
  await docRef.update({
    plan: JSON.stringify(plan),
    updated_at: Timestamp.now(),
  });
  return { id };
};

module.exports = {
  initFirebase,
  initDb,
  insertFermentation,
  getFermentation,
  updateFermentation,
};
