import { useEffect, useState } from "react";
import customerService from "../../services/customer.service";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    try {

      setLoading(true);

      const response = await customerService.getCustomers();

      setCustomers(response.data || []);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to load customers."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleAdd = () => {

    setSelectedCustomer(null);

    setShowForm(true);

  };

  const handleEdit = (customer) => {

    setSelectedCustomer(customer);

    setShowForm(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this customer?")) return;

    try {

      await customerService.deleteCustomer(id);

      loadCustomers();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed."
      );

    }

  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search)
  );

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          + Add Customer
        </button>

      </div>

      <div className="bg-white-500 rounded shadow p-4 mb-10">

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
                w-80
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-black
                outline-none
                placeholder:text-gray-400
                focus:border-blue-500
                dark:border-slate-600
                dark:bg-slate-900
                dark:text-white
                dark:placeholder:text-gray-500
              "
        />

      </div>

      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (

        <CustomerForm
          customer={selectedCustomer}
          onClose={() => {

            setShowForm(false);

            loadCustomers();

          }}
        />

      )}

    </div>

  );

}