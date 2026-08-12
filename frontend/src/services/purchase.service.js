import api from "./api";

const purchaseService = {
  // Get all purchases
  async getPurchases(params = {}) {
    const response = await api.get("/purchases", {
      params,
    });

    return response.data;
  },

  // Get purchase by ID
  async getPurchaseById(id) {
    const response = await api.get(`/purchases/${id}`);

    return response.data;
  },

  // Create purchase
  async createPurchase(data) {
    const response = await api.post(
      "/purchases",
      data
    );

    return response.data;
  },

  // Update purchase
  async updatePurchase(id, data) {
    const response = await api.put(
      `/purchases/${id}`,
      data
    );

    return response.data;
  },

  // Delete purchase
  async deletePurchase(id) {
    const response = await api.delete(
      `/purchases/${id}`
    );

    return response.data;
  },
};

export default purchaseService;
