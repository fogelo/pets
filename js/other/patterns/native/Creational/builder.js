// @ Пример 1: Строитель HTTP-запроса

class Request {
  constructor() {
    this.url = "";
    this.method = "";
    this.payload = "";
  }
}

class RequestBuilder {
  constructor() {
    this.request = new Request();
  }
  addUrl(url) {
    this.request.url = url;
    return this;
  }
  addMethod(method) {
    this.request.method = method;
    return this;
  }
  addPayload(payload) {
    this.request.payload = payload;
    return this;
  }
  build() {
    return this.request;
  }
}

const request = new RequestBuilder()
  .addUrl("google/123")
  .addMethod("get")
  .addPayload({ name: "anton", height: 180 })
  .build();

console.log(request);

//@ Пример 2. Строитель бургера

class Burger {
  constructor({ size, cheeze, bacon, pepper, tomato }) {
    this.size = size || "standart";
    this.cheeze = cheeze || false;
    this.bacon = bacon || false;
    this.pepper = pepper || false;
    this.tomato = tomato || false;
  }
}

class BurgerBuilder {
  constructor(size) {
    this.size = size;
  }
  addCheeze() {
    this.cheeze = true;
    return this;
  }
  addBacon() {
    this.bacon = true;
    return this;
  }
  addPepper() {
    this.pepper = true;
    return this;
  }
  addTomato() {
    this.tomato = true;
    return this;
  }
  build() {
    return new Burger(this);
  }
}

const burger = new BurgerBuilder("big").addCheeze().addBacon().build();
console.log(burger);
