import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

type Params = {
    params: {
        params: {
            productId: string;
        };
    };
};

export async function GET(req: Request, params: any){
    let product = await prisma.product.findFirst({
        where:{
            id: params.params.productId
        }
    })

    return NextResponse.json(product)
}

export async function PATCH(req: Request, params: any){

    let {name, harga_beli
        ,harga_jual_satuan
        ,harga_jual_lusinan
        ,harga_jual_kartonan} = await req.json()

    let product = await prisma.product.update({
        where:{
            id: params.params.productId,
        },
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

export async function DELETE(req: Request, params: any) {
    let {productId} = params.params

    try{
        let product = await prisma.product.findFirstOrThrow({
            where:{
                id: productId
            }
        })

        await prisma.product.delete({
            where:{
                id: productId
            }
        })

        return NextResponse.json("deleted")
    }catch(e){
        return new NextResponse("Product Not found", {status: 404})
    }
}