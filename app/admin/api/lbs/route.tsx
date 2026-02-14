import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    await prisma.lbsTb.create({
        data: {
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
            penyulangId: Number(formData.get('penyulangId')),
            acuan: String(formData.get('acuan')),
            kordinat: String(formData.get('koordinat')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.lbsTb.findMany({
        include: {
            PenyulangTb: true,
        },
        orderBy: {
            PenyulangTb: {
                nama: 'asc'
            }
        }
    });
    return NextResponse.json(user, { status: 200 })
}