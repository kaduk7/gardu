/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Select from 'react-select'
import { StyleSelect } from "@/app/helper";

function Add({ reload, daftarulp }: { reload: Function, daftarulp: Array<any> }) {
    const [nama, setNama] = useState("")
    const [ulpId, setUlpId] = useState("")
    const [garduinduk, setGarduInduk] = useState("")
    const [jenis, setJenis] = useState("")
    const [arus, setArus] = useState("")
    const [daerahlayanan, setDaerahLayanan] = useState("")
    const [selected, setSelected] = useState(null)

    const [show, setShow] = useState(false);
    const router = useRouter()

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);
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


    function clearForm() {
        setNama('')
        setUlpId('')
        setGarduInduk('')
        setJenis('')
        setArus('')
        setDaerahLayanan('')
        setSelected(null)
    }

    const handlechange = (value: any) => {
        setUlpId(value.id);
        setSelected(value)
        console.log("ulpId", value.id)
        console.log("selec", value)
    }

    const handleSubmit = async (e: SyntheticEvent) => {

        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('ulpId', ulpId)
            formData.append('garduinduk', garduinduk)
            formData.append('jenis', jenis)
            formData.append('arus', arus)
            formData.append('daerahlayanan', daerahlayanan)


            const xxx = await axios.post(`/admin/api/penyulang`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'berhasil') {
                handleClose();
                clearForm();
                reload()
                router.refresh()
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Simpan',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                <i className=""></i>Tambah</button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title >Tambah Data Penyulang</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" style={{ color: "black", borderColor: "grey" }}>Nama Penyulang</label>
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
                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>ULP</label>
                                <select
                                    required
                                    className="form-control"
                                    value={ulpId} onChange={(e) => setUlpId(e.target.value)}
                                >
                                    <option value='' disabled={!!ulpId}>--Pilih--</option>
                                    {daftarulp.map((item: any) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>GI</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={garduinduk} onChange={(e) => setGarduInduk(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>Jenis Layanan</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={jenis} onChange={(e) => setJenis(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label" style={{ color: "black" }}>Arus</label>
                                <div className="input-group input-success">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                        value={arus} onChange={(e) => setArus(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>



                        <div className="row  mb-3">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" style={{ color: "black" }}>Daerah Layanan</label>
                                <textarea
                                    required
                                    className="form-control"
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    value={daerahlayanan} onChange={(e) => setDaerahLayanan(e.target.value)}
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