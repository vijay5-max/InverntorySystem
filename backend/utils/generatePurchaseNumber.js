export const generatePurchaseNumber = async (connection) => {
  const year = new Date().getFullYear();

  const [rows] = await connection.query(
    "SELECT COUNT(*) AS total FROM purchases"
  );

  const nextNumber = rows[0].total + 1;

  return `PUR-${year}-${String(nextNumber).padStart(6, "0")}`;
};