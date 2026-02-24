export const wait = (ms: number) => {
  return new Promise((res) =>
    setTimeout(() => {
      res(1);
    }, ms),
  );
};
