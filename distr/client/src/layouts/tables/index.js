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

import { useState, useMemo, useCallback, useEffect  } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";

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
import { borderRadius, display, height, maxHeight, maxWidth, spacing, textAlign } from "@mui/system";
import { position } from "stylis";
import zIndex from "@mui/material/styles/zIndex";

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

    let purgeCacheOfVacancyTable;

    const onGridReady = useCallback((params) => {

      const dataSource = {
        rowCount: undefined,
        getRows: (params) => {

          console.log("asking for " + params.startRow + " to " + params.endRow);

          // Get another part of vacancies!
          tableJobs.getPartOfVacancies(params.startRow, params.endRow, (vacancies) => {
            // if on or after the last page, work out the last row.
            let lastRow = 8;
            // call the success callback
            params.successCallback(vacancies, lastRow);
          });
        }
      };

      // Data Source
      params.api.setGridOption("datasource", dataSource);
      tableJobs.purgeCacheOfVacancyTable = params.api.purgeInfiniteCache;
        
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
        { field: "total_candidates", flex: 1},
        { field: "opened_at", flex: 1 },
        { field: "closed_at", flex: 0.5 },
    ]);

    // Row Data of Candidates: The data to be displayed.
    const [candidatesRowData, setCandidatesRowData] = useState([
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
    
    useEffect(() => {
      // Get modals
      const addCandidateModal = document.getElementById("add-candidate-modal");
      const updateCandidateModal = document.getElementById("upd-candidate-modal");
      const removeCandidateModal = document.getElementById("remove-candidate-modal");

      // Get all attributes of Candidate from modal
      const candidateNameInpt = document.getElementById("modal-name-inpt");
      const candidateLastNameInpt = document.getElementById("modal-lastname-inpt");
      const candidateSurameInpt = document.getElementById("modal-surname-inpt");
      const candidatevIDInpt = document.getElementById("modal-vID-inpt");
      const candidateExpInpt = document.getElementById("modal-exp-inpt");
      const candidateSalaryInpt = document.getElementById("modal-salary-inpt");
      const candidateInterviewDateInpt = document.getElementById("modal-date-inpt");
      const candidteToRemoveIdInpt = document.getElementById("modal-rm-vID-inpt");
      
      // Add candidate modal
      tableJobs.addCandidateModal = addCandidateModal;
      // Update candidate modal
      tableJobs.updateCandidateModal = updateCandidateModal;
      // Remove candidate modal
      tableJobs.removeCandidateModal = removeCandidateModal;
      

      // Add new candidate fields
      tableJobs.candidateNameInpt = candidateNameInpt;
      tableJobs.candidateLastNameInpt = candidateLastNameInpt;
      tableJobs.candidateSurameInpt = candidateSurameInpt;
      tableJobs.candidatevIDInpt = candidatevIDInpt;
      tableJobs.candidateExpInpt = candidateExpInpt;
      tableJobs.candidateSalaryInpt = candidateSalaryInpt;
      tableJobs.candidateInterviewDateInpt = candidateInterviewDateInpt;
      
      // Remove candidate ID field
      tableJobs.candidteToRemoveIdInpt = candidteToRemoveIdInpt;
    
    }, []);
    
  return (
    
    <DashboardLayout>
       <div class="modal-overlay" id="modal-overlay" style={{top: "140px", width: "400px", marginLeft: "26%", position: "fixed", zIndex: 9999}}>
        {/* Add candicate modal */}
        <div class="modal" id="add-candidate-modal" style={{ display: "none", maxWidth: "450px", padding: "20px", background: "#4cb4c7", borderRadius: "20px"}}>
          <h4 style={{textAlign: "center", color: "white", marginTop: "20px"}}>Добавить кандидата</h4>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "380px", padding: "20px 40px"}}>
          <ArgonInput id="modal-name-inpt" placeholder="Имя"></ArgonInput>
          <ArgonInput id="modal-lastname-inpt" placeholder="Фамилия"></ArgonInput>
          <ArgonInput id="modal-surname-inpt" placeholder="Отчество"></ArgonInput>
          <ArgonInput id="modal-vID-inpt" type="number" placeholder="ID вакансии (к какой вакансии)"></ArgonInput>
          <ArgonInput id="modal-exp-inpt" type="number" min="0" placeholder="Опыт (полных лет)"></ArgonInput>
          <ArgonInput id="modal-salary-inpt" type="number" step="0.01" min="0" placeholder="Желаемая З/П"></ArgonInput>
          <ArgonInput id="modal-date-inpt" type="date" placeholder="Дата собеседования"></ArgonInput>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <ArgonButton variant='contained' size='small' color="success" onClick={ () => {console.log("Add!");} }>Добавить</ArgonButton>
            <ArgonButton style={{marginLeft: "10px"}} variant='contained' size='small' color="error" onClick={ () => { tableJobs.addCandidateModal.style.display = "none"; } }>Отмена</ArgonButton>
          </div>
        </div>
        {/* Update candidate modal */}
        <div class="modal" id="upd-candidate-modal" style={{ display: "none", maxWidth: "450px", padding: "20px", background: "rgb(115 153 160)", borderRadius: "20px"}}>
          <h5 style={{textAlign: "center", marginTop: "20px", color: "white"}}>Изменить кандидата</h5>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "380px", padding: "20px 40px"}}>
          <ArgonInput id="modal-cdID-inpt" type="number" placeholder="ID изменяемого кандидата"></ArgonInput>
          <ArgonInput id="modal-name-inpt" placeholder="Имя"></ArgonInput>
          <ArgonInput id="modal-lastname-inpt" placeholder="Фамилия"></ArgonInput>
          <ArgonInput id="modal-surname-inpt" placeholder="Отчество"></ArgonInput>
          <ArgonInput id="modal-vID-inpt" type="number" placeholder="ID вакансии (к какой вакансии)"></ArgonInput>
          <ArgonInput id="modal-exp-inpt" type="number" min="0" placeholder="Опыт (полных лет)"></ArgonInput>
          <ArgonInput id="modal-salary-inpt" type="number" step="0.01" min="0" placeholder="Желаемая З/П"></ArgonInput>
          <ArgonInput id="modal-date-inpt" type="date" placeholder="Дата собеседования"></ArgonInput>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <ArgonButton variant='contained' size='small' color="success" onClick={ () => { tableJobs.updateCandidate(); } }>Изменить</ArgonButton>
            <ArgonButton style={{marginLeft: "10px"}} variant='contained' size='small' color="error" onClick={ () => { tableJobs.updateCandidateModal.style.display = "none"; } }>Отмена</ArgonButton>
          </div>
        </div>
        {/* Remove candidate modal */}
        <div class="modal" id="remove-candidate-modal" style={{ display: "none", maxWidth: "450px", padding: "20px", background: "rgb(155 77 98)", borderRadius: "20px"}}>
          <h5 style={{textAlign: "center", marginTop: "20px", color: "white"}}>Удалить кандидата</h5>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "80px", padding: "20px 40px"}}>
            <ArgonInput id="modal-rm-vID-inpt" type="number" placeholder="ID удаляемого кандидата"></ArgonInput>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <ArgonButton variant='contained' size='small' color="success" onClick={ () => { tableJobs.removeCandidate(); } }>Удалить</ArgonButton>
            <ArgonButton style={{marginLeft: "10px"}} variant='contained' size='small' color="error" onClick={ () => { tableJobs.removeCandidateModal.style.display = "none"; } }>Отмена</ArgonButton>
          </div>
        </div>
      </div>
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
                <ArgonButton style={{marginRight: 10}} variant='contained' size='small' color="success" onClick={ () => { tableJobs.addCandidateModal.style.display = "block"; } }>
                  Добавить кандидата
                </ArgonButton>
                <ArgonButton style={{marginRight: 10,}} variant='outlined' size='small' color="info" onClick={ () => { tableJobs.updateCandidateModal.style.display = "block"; }}>
                  Изменить
                </ArgonButton>
                <ArgonButton variant='outlined' size='small' color="error" onClick={ () => { tableJobs.removeCandidateModal.style.display = "block"; } }>
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