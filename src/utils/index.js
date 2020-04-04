export const preventEmptyValues = (obj = {}) => {
  const objToReturn = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value) objToReturn[key] = value;
  });
  return objToReturn;
};
