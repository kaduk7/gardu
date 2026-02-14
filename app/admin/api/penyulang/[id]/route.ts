import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

    const formData = await request.formData()

    await prisma.penyulangTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            ulpId: Number(formData.get('ulpId')),
            garduinduk: String(formData.get('garduinduk')),
            jenis: String(formData.get('jenis')),
            arus: String(formData.get('arus')),
            daerahlayanan: String(formData.get('daerahlayanan')),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })

}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const penyulang = await prisma.penyulangTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(penyulang, { status: 200 })
}