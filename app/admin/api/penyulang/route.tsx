import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {

        const formData = await request.formData()

        await prisma.penyulangTb.create({
            data: {
                nama: String(formData.get('nama')),
                ulpId: Number(formData.get('ulpId')),
                garduinduk: String(formData.get('garduinduk')),
                jenis: String(formData.get('jenis')),
                arus: String(formData.get('arus')),
                daerahlayanan: String(formData.get('daerahlayanan')),
                
            },
        })
        return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
        const karyawan = await prisma.penyulangTb.findMany({
            include: {
                UlpTb: true,
            },
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(karyawan, { status: 200 })
}
