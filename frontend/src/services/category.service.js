import api from "./api";

const categoryService = {

  // Get all categories
  async getCategories() {
    const response = await api.get("/categories");
    return response.data;
  },

  // Get category by ID
  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Create category
  async createCategory(data) {
    const response = await api.post("/categories", data);
    return response.data;
  },

  // Update category
  async updateCategory(id, data) {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  // Delete category
  async deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }

};

export default categoryService;