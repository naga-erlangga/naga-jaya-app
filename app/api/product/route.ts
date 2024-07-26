import prisma from '@/lib/prisma'
import {NextResponse} from "next/server";

export async function GET(req: Request) {

    let products = await prisma.product.findMany({})  || []

    return NextResponse.json(products)
}

export async function POST(req: Request) {
    let {name, harga_beli
        ,harga_jual_satuan
        ,harga_jual_lusinan
        ,harga_jual_kartonan} = await req.json()

    let product = await prisma.product.create({
        data:{
            name,
            harga_beli: parseInt(harga_beli),
            harga_jual_kartonan : parseInt(harga_jual_kartonan),
            harga_jual_lusinan : parseInt(harga_jual_lusinan),
            harga_jual_satuan : parseInt(harga_jual_satuan)
        }
    })

    return NextResponse.json(product)
}