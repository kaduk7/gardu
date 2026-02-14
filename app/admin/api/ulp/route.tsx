import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {

    const formData = await request.formData()

    await prisma.ulpTb.create({
        data: {
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
        },
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const ulp = await prisma.ulpTb.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(ulp, { status: 200 })
}
