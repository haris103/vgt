import React from 'react';
import MaterialTable from 'material-table';
import XLSX from 'xlsx';
import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const studentData = [
  {
    id: 1,
    name: "Sonia",
    email: "soniadolfus@gmail.com",
    year: 2022,
    fee: 16700,
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@gmail.com",
    year: 2016,
    fee: 7856,
  },

  {
    id: 3,
    name: "Esther",
    email: "esther@gmail.com",
    year: 2020,
    fee: 7845,
  },

  {
    id: 4,
    name: "Edithstein",
    email: "eidthstein@gmail.com",
    year: 2020,
    fee: 7845,
  }
]
function PDFGenerator() {
  const columns = [
    { title: "Name", field: "name", },
    { title: "Email", field: "email", },
    { title: "Year", field: "year", type: "numeric" },
    { title: "Fee", field: 'fee', type: "currency" }]

  const downloadExcel = () => {
    const newData = studentData.map(row => {
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "StudentsData.xlsx")


  }
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: studentData
    })
    doc.save('table.pdf')
  }

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Export Data to Pdf in Material Table</h4>
      <MaterialTable
        title="Student Details"
        columns={columns}
        data={studentData}
        actions={[
          {
            icon: () => <button>Export</button>,// you can pass icon too
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true
          },
          {
            icon: () => <PrintIcon />,// you can pass icon too
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true
          }
        ]}
      />
    </div>
  );
}

export default PDFGenerator;
