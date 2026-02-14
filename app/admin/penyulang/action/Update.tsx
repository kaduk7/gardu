/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import { PenyulangTb } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import moment from "moment"
import { useSession } from "next-auth/react"

function Update({ penyulang, reload, daftarulp }: { penyulang: PenyulangTb, reload: Function, daftarulp: Array<any> }) {
    const session = useSession()
    const [nama, setNama] = useState(penyulang.nama)
    const [ulpId, setUlpId] = useState(String(penyulang.ulpId))
    const [garduinduk, setGarduInduk] = useState(penyulang.garduinduk)
    const [jenis, setJenis] = useState(penyulang.jenis)
    const [arus, setArus] = useState(penyulang.arus)
    const [daerahlayanan, setDaerahLayanan] = useState(penyulang.daerahlayanan)

    const [show, setShow] = useState(false)
    const router = useRouter()

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => {
        setShow(true);
    }

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

    const refreshform = () => {
        setNama(penyulang.nama)
        setUlpId(String(penyulang.ulpId))
        setGarduInduk(penyulang.garduinduk)
        setJenis(penyulang.jenis)
        setArus(penyulang.arus)
        setDaerahLayanan(penyulang.daerahlayanan)
    }


    const handleUpdate = async (e: SyntheticEvent) => {
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

            const xxx = await axios.patch(`/admin/api/penyulang/${penyulang.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            
            if (xxx.data.pesan == 'berhasil') {
                setShow(false);
                setIsLoading(false)
                reload()
                router.refresh()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil diubah',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: "black" }}>Edit Data Karyawan</Modal.Title>
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
        </>
    )
}

export default Update