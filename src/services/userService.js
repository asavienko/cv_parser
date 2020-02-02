import { getRequest } from "./fetchUtils";

const userUrls = () => ({
  getCurrentUser: "/users/get-current-user"
});

export const getCurrentUser = () => getRequest(userUrls().getCurrentUser);
