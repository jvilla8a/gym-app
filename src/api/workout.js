import {
  collection,
  doc,
  getDocs,
  addDoc,
  Timestamp,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

import { db } from "../utils/firebase";
import { poundToKilo } from "../utils/conversions";

export const addWorkout = async (values) => {
  try {
    values.exercise = doc(db, "exercises", values.exercise);
    values.date = Timestamp.fromDate(values.date);
    const request = await addDoc(collection(db, "workoutExercises"), values);

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const getLatestWorkoutsByExerciseId = async (id, user) => {
  try {
    const data = [];
    const exercise = doc(db, "exercises", id);
    const _query = query(
      collection(db, "workoutExercises"),
      where("user", "==", user),
      where("exercise", "==", exercise),
      limit(3),
      orderBy("date", "desc")
    );
    const request = await getDocs(_query);
    request.forEach(async (item) => {
      data.push({ id: item.id, ...item.data() });
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLatestWorkoutsByExerciseIdNVariation = async (
  id,
  variation,
  user
) => {
  try {
    const data = [];
    const exercise = doc(db, "exercises", id);
    const _query = query(
      collection(db, "workoutExercises"),
      where("user", "==", user),
      where("exercise", "==", exercise),
      where("variation", "==", variation === "No Variación" ? "" : variation),
      limit(3),
      orderBy("date", "desc")
    );
    const request = await getDocs(_query);
    request.forEach(async (item) => {
      data.push({ id: item.id, ...item.data() });
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLatestWorkoutsByExerciseRef = async (ref, user) => {
  try {
    const data = [];
    const _query = query(
      collection(db, "workoutExercises"),
      where("user", "==", user),
      where("exercise", "==", ref),
      limit(3),
      orderBy("date", "desc")
    );
    const request = await getDocs(_query);

    request.forEach((item) => {
      data.push({ id: item.id, ...item.data() });
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllWorkoutsByExerciseId = async (id, user) => {
  try {
    const data = [];
    const exercise = doc(db, "exercises", id);
    const _query = query(
      collection(db, "workoutExercises"),
      where("user", "==", user),
      where("exercise", "==", exercise),
      orderBy("date", "asc")
    );
    const request = await getDocs(_query);
    request.forEach(async (item) => {
      data.push({ id: item.id, ...item.data() });
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecordByExerciseId = async (id, user) => {
  try {
    const allWorkouts = await getAllWorkoutsByExerciseId(id, user);

    let record = allWorkouts[0];
    if (record) {
      allWorkouts.forEach((workout) => {
        const recordWeight = record.series.sort(
          (a, b) => b.weight - a.weight
        )[0];
        const workoutWeight = workout.series.sort(
          (a, b) => b.weight - a.weight
        )[0];

        if (recordWeight.weightKg === workoutWeight.weightKg) {
          if (parseInt(workoutWeight.weight) > parseInt(recordWeight.weight))
            record = workout;
          else if (
            parseInt(workoutWeight.weight) === parseInt(recordWeight.weight)
          ) {
            if (parseInt(workoutWeight.reps) >= parseInt(recordWeight.reps))
              record = workout;
          }
        } else {
          const recordWeightC = recordWeight.weightKg
            ? recordWeight.weight
            : poundToKilo(recordWeight.weight);
          const workoutWeightC = workoutWeight.weightKg
            ? workoutWeight.weight
            : poundToKilo(workoutWeight.weight);

          if (workoutWeightC > recordWeightC) record = workout;
          else if (workoutWeightC === recordWeightC) {
            if (parseInt(workoutWeight.reps) >= parseInt(recordWeight.reps))
              record = workout;
          }
        }
      });

      record.series = [record?.series[0]] || [];
      return record;
    }

    return false;
  } catch (error) {
    console.error(error);
  }
};

// export const getRecordByExerciseIdNVariation = async (id) => {
//   try {
//     const allWorkouts = getAllWorkoutsByExerciseIdNVariation(id);

//     let record = {};
//     allWorkouts.forEach((workout) => {
//       if(!record.id) record = workout;
//       else {
//         let newRecord = false;
//         workout.series.forEach((wserie) => {
//           if(!record.series.every((rserie) => rserie.weight <= wserie.weight)) newRecord = true;
//         })

//         if(newRecord) record = workout;
//       }
//     });

//     return record;
//   } catch (error) {
//     console.error(error);
//   }
// };
