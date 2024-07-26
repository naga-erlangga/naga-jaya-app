"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import * as React from "react";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {Product} from "@prisma/client";
import {currencyFormat} from "@/lib/utils";
import {useRouter} from "next/navigation";


export default function Dashboard() {
    const [items, setItems] = useState<Product[]>([])
    let router = useRouter()

    useEffect(() => {

        const fetch = async () => {
            let response = await axios.get("/api/product")
            let {data} = response

            setItems(data)
            setDisplay(data)
        }

        fetch()
    }, [])

    const [search, setSearch] = useState("")
    const [display, setDisplay] = useState(items)

    const fetchDisplay = () => {
        setDisplay(items.filter((e) => e.name.toLowerCase().indexOf(search.toLowerCase()) >= 0))
    }

    const cleanDisplay = () => {
        setDisplay(items)
    }

    return (
        <div className={"flex p-5 w-full h-screen gap-3 flex-col"}>
            <div className="text-lg font-bold">
                Products with Harga Beli
            </div>
            <div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="search">Search</Label>
                    <div className={"flex gap-3 "}>
                        <Input id="search"
                               placeholder="Search Product Name"
                               onBlur={(e) => {
                                    setSearch(e.currentTarget.value)
                                }}

                               onKeyUp={(e) => {
                                   if(e.key == 'Enter'){
                                       setSearch(e.currentTarget.value)
                                       fetchDisplay()
                                   }
                               }}
                        />
                        <Button variant="outline" onClick={() => {
                            fetchDisplay()
                        }}> Search </Button>
                        <Button variant="destructive" onClick={() => {
                            cleanDisplay()
                        }}> Clear </Button>
                    </div>
                </div>
            </div>
            <Table>
                <TableCaption>All Products {items.length}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Harga Beli</TableHead>
                        <TableHead className="text-right">Harga Satuan</TableHead>
                        <TableHead className="text-right">Harga Lusinan</TableHead>
                        <TableHead className="text-right">Harga Kartonan</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {display.length == 0 && (
                        <TableRow key={"0"}>
                            <TableCell className="">No Product Found</TableCell>
                        </TableRow>
                    )}
                    {display.map((item) => {
                        return (
                        // @ts-ignore
                            <TableRow key={item.name}>
                                {/*// @ts-ignore*/}
                                <TableCell className="font-medium">{item.name}</TableCell>
                                {/*@ts-ignore*/}
                                <TableCell className="text-right">{currencyFormat.format(item.harga_beli)}</TableCell>
                                {/*@ts-ignore*/}
                                <TableCell className="text-right">{currencyFormat.format(item.harga_jual_satuan)}</TableCell>
                                {/*@ts-ignore*/}
                                <TableCell className="text-right">{currencyFormat.format(item.harga_jual_lusinan)}</TableCell>
                                {/*@ts-ignore*/}
                                <TableCell className="text-right">{currencyFormat.format(item.harga_jual_kartonan)}</TableCell>
                                <TableCell>
                                    <div className={"flex gap-3"}>
                                        <Button variant={"outline"} onClick={async () => {
                                            await router.replace(`/product/${item.id}`)
                                        }}>
                                            Edit
                                        </Button>
                                        <Button variant={"destructive"} onClick={async () => {
                                            await axios.delete(`/api/product/${item.id}`)

                                            window.location.reload()
                                        }}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}