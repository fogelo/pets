export let products = [
  { id: 1, value: "milk" },
  { id: 2, value: "orange" },
];

export const productsRepository = {
  findProducts(title: string | undefined) {
    if (title) {
      return products.filter((product) => product.value.includes(title));
    } else {
      return products;
    }
  },
  findProductById(id: number) {
    const product = products.find((product) => product.id === id);
    return product;
  },
  createProduct(value: string) {
    const newProduct = {
      id: new Date().getTime(),
      value,
    };
    products.push(newProduct);
  },

  updateProduct(id: number, value: string) {
    const existingProductIndex = products.findIndex(
      (product) => product.id === id
    );
    if (existingProductIndex === -1) return false;

    products[existingProductIndex] = {
      ...products[existingProductIndex],
      value,
    };
  },
  deleteProduct(id: number) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true
  },
};
