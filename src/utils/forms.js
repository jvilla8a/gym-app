import * as yup from "yup";

export const EXERCISE_RECORD = {
  validationSchema: yup.object().shape({
    weight: yup
      .string()
      .required("Peso es requerido")
      .matches(/^[1-9]\d*$/, "Solo números mayores que 0"),
    weightKg: yup.bool().required(),
    reps: yup
      .string()
      .required("Repeticiones es requerido")
      .matches(/^[1-9]\d*$/, "Solo números mayores que 0"),
  }),
  initialValues: {
    weight: "",
    weightKg: true,
    reps: "",
    variation: "",
    otherVariant: "",
  },
};

export const LOGIN = {
  validationSchema: yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  }),
  initialValues: {
    email: "",
    password: "",
  },
};

export const REGISTER = {
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().required(),
  }),
  initialValues: {
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  },
};
