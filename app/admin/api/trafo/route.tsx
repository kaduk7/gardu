import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {

        const formData = await request.formData()

        await prisma.garduTb.create({
            data: {
                nama: String(formData.get('nama')),
                penyulangId: Number(formData.get('penyulangId')),
                alamat: String(formData.get('alamat')),
                namatrafo: String(formData.get('merektrafo')),
                ukuran: String(formData.get('ukuran')),
                
            },
        })
        return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
        const karyawan = await prisma.garduTb.findMany({
            include: {
                PenyulangTb: true,
            },
            orderBy: {
                nama: "asc"
            }
        });
        return NextResponse.json(karyawan, { status: 200 })
}
