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

import { useState, useMemo, useCallback,  } from "react";

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
import { AllCommunityModule, InfiniteRowModelModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import TableJobs from "assets/js/TableJobs.js"
import { maxWidth } from "@mui/system";

const modules = [AllCommunityModule];

const tableJobs = new TableJobs();

function Tables() {
    const containerStyle = useMemo(() => ({ width: "100%", height: "150px" }), []);

    const gridStyle = useMemo(() => ({ height: "150px", width: "100%" }), []);

    const { columns, rows } = authorsTableData;
    const { columns: prCols, rows: prRows } = projectsTableData;

    const defaultColDef = useMemo(() => {
      return { flex: 1, minWidth: 100, sortable: false };
    }, []);

    const onGridReady = useCallback((params) => {

      const dataSource = {
        rowCount: undefined,
        getRows: (params) => {

          console.log("asking for " + params.startRow + " to " + params.endRow);

          // Get another part of vacancies!
          tableJobs.getPartOfVacancies(params.startRow, params.endRow, (vacancies) => {
            console.log(vacancies);
            // if on or after the last page, work out the last row.
            let lastRow = 8;
            // call the success callback
            params.successCallback(vacancies, lastRow);
          });
        }
      };

      // Data Source
      params.api.setGridOption("datasource", dataSource);
        
    }, []);


    // Row Data of Vacancies: The data to be displayed.
    const [vacancyRowData, setVacancyRowData] = useState([
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [vacancyColDefs, setVacancyColDefs] = useState([
        {
          headerName: "ID",
          flex: 0.2,
          maxWidth: 50,
          // it is important to have node.id here, so that when the id changes (which happens
          // when the row is loaded) then the cell is refreshed.
          valueGetter: "node.id",
          cellRenderer: (props) => {
            if (props.value !== undefined) {
              return props.value;
            } else {
              return (
                <img src="https://www.ag-grid.com/example-assets/loading.gif" />
              );
            }
          }
        },
        { field: "vacancy_id", flex: 0.5 },
        { field: "is_opened", flex: 1 },
        { field: "name", flex: 1 },
        { field: "salary", flex: 1 },
        { field: "opened_at", flex: 1 },
        { field: "closed_at", flex: 1 },
    ]);

    // Row Data of Candidates: The data to be displayed.
    const [candidatesRowData, setCandidatesRowData] = useState([
      // { candidate_id: "Tesla", for_vacancy_id: "Model Y", first_name: 64950, last_name: true, surname: "surname", interview_date: "12", requested_salary: "33", exp_in_full_years: "1"},
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [candidtesColDefs, setCandidatesColDefs] = useState([
        { field: "candidate_id", flex: 0.5 },
        { field: "for_vacancy_id", flex: 0.5 },
        { field: "first_name", flex: 1 },
        { field: "last_name", flex: 1 },
        { field: "surname", flex: 1 },
        { field: "interview_date", flex: 1},
        { field: "requested_salary", flex: 1},
        { field: "exp_in_full_years", flex: 0.5} 
    ]);

    // Set update methods
    tableJobs.setRowsOfVacancies = setVacancyRowData;
    tableJobs.setRowsOfCandidates = setCandidatesRowData;
    
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
              
              <div style={containerStyle}>
                <div style={gridStyle}>
                <AgGridReact
                    columnDefs={vacancyColDefs}
                    defaultColDef={defaultColDef}
                    rowBuffer={0}
                    rowModelType={"infinite"}
                    cacheBlockSize={3}
                    cacheOverflowSize={1}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1000}
                    maxBlocksInCache={10}
                    onGridReady={onGridReady}
                />
            </div>
          </div>
          </AgGridProvider>
          </Card>
          
          <ArgonBox>
            <Card style={{ marginTop: 20 }}>
              
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Кандидаты</ArgonTypography>
              </ArgonBox>
              <div style={{display: "flex", marginBottom: 14, padding: '0 10px'}}>
                <ArgonButton style={{marginRight: 10}} variant='contained' size='small' color="success" onClick={() => { tableJobs.getCandidates(); }}>
                  Добавить кандидата
                </ArgonButton>
                <ArgonButton style={{marginRight: 10,}} variant='outlined' size='small' color="info" onClick={() => { tableJobs.getCandidates(); }}>
                  Изменить
                </ArgonButton>
                <ArgonButton variant='outlined' size='small' color="error" onClick={ () => { tableJobs.getCandidates(); }}>
                  Удалить
                </ArgonButton>
              </div>
             

              <AgGridProvider modules={modules}>
                <div style={{ height: "100%"}}>
                  <AgGridReact
                      domLayout="autoHeight"
                      rowData={candidatesRowData}
                      columnDefs={candidtesColDefs}
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