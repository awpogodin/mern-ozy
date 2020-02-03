const JWT_TOKEN = 'jwtToken';

const jwtStorage = {
  getItem() {
    return sessionStorage.getItem(JWT_TOKEN);
  },
  setItem(token) {
    sessionStorage.setItem(JWT_TOKEN, token);
  },
  removeItem() {
    sessionStorage.removeItem(JWT_TOKEN);
  },
};

export default jwtStorage;
