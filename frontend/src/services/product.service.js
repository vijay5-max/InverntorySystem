import api from "./api";

const productService = {

  // Get all products
  async getProducts() {
    const response = await api.get("/products");
    return response.data;
  },

  // Get single product
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product
  async createProduct(productData) {
    const response = await api.post("/products", productData);
    return response.data;
  },

  // Update product
  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

};

export default productService;