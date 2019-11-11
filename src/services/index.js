const MongoConnect = require('../lib/mongo');

class ProductService {
  constructor() {
    this.mongodb = new MongoConnect()
    this.collection = 'products'
  }

  async getProducts() {
    try {
      const products = await this.mongodb.getAll(this.collection, {});
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.mongodb.get(this.collection, id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductById({ id, ...data }) {
    console.log(id);
    try {
      const updatedId = await this.mongodb.update(this.collection, id, data);
      return updatedId;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteProductById(id) {
    try {
      const deletedId = await this.mongodb.delete(this.collection, id);
      return deletedId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(product) {
    try {
      const id = await this.mongodb.create(this.collection, product);
      return id;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductService;
