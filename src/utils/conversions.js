export const kiloToPound = (amount) => {
  return +(Math.round((amount / 0.45359237) + "e+2")  + "e-2");
}

export const poundToKilo = (amount) => {
  return +(Math.round((amount * 0.45359237) + "e+2")  + "e-2");
}
