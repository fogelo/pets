import { useEffect } from "react";
const getData = async () => {
  const response = await fetch("https://swapi.dev/api/people/");
  const data = await response.json();
  return data.results;
};

type User<T> = {
  name: string;
  age: T;
};

type User2 = {
  name: string;
  age: number;
};

const PromiseComp = () => {
  const user: User<number> = {age:""};
  useEffect(() => {
    /* ==================================================================== */
    // 1. получить из массива arr массив уникальных элементов
    /* ==================================================================== */
    // 2. написать функцию, чтобы проверить является ли строка
    // палиндромом или нет
    // palindrome('racecar') === true
    // palindrome('table') === false
    // const string = "raecar";
    // const reverseString = string.split("").reverse().join("");
    // console.log((reverseString === string));
    /* ==================================================================== */
    // 3. Посчитать букву идущие подряд
    // cons value = "AAAABBBCCXYZDDDAAAAAAAAAABBBBBBBXXXXXUUUUUTTRRN";
    // A4 B3 C2 X1 Y1 Z1 D3 A10 B7 X5 U5 T2 R2 N1
    // anagram('finder', 'Friend') --> true
    // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
    /* ==================================================================== */
    // 4. получить с сервера массив объектов, используя функцию getData
    // и отобразить поле name каждого объекта в виде списка
  }, []);
  return <>hello</>;
};

export default PromiseComp;
