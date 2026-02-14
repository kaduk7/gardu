"use client"
import { useState, useRef, useEffect, SyntheticEvent } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import DataTable from 'react-data-table-component';

function Add({ reload, idpenyulang,reloadtabel }: { reload: Function,reloadtabel: Function, idpenyulang: String }) {
    const [datauser, setDatauser] = useState([])
    const penyulangId = idpenyulang
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [merektrafo, setMerekTrafo] = useState("")
    const [ukuran, setUkuran] = useState("")
    const [show, setShow] = useState(false);
    const router = useRouter()
    const ref = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)

    if (isLoading) {
        Swal.fire({
            title: "Mohon tunggu!",
            html: "Sedang mengirim data ke server",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
    }

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);

    function clearForm() {
        setNama("")
        setAlamat("")
        setMerekTrafo("")
        setUkuran("")
    }


    const handleSubmit = async (e: SyntheticEvent)  => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('penyulangId', String(penyulangId))
            formData.append('nama', nama)
            formData.append('alamat', alamat)
            formData.append('merektrafo', merektrafo)
            formData.append('ukuran', ukuran)

            const xxx = await axios.post(`/admin/api/trafo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (xxx.data.pesan == 'berhasil') {
                setIsLoading(false)
                reload()
                reloadtabel(penyulangId)
                console.log("yes",penyulangId)
                router.refresh()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Simpan',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah</button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Trafo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" style={{ color: "black", borderColor: "grey" }}>Nama</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" style={{ color: "black", borderColor: "grey" }}>Alamat</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>Merek Trafo</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={merektrafo} onChange={(e) => setMerekTrafo(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>Ukuran</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={ukuran} onChange={(e) => setUkuran(e.target.value)}
                                />
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                         <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary light">Simpan</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Add