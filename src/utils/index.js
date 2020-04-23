import { DEFAULT_FILTERS } from "../constants/filters";

export const convertFiltersForRequest = ({
  keywords,
  salarySlider,
  ageSlider,
  sex = [],
  hasphoto = [],
  experienceid = [],
  ageFrom = DEFAULT_FILTERS.ageFrom,
  ageTo = DEFAULT_FILTERS.ageTo,
  salaryFrom = DEFAULT_FILTERS.salaryFrom,
  salaryTo = DEFAULT_FILTERS.salaryTo,
  ...filtersSet
}) => {
  const objectSex = sex.length === 1 ? { sex: sex[0] } : {};
  const objectPhoto = hasphoto.length === 1 ? { hasPhoto: hasphoto[0] } : {};
  const objectExperience =
    experienceid.length === 1 ? { experienceId: experienceid[0] } : {};

  return {
    ...filtersSet,
    ...objectSex,
    ...objectPhoto,
    ...objectExperience,
    ...(keywords ? { keywords } : {}),
    ...(ageFrom === DEFAULT_FILTERS.ageFrom ? {} : { ageFrom }),
    ...(ageTo === DEFAULT_FILTERS.ageTo ? {} : { ageTo }),
    ...(salaryFrom === DEFAULT_FILTERS.salaryFrom ? {} : { salaryFrom }),
    ...(salaryTo === DEFAULT_FILTERS.salaryTo ? {} : { salaryTo })
  };
};
