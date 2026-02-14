import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

    const formData = await request.formData()

    await prisma.garduTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
            namatrafo: String(formData.get('merek')),
            ukuran: String(formData.get('ukuran')),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })

}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const penyulang = await prisma.garduTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(penyulang, { status: 200 })
}