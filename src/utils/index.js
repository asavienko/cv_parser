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
  return {
    ...filtersSet,
    ...(sex.length === 1 ? { sex: sex[0] } : {}),
    ...(hasphoto.length === 1 ? { hasPhoto: hasphoto[0] } : {}),
    ...(experienceid.length === 1 ? { experienceId: experienceid[0] } : {}),
    ...(keywords ? { keywords } : {}),
    ...(ageFrom === DEFAULT_FILTERS.ageFrom ? {} : { ageFrom }),
    ...(ageTo === DEFAULT_FILTERS.ageTo ? {} : { ageTo }),
    ...(salaryFrom === DEFAULT_FILTERS.salaryFrom ? {} : { salaryFrom }),
    ...(salaryTo === DEFAULT_FILTERS.salaryTo ? {} : { salaryTo })
  };
};
