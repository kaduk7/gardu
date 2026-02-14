-- CreateTable
CREATE TABLE "KaryawanTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "alamat" TEXT,
    "hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "divisi" TEXT NOT NULL,
    "foto" TEXT,
    "ktp" TEXT,
    "CV" TEXT,
    "ijazah" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KaryawanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobdeskTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "namaJob" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "team" TEXT NOT NULL,
    "namaTeam" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "suratTugas" TEXT NOT NULL,
    "beritaAcara" TEXT NOT NULL,
    "laporanAnggaran" TEXT NOT NULL,
    "tanggalPelaksanaan" TIMESTAMP(3),
    "file" TEXT,
    "alasan" TEXT,
    "keteranganAkhir" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobdeskTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestJobdeskTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "namaJob" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "namaTeam" TEXT NOT NULL,
    "alasan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestJobdeskTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeritaTb" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggalBerita" TIMESTAMP(3) NOT NULL,
    "isi" TEXT NOT NULL,
    "foto" TEXT,
    "karyawanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeritaTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KomentarTb" (
    "id" SERIAL NOT NULL,
    "beritaId" INTEGER NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "isi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KomentarTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengumumanTb" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggalPengumuman" TIMESTAMP(3) NOT NULL,
    "isi" TEXT NOT NULL,
    "divisi" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengumumanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "usernama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HakAksesTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "datakaryawan" TEXT NOT NULL,
    "informasi" TEXT NOT NULL,
    "jobdesk" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HakAksesTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventaris" (
    "id" SERIAL NOT NULL,
    "kodeBarang" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventaris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeminjamanTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeminjamanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPinjamTb" (
    "id" SERIAL NOT NULL,
    "peminjamanId" INTEGER NOT NULL,
    "inventarisId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailPinjamTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbsensiTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AbsensiTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlideTb" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlideTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT,
    "alamat" TEXT,
    "email" TEXT,
    "telp" TEXT,
    "wa" TEXT,
    "lokasi" TEXT,
    "radius" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_hp_key" ON "KaryawanTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_email_key" ON "KaryawanTb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_karyawanId_key" ON "UserTb"("karyawanId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_usernama_key" ON "UserTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "HakAksesTb_karyawanId_key" ON "HakAksesTb"("karyawanId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventaris_kodeBarang_key" ON "Inventaris"("kodeBarang");

-- AddForeignKey
ALTER TABLE "JobdeskTb" ADD CONSTRAINT "JobdeskTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestJobdeskTb" ADD CONSTRAINT "RequestJobdeskTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeritaTb" ADD CONSTRAINT "BeritaTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KomentarTb" ADD CONSTRAINT "KomentarTb_beritaId_fkey" FOREIGN KEY ("beritaId") REFERENCES "BeritaTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KomentarTb" ADD CONSTRAINT "KomentarTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTb" ADD CONSTRAINT "UserTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HakAksesTb" ADD CONSTRAINT "HakAksesTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeminjamanTb" ADD CONSTRAINT "PeminjamanTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPinjamTb" ADD CONSTRAINT "DetailPinjamTb_inventarisId_fkey" FOREIGN KEY ("inventarisId") REFERENCES "Inventaris"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPinjamTb" ADD CONSTRAINT "DetailPinjamTb_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "PeminjamanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiTb" ADD CONSTRAINT "AbsensiTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
