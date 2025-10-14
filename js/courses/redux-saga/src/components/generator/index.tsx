import { useEffect } from "react";

export const Generator = () => {
  useEffect(() => {
    // объявление генератора
    function* getNumbers() {
      const a = yield 1;
      console.log(a);
      yield 2;
    }

    const numbers = getNumbers();
    console.log(numbers.next()); // {value: 1, done: false}
    console.log(numbers.next(4)); // {value: 2, done: false}
    console.log(numbers.next()); // {value: 3, done: false}
    console.log(numbers.next()); // {value: undefined, done: true}
  }, []);

  return (
    <div>
      <h1>Generator</h1>
    </div>
  );
};
