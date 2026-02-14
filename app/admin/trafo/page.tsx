"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Delete from './action/Delete';
import ULP from '../ulp/page';
import Update from './action/Update';

const Trafo = () => {
  const [datatrafoall, setDataTrafoAll] = useState([])
  const [datatrafo, setDataTrafo] = useState([])
  const [datatrafoterpilih, setDataTrafoTerpilih] = useState([])
  const [dataulp, setDataulp] = useState([])
  const [datapenyulang, setDatapenyulang] = useState([])
  const [datapenyulangterpilih, setDatapenyulangTerpilih] = useState([])
  const [ulpid, setUlpid] = useState('')
  const [penyulangid, setPenyulangid] = useState('')
  const [all, setAll] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload()
    daftarulp()
    daftarpenyulang()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/trafo`);
      const result = await response.json();
      setDataTrafo(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const daftarulp = async () => {
    try {
      const response = await fetch(`/admin/api/ulp`);
      const result = await response.json();
      setDataulp(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const daftarpenyulang = async () => {
    try {
      const response = await fetch(`/admin/api/penyulang`);
      const result = await response.json();
      setDatapenyulang(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleulp = (e: any) => {
    const selectedValue = e.target.value;
    setUlpid(selectedValue);
    setPenyulangid("");
    setFilterText("");
    setAll(false);

    const xxx = datapenyulang.filter(
      (item: any) => item.ulpId == Number(selectedValue)
    );
    setDatapenyulangTerpilih(xxx);
    setDataTrafoTerpilih([]);
  };

  const handlepenyulang = (e: any) => {
    const selectedValue = e.target.value;
    setPenyulangid(selectedValue);
    const xxx = datatrafo.filter(
      (item: any) => item.penyulangId == Number(selectedValue)
    );
    setDataTrafoTerpilih(xxx);
  };

  const reloadtabel = async (penyulangId: any) => {
    const response = await fetch(`/admin/api/trafo`);
    const result = await response.json();
    const xxx = result.filter((item: any) => item.penyulangId == Number(penyulangId));
    setDataTrafoTerpilih(xxx);
  };

  const handlechange = (e: any) => {
    const selectedValue = e.target.value;
    setFilterText(selectedValue);
    setUlpid("");
    setPenyulangid("");
    setDataTrafoTerpilih([]);

    if (selectedValue !== "") {
      setAll(true);
    } else {
      setAll(false);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datatrafoterpilih.filter(
    (item: any) => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
  );

  //  const filteredItems = all
  //   ? datatrafo.filter(
  //     (item: any) =>
  //       item.nama &&
  //       item.nama.toLowerCase().includes(filterText.toLowerCase())
  //   )
  //   : datatrafoterpilih;


  const columns =
    [
      {
        name: 'No',
        cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
        sortable: false,
        width: '80px'
      },
      {
        name: 'Nama',
        selector: (row: any) => row.nama,
        sortable: true,
      },
      {
        name: 'Alamat',
        selector: (row: any) => row.alamat,
      },
      {
        name: 'Action',
        cell: (row: any) => (
          <div className="d-flex">
            <Delete reload={reload} reloadtabel={reloadtabel} idpenyulang={penyulangid}  trafoId={row.id}  />
            <Update reload={reload} reloadtabel={reloadtabel} idpenyulang={penyulangid}  trafo={row}  />
          </div>
        ),
        width: '150px'
      },

    ]

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title col-md-5 ">Daftar Trafo Gardu</h1>
              <div className="card-title col-md-3">
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <h6 className="form-label tebalsikit" >Unit Layanan Pelanggan</h6>
                    <select
                      required
                      autoFocus
                      className="form-control"
                      value={ulpid} onChange={handleulp}>
                      <option value="" disabled={!!ulpid}>
                        -- Pilih --
                      </option>
                      {dataulp?.map((item: any, i) => (
                        <option key={i} value={item.id} >{item.nama}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-title col-md-3">
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <h6 className="form-label tebalsikit" >Penyulang</h6>
                    {ulpid === '' ?
                      <select disabled
                        className="form-control">
                        <option value=""> Menunggu pilih ULP</option>
                      </select>
                      :
                      <select
                        className="form-control"
                        value={penyulangid} onChange={handlepenyulang}>
                        <option value="" disabled={!!penyulangid}>
                          -- Pilih --
                        </option>
                        {datapenyulangterpilih?.map((item: any, i) => (
                          <option key={i} value={item.id} >{item.nama}</option>
                        ))}
                      </select>
                    }

                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* <div className="row mb-3">
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text">
                      <i className="mdi mdi-magnify"></i>
                    </span>
                    <input
                      // autoFocus
                      id="search"
                      type="text"
                      placeholder="Search..."
                      aria-label="Search Input"
                      value={filterText}
                      onChange={handlechange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div> */}
              {penyulangid === '' ?
                <div>Silahkan Pilih Penyulang terlebih dahulu</div>
                :
                <>
                  <div className="row mb-3">
                    <div className="col-md-9">
                      <Add reload={reload}  reloadtabel={reloadtabel} idpenyulang={penyulangid} />
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
                </>
              }
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Trafo