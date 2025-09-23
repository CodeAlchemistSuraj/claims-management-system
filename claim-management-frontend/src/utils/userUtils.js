export const userUtils = {
  store: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  get: () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  },
  
  remove: () => {
    localStorage.removeItem('user');
  }
};