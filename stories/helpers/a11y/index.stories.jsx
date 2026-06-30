import { a, aa, aaa } from "./items.stories";


const getAll = () => [...a, ...aa, ...aaa].reduce((result, item) => {
  result[item.id] = item;

  return result;
}, {});

export const all = getAll();

export default {};
