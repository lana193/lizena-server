export const getRandomImg = (arr = []) => {
   return arr[Math.floor(Math.random() * arr.length)];
};
