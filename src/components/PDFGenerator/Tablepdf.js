import React from "react";

// import XLSX from "xlsx";
import PrintIcon from "@material-ui/icons/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TailwindTable from "./TailwindTable";

const reportData = [
  {
    id: 1,
    name: "10294 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,845.00",
    fee: "$335.00",
  },

  {
    id: 2,
    name: "10429 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,845.00",
    fee: "$315.00",
  },

  {
    id: 3,
    name: "10429 V2 Pay to Play",
    email: "jane@gmail.com",
    year: "$1,245.00",
    fee: "$315.00",
  },

  {
    id: 4,
    name: "10294 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,845.00",
    fee: "$335.00",
  },

  {
    id: 5,
    name: "10429 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,845.00",
    fee: "$315.00",
  },

  {
    id: 6,
    name: "10429 V2 Pay to Play",
    email: "jane@gmail.com",
    year: "$1,245.00",
    fee: "$315.00",
  },

  {
    id: 7,
    name: "10429 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,845.00",
    fee: "$315.00",
  },

  {
    id: 8,
    name: "10429 V2 Pay to Play",
    year: "$2,180.00",
    year: "$1,245.00",
    fee: "$315.00",
  },
  //   {
  //     id: 3,
  //     name: "Esther",
  //     email: "esther@gmail.com",
  //     year: 2020,
  //     fee: 7845,
  //   },

  //   {
  //     id: 4,
  //     name: "Edithstein",
  //     email: "eidthstein@gmail.com",
  //     year: 2020,
  //     fee: 7845,
  //   }
  // ]

  // const report = [
  //   heading: "High Rollers Bingo",
  //   location: "10294 V2 Pay to Play",
  //   location1: "10429 V2 Pay to Play",
  //   status: "Open",
  //   lastupdate: "Updated 03-05-2022 13:10:55",

  //       sales: "$2,180.00",
  //       redeem: "$1,845.00",
  //       net: "$335.00",

  //       sales1: "$1,560.00",
  //       redeem1: "$1,245.00",
  //       net1: "$315.00",
  //       status1: "Open",
  //       lastupdate1: "Updated 03-05-2022 13:10:55",
];
function Tablepdf() {
  const columns = [
    { title: "High Rollers Bingo", field: "name" },
    { title: "Sales", field: "year", type: "numeric" },
    { title: "Redeem", field: "year", type: "numeric" },
    { title: "Net", field: "fee", type: "numeric" },
    // { title: "Status", field: 'fee', type: "name" },
    // { title: "Last Update", field: 'fee', type: "numeric" },
  ];

  const downloadExcel = () => {
    const newData = reportData.map((row) => {
      delete row.tableData;
      return row;
    });
    // const workSheet = XLSX.utils.json_to_sheet(newData);
    // const workBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workBook, workSheet, "students");
    // //Buffer
    // XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // //Binary string
    // XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // //Download
    // XLSX.writeFile(workBook, "ReportData.xlsx");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("All Business", 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: reportData,
    });
    doc.save("table.pdf");
  };

  return (
    <div className="tablepdf">
      <h1 align="center">Revenue Report</h1>
      {/* <h4 align='center'>Revenue Report</h4> */}
      <TailwindTable
        id="10294"
        title="All Business"
        columns={columns}
        data={reportData}
        actions={[
          {
            icon: () => <button>Export</button>, // you can pass icon too
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true,
          },
          {
            icon: () => <PrintIcon />, // you can pass icon too
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true,
          },
        ]}
      />
    </div>
  );
}

export default Tablepdf;
