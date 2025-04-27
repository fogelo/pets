let count = 0;
export const requestCountMiddleware = (req, res, next) => {
  count++;
  console.log(count);
  next();
};
