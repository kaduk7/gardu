"use client"
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { supabase, supabaseBUCKET, supabaseUrl, tanggalIndo } from '../helper';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation"

const Superadmin = () => {
  const [nama, setNama] = useState("")
  const [usernama, setUsernama] = useState("")
  const [password, setPassword] = useState("")
  const [ulp, setUlp] = useState("")
  const refemail = useRef<HTMLInputElement>(null);
  const router = useRouter()

   const setfokusemail = () => {
        refemail.current?.focus();
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

  useEffect(() => {
    reload()
  }, [])

 function clearForm() {
         setNama('')
         setUlp('')
         setPassword('')
         setUsernama('')
     }

  const reload = async () => {
    try {
      // const response = await fetch(`/api/karyawan`);
      // const result = await response.json();
      // setKaryawanId(result.id)
      // setNama(result.nama)
      // setAlamat(result.alamat)
      // setTempatlahir(result.tempatLahir)
      // setTanggallahir(moment(result.tanggalLahir).format("YYYY-MM-DD"))
      // setHp(result.hp)
      // setEmail(result.email)
      // setFotolama(result.foto)
      // setFotobaru(result.foto)
      // console.log("lihat foto", result.foto)
      // setDatakaryawan(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSimpan = async (e: SyntheticEvent) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('nama', nama)
      formData.append('ulp', ulp)
      formData.append('usernama', usernama)
      formData.append('password', password)

      const xxx = await axios.post(`/admin/api/superadmin`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (xxx.data.pesan == 'usernama sudah ada') {
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Usernama sudah terdaftar',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(function () {
          setfokusemail()
        }, 1500);
      }

      if (xxx.data.pesan == 'berhasil') {
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
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">

            <div className="card-body">
              <form onSubmit={handleSimpan}>
                <div className="row mb-3">

                </div>


                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }} >Nama</label>
                    <input
                      required
                      autoFocus
                      type="text"
                      className="form-control"
                      value={nama} onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>ULP</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={ulp} onChange={(e) => setUlp(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Usernama</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={usernama} onChange={(e) => setUsernama(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Password</label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">

                    <button type="submit" className="btn btn-primary light" style={{ width: 150 }}>Simpan</button>

                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Superadmin