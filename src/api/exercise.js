import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import { db } from '../utils/firebase';

export const getExercises = async () => {
  try {
    const data = [];
    const request = await getDocs(collection(db, 'exercises'));
    
    request.forEach(exercise => data.push({ id: exercise.id, ...exercise.data() }));

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExerciseById = async (id) => {
  try {
    const Doc = doc(db, 'exercises', id);
    const request = await getDoc(Doc);
    const exercise = await getDoc(request.data().details);

    return {...request.data(), ...exercise.data()};
  } catch (error) {
    console.error(error);
  }
};

export const getExerciseByRef = async (ref) => {
  try {
    const request = await getDoc(ref);
    const exercise = await getDoc(request.data().details);
    
    return {...request.data(), ...exercise.data()};
  } catch (error) {
    console.error(error);
  }
};