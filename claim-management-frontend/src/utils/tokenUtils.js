export const tokenUtils = {
  decode: (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },
  
  store: (token) => {
    localStorage.setItem('token', token);
  },
  
  get: () => {
    return localStorage.getItem('token');
  },
  
  remove: () => {
    localStorage.removeItem('token');
  }
};