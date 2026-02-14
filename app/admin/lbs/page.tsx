"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';

const Lbs = () => {
  const [datalbs, setDatalbs] = useState([])
  const [datapenyulang, setDatapenyulang] = useState([])
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload()
    penyulang()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/lbs`);
      const result = await response.json();
      setDatalbs(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const penyulang = async () => {
    try {
      const response = await fetch(`/admin/api/penyulang`);
      const result = await response.json();
      setDatapenyulang(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datalbs.filter(
    (item: any) => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'Nama Lbs',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Penyulang',
      selector: (row: any) => row.PenyulangTb?.nama,
      sortable: true,
      width: '150px'     
    },
    {
      name: 'Alamat',
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Acuan',
      selector: (row: any) => row.acuan,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update reload={reload} lbs={row} penyulang={datapenyulang} />
          <Delete reload={reload} lbsId={row.id} />
        </div>
      ),
      width: '150px'
    },

  ];

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Data Lbs</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} penyulang={datapenyulang} />
                </div>
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text border-0"><i className="mdi mdi-magnify"></i></span>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search..."
                      aria-label="Search Input"
                      value={filterText}
                      onChange={(e: any) => setFilterText(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                persistTableHead
                responsive
                paginationPerPage={itemsPerPage}
                paginationTotalRows={filteredItems.length}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={handleRowsPerPageChange}
                paginationRowsPerPageOptions={[5, 10, 20]}
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#53d0b2',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Lbs