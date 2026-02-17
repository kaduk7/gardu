import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {

    const formData = await request.formData()
    const cekusernama = await prisma.penggunaTb.findUnique({
        where: {
            usernama: String(formData.get('usernama'))
        },
    })

    if (cekusernama) {
        return NextResponse.json({ pesan: "usernama sudah ada" })
    }

    await prisma.penggunaTb.create({
        data: {
            nama: String(formData.get('nama')),
            ulp: String(formData.get('ulp')),
            usernama: String(formData.get('usernama')),
            alamat: String(formData.get('alamat')),
            UserTb: {
                create: {
                    usernama: String(formData.get('usernama')),
                    password: await bcrypt.hash(String(formData.get('password')), 10),
                    status: "Admin"
                }
            },
        },
        include: {
            UserTb: true
        }
    })
    
    return NextResponse.json({ pesan: 'berhasil' })

}

export const GET = async () => {
    const pengguna = await prisma.penggunaTb.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(pengguna, { status: 200 })

}