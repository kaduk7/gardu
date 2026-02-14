"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { LbsTb } from "@prisma/client";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET, supabaseUrl } from '@/app/helper'
import { setuid } from "process";

function Update({ lbs, reload, penyulang }: { lbs: LbsTb, reload: Function, penyulang: Array<any> }) {
    const [nama, setNama] = useState(lbs.nama)
    const [penyulangId, setPenyulangId] = useState(String(lbs.penyulangId))
    const [alamat, setAlamat] = useState(lbs.alamat)
    const [acuan, setAcuan] = useState(lbs.acuan)
    const [koordinat1, setKoordinat1] = useState("")
    const [koordinat2, setKoordinat2] = useState("")
    const [show, setShow] = useState(false);
    const router = useRouter()
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

    useEffect(() => {
        splitData()
    }, []);


    const splitData = () => {
        const koordinat = lbs.kordinat.split(', ');
        if (koordinat.length === 2) {
            setKoordinat1(koordinat[0]);
            setKoordinat2(koordinat[1]);
        }
    }

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setNama(lbs.nama)
        setPenyulangId(String(lbs.penyulangId))
        setAlamat(lbs.alamat)
        setAcuan(lbs.acuan)
        splitData()
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const koordinat = `${koordinat1}, ${koordinat2}`;
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('penyulangId', penyulangId)
            formData.append('alamat', alamat)
            formData.append('acuan', acuan)
            formData.append('koordinat', koordinat)

            const xxx = await axios.patch(`/admin/api/lbs/${lbs.id}`, formData, {
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
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Rute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label" >Penyulang</label>
                            <div className="col-sm-9">
                                <select
                                    required
                                    autoFocus
                                    className="form-control"
                                    value={penyulangId} onChange={(e) => setPenyulangId(e.target.value)}>
                                    <option value={''}> Pilih Penyulang</option>
                                    {penyulang?.map((item: any, i) => (
                                        <option key={i} value={item.id} >{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label" >Nama</label>
                            <div className="col-sm-9">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label" >Alamat</label>
                            <div className="col-sm-9">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label" >Acuan</label>
                            <div className="col-sm-9">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={acuan} onChange={(e) => setAcuan(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label" >Koordinat</label>
                            <div className="col-sm-4">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={koordinat1} onChange={(e) => setKoordinat1(e.target.value)}
                                />
                            </div>
                            <label className="col-sm-1 col-form-label" > </label>
                            <div className="col-sm-4">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={koordinat2} onChange={(e) => setKoordinat2(e.target.value)}
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

export default Update