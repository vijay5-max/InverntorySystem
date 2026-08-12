import api from "./api";

const reportService = {

  async getSalesReport(params = {}) {
    const response = await api.get("/reports/sales", { params });
    return response.data.data;
  },

  async getPurchaseReport(params = {}) {
    const response = await api.get("/reports/purchases", { params });
    return response.data.data;
  },

  async getStockReport(params = {}) {
    const response = await api.get("/reports/stock", { params });
    return response.data.data;
  },

  async getProfitReport(params = {}) {
    const response = await api.get("/reports/profit", { params });
    return response.data.data;
  },

  async getMonthlySales(params = {}) {
    const response = await api.get("/reports/monthly-sales", { params });
    return response.data.data;
  },
};

export default reportService;