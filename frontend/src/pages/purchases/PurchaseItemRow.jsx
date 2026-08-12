export default function PurchaseItemRow({
  item,
  index,
  products,
  onChange,
  onRemove,
}) {
  const subtotal =
    Number(item.quantity || 0) *
    Number(item.purchase_price || 0);

  return (
    <tr>

      <td className="border p-2">

        <select
          className="w-full border rounded p-2"
          value={item.product_id}
          onChange={(e) =>
            onChange(index, "product_id", Number(e.target.value))
          }
        >

          <option value="">
            Select Product
          </option>

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.product_name}
            </option>

          ))}

        </select>

      </td>

      <td className="border p-2">

        <input
          type="number"
          min="1"
          className="w-full border rounded p-2"
          value={item.quantity}
          onChange={(e) =>
            onChange(index, "quantity", Number(e.target.value))
          }
        />

      </td>

      <td className="border p-2">

        <input
          type="number"
          min="1"
          className="w-full border rounded p-2"
          value={item.purchase_price}
          onChange={(e) =>
            onChange(
              index,
              "purchase_price",
              Number(e.target.value)
            )
          }
        />

      </td>

      <td className="border p-2 font-semibold">
        ₹{subtotal.toFixed(2)}
      </td>

      <td className="border p-2">

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Remove
        </button>

      </td>

    </tr>
  );
}