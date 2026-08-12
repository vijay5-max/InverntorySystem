export default function SaleItemRow({
  item,
  index,
  products,
  onChange,
  onRemove,
}) {
  const selectedProduct = products.find(
    (p) => p.id === Number(item.product_id)
  );

  const sellingPrice = Number(
    selectedProduct?.selling_price || 0
  );

  const stock = Number(
    selectedProduct?.quantity || 0
  );

  const subtotal =
    sellingPrice * Number(item.quantity || 0);

  return (
    <tr>

      <td className="border p-2">

        <select
          className="w-full border rounded p-2"
          value={item.product_id}
          onChange={(e) =>
            onChange(
              index,
              "product_id",
              Number(e.target.value)
            )
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
        ₹{sellingPrice.toFixed(2)}
      </td>

      <td className="border p-2">
        {stock}
      </td>

      <td className="border p-2">

        <input
          type="number"
          min="1"
          max={stock}
          value={item.quantity}
          className="w-full border rounded p-2"
          onChange={(e) =>
            onChange(
              index,
              "quantity",
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