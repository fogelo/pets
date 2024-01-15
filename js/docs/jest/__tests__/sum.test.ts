import { sum } from "../sum";

// сравнение примитивов
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// сравнение объектов
test("object assignment", () => {
  const data: any = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// можно добавить not 
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

function drinkAll(callback: any, flavour: any) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

describe("drinkAll", () => {
  test("drinks something lemon-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});

function bloop() {
  return null;
}

test('bloop returns null', () => {
  expect(bloop()).toBeNull();
});