import {
  collection,
  doc,
  getDocs,
  addDoc,
  Timestamp,
  query,
  where,
  limit,
  orderBy
} from 'firebase/firestore';

import { db } from '../utils/firebase';

export const addWorkout = async (values) => {
  try {
    values.exercise = doc(db, 'exercises', values.exercise);
    values.date = Timestamp.fromDate(values.date);
    const request = await addDoc(collection(db, 'workoutExercises'), values);

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const getLatestWorkoutsByExerciseId = async (id) =>  {
  try {
    const data = [];
    const exercise = doc(db, 'exercises', id)
    const _query = query(
      collection(db, 'workoutExercises'),
      where('exercise', '==', exercise),
      limit(3),
      orderBy('date', 'desc')
    );
    const request = await getDocs(_query);
    request.forEach(async (item) => {
      data.push({ id: item.id, ...item.data() })
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getLatestWorkoutsByExerciseRef = async (ref) => {
  try {
    const data = [];
    const _query = query(
      collection(db, 'workoutExercises'),
      where('exercise', '==', ref),
      limit(3),
      orderBy('date', 'desc')
    );
    const request = await getDocs(_query);

    request.forEach((item) => {
      data.push({ id: item.id, ...item.data() })
    });

    return data;
  } catch (error) {
    console.error(error)
  }
}