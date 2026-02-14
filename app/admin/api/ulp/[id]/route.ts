import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

        const formData = await request.formData()

        await prisma.ulpTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                nama: String(formData.get('nama')),
                alamat: String(formData.get('alamat')),
                
            }
        })

        

        return NextResponse.json({ status: 200, pesan: "berhasil" })

}


// export const GET = async (request: Request, { params }: { params: { id: string } }) => {
//         const karyawan = await prisma.karyawanTb.findMany({
//             where: {
//                 divisiId: Number(params.id)
//             },
//             orderBy: {
//                 id: "asc"
//             }
//         });
//         return NextResponse.json(karyawan, { status: 200 })

// }

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
        const karyawan = await prisma.ulpTb.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(karyawan, { status: 200 })

}