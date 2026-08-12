import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportInvoiceExcel(sale) {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Invoice");

  sheet.properties.defaultRowHeight = 22;

  sheet.columns = [
    { width: 8 },
    { width: 35 },
    { width: 15 },
    { width: 18 },
    { width: 18 },
  ];

  // ==========================
  // Company
  // ==========================

  sheet.mergeCells("A1:E1");
  sheet.getCell("A1").value = "KHANA WEAVES";
  sheet.getCell("A1").font = {
    size: 22,
    bold: true,
  };
  sheet.getCell("A1").alignment = {
    horizontal: "center",
  };

  sheet.mergeCells("A2:E2");
  sheet.getCell("A2").value =
    "Near Markandeshwar Temple, Guledagudda - 587203";

  sheet.mergeCells("A3:E3");
  sheet.getCell("A3").value =
    "Phone: +91 9876543210";

  sheet.mergeCells("A4:E4");
  sheet.getCell("A4").value =
    "Email: info@khanaweaves.in";

  sheet.mergeCells("A5:E5");
  sheet.getCell("A5").value =
    "GSTIN : 29ABCDE1234F1Z5";

  // ==========================
  // Invoice Heading
  // ==========================

  sheet.mergeCells("A7:E7");

  sheet.getCell("A7").value = "TAX INVOICE";

  sheet.getCell("A7").font = {
    size: 18,
    bold: true,
  };

  sheet.getCell("A7").alignment = {
    horizontal: "center",
  };

  // ==========================
  // Customer Details
  // ==========================

  sheet.getCell("A9").value = "Invoice No";
  sheet.getCell("B9").value = sale.invoice_no;

  sheet.getCell("A10").value = "Customer";
  sheet.getCell("B10").value = sale.customer_name;

  sheet.getCell("A11").value = "Phone";
  sheet.getCell("B11").value = sale.phone;

  sheet.getCell("A12").value = "Date";
  sheet.getCell("B12").value = new Date(
    sale.sale_date
  ).toLocaleDateString("en-IN");

  sheet.getCell("D9").value = "Payment";
  sheet.getCell("E9").value = sale.payment_method;

  // ==========================
  // Table Header
  // ==========================

  const startRow = 15;

  [
    "#",
    "Product",
    "Qty",
    "Price",
    "Amount",
  ].forEach((title, index) => {
    const cell = sheet.getCell(startRow, index + 1);

    cell.value = title;

    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "2563EB",
      },
    };

    cell.alignment = {
      horizontal: "center",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // ==========================
  // Products
  // ==========================

  let row = startRow + 1;

  sale.items.forEach((item, index) => {
    sheet.getCell(row, 1).value = index + 1;
    sheet.getCell(row, 2).value = item.product_name;
    sheet.getCell(row, 3).value = item.quantity;
    sheet.getCell(row, 4).value = item.selling_price;
    sheet.getCell(row, 5).value = item.subtotal;

    for (let i = 1; i <= 5; i++) {
      sheet.getCell(row, i).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }

    row++;
  });

  row += 2;

  sheet.getCell(`D${row}`).value = "Discount";
  sheet.getCell(`E${row}`).value = sale.discount;

  row++;

  sheet.getCell(`D${row}`).value = "Tax";
  sheet.getCell(`E${row}`).value = sale.tax;

  row++;

  sheet.getCell(`D${row}`).value = "Grand Total";

  sheet.getCell(`D${row}`).font = {
    bold: true,
  };

  sheet.getCell(`E${row}`).value = sale.total_amount;

  sheet.getCell(`E${row}`).font = {
    bold: true,
  };

  row += 4;

  sheet.mergeCells(`A${row}:E${row}`);

  sheet.getCell(`A${row}`).value =
    "Thank you for your business!";

  sheet.getCell(`A${row}`).font = {
    italic: true,
    bold: true,
  };

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Invoice-${sale.invoice_no}.xlsx`
  );
}