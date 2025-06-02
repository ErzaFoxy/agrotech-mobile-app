
import { collection, getDocs, query, where, addDoc, Timestamp, orderBy } from 'firebase/firestore';

import { db } from './firebaseConfig';

// Дані, які ми передаємо при створенні нотатки
export interface NotePayload {
  culture: string;
  region: string;
  inputValue: string;
  result: number;
  mode: 'area' | 'culture';
  userId: string;
}

// Дані, які ми отримуємо з Firestore
export interface Note extends NotePayload {
  id: string;
  createdAt: string; // у форматі дд.мм.рррр
}

// Збереження нотатки в Firestore
export const saveNoteToFirestore = async (payload: NotePayload) => {

  await addDoc(collection(db, 'notes'), {
    ...payload,
    createdAt: Timestamp.now(),
  });
};

// Отримання нотаток для поточного користувача
export const getUserNotes = async (userId: string): Promise<Note[]> => {


  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate?.().toLocaleDateString('uk-UA') || '';

    return {
      id: doc.id,
      culture: data.culture,
      region: data.region,
      inputValue: data.inputValue,
      result: data.result,
      mode: data.mode,
      userId: data.userId,
      createdAt
    };
  });
};  