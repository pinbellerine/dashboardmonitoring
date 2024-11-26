import { createSignal, onCleanup } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserList = () => {
  let gridApi;

  // Function to retrieve data from localStorage
  const getUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  };

  // Define column definitions for ag-Grid
  const columnDefs = [
    { field: 'name', headerName: 'Nama Lengkap', sortable: true, filter: true },
    { field: 'birthdate', headerName: 'Tanggal Lahir', sortable: true, filter: true },
    { field: 'bloodType', headerName: 'Golongan Darah', sortable: true, filter: true },
    { field: 'gender', headerName: 'Jenis Kelamin', sortable: true, filter: true },
    { field: 'age', headerName: 'Umur', sortable: true, filter: true },
    { field: 'job', headerName: 'Pekerjaan', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    {
    }
  ];

  // Function to set gridApi
  const onGridReady = (params) => {
    gridApi = params.api;
    gridApi?.sizeColumnsToFit();
  };

  // Define row data using local storage data
  const [rowData] = createSignal(getUsersFromLocalStorage());

  // Cleanup function
  onCleanup(() => {
    // Cleanup code if needed
  });

  return (
    <div class="grid-form-container">
      <div class="ag-theme-alpine" style={{ height: '500px', width: '500px', flex: 1 }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={rowData()}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            resizable: true,
          }}
        />
        </div>
    </div>
  );
};

export default UserList;
