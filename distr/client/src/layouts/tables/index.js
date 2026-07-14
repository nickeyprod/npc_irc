/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// AG Grid
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

const modules = [AllCommunityModule];

function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },

      { make: "Ford", model: "F-Series", price: 33850, electric: false },

      { make: "Toyota", model: "Corolla", price: 29600, electric: false },

      { make: "Mercedes", model: "EQA", price: 48890, electric: true },

      { make: "Fiat", model: "500", price: 15774, electric: false },

      { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "make", flex: 1 },
        { field: "model", flex: 1 },
        { field: "price", flex: 1 },
        { field: "electric", flex: 1 }
    ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        
        <ArgonBox mb={3}>
          

          
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Вакансии</ArgonTypography>
            </ArgonBox>
            <AgGridProvider modules={modules}>
              {/* Your AgGridReact components go here */}
              <div style={{ height: "100%"}}>
                <AgGridReact
                    domLayout="autoHeight"
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
          </AgGridProvider>
          </Card>
          
          <ArgonBox>
            <Card style={{ marginTop: 20 }}>
              
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Кандидаты</ArgonTypography>
              </ArgonBox>
              <div style={{display: "flex", marginBottom: 14, padding: '0 10px'}}>
                <ArgonButton style={{marginRight: 10}} variant='contained' size='small' color="success" onClick={console.log("click")}>
                  Добавить кандидата
                </ArgonButton>
                <ArgonButton style={{marginRight: 10,}} variant='outlined' size='small' color="info" onClick={console.log("click")}>
                  Изменить
                </ArgonButton>
                <ArgonButton variant='outlined' size='small' color="error" onClick={console.log("click")}>
                  Удалить
                </ArgonButton>
              </div>
             

              <AgGridProvider modules={modules}>
                <div style={{ height: "100%"}}>
                  <AgGridReact
                      domLayout="autoHeight"
                      rowData={rowData}
                      columnDefs={colDefs}
                  />
                </div>
              </AgGridProvider>
            </Card>
          </ArgonBox>

          <Card style={{ marginTop: 20 }}>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Authors table</ArgonTypography>
            </ArgonBox>
            <ArgonBox
          
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>

        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Projects table</ArgonTypography>
          </ArgonBox>
          <ArgonBox>
            <Table columns={prCols} rows={prRows} />
          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;