export let BASEURL = 'http://localhost:3000/api';

export const APIErrorMessage = 'Something went wrong';
export const InvalidLogin = 'Invalid username or password';
export const Unauthorized = 'Unauthorized access';

export const APIURL = {
    LOGIN: `${BASEURL}/users/login`,
    PROFILE: `${BASEURL}/users/profile`,
};
