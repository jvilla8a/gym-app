import * as yup from 'yup';

export const EXERCISE_RECORD = {
  validationSchema: yup.object().shape({
    weight: yup.string().required('Peso es requerido').matches(/^[1-9]\d*$/, 'Solo números mayores que 0'),
    weightKg: yup.bool().required(),
    reps: yup.string().required('Repeticiones es requerido').matches(/^[1-9]\d*$/, 'Solo números mayores que 0'),
  }),
  initialValues: {
    weight: '',
    weightKg: true,
    reps: '',
    variation: '',
    otherVariant: '',
  }
}