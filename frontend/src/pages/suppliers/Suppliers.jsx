import { useEffect, useState } from "react";

import supplierService from "../../services/supplier.service";
import SupplierTable from "./SupplierTable";
import SupplierForm from "./SupplierForm";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {
      return (
        supplier.supplier_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (supplier.contact_person || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (supplier.phone || "").includes(search)
      );
    });

    setFilteredSuppliers(filtered);
  }, [search, suppliers]);

  const loadSuppliers = async () => {
    try {
      setLoading(true);

      const response = await supplierService.getSuppliers();

      setSuppliers(response.data);
      setFilteredSuppliers(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to load suppliers."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await supplierService.createSupplier(data);

      alert("Supplier created successfully.");

      setShowForm(false);

      loadSuppliers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create supplier."
      );
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    try {
      await supplierService.updateSupplier(
        selectedSupplier.id,
        data
      );

      alert("Supplier updated successfully.");

      setSelectedSupplier(null);
      setShowForm(false);

      loadSuppliers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update supplier."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await supplierService.deleteSupplier(id);

      alert("Supplier deleted successfully.");

      loadSuppliers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete supplier."
      );
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-3xl font-bold">
          Suppliers
        </h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedSupplier(null);
            setShowForm(true);
          }}
        >
          + Add Supplier
        </button>

      </div>

      <div className="mb-4">

        <input
          type="text"
          placeholder="Search supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full bg-white text-black dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <SupplierTable
          suppliers={filteredSuppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">

            <h2 className="text-2xl font-bold mb-5">

              {selectedSupplier
                ? "Edit Supplier"
                : "Add Supplier"}

            </h2>

            <SupplierForm
              initialData={selectedSupplier}
              onSubmit={
                selectedSupplier
                  ? handleUpdate
                  : handleCreate
              }
              onCancel={() => {
                setShowForm(false);
                setSelectedSupplier(null);
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}