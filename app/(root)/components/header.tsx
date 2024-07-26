import Link from "next/link";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function Header() {
    return (<div className={"flex gap-5 "}>
        {
            ["Dashboard", "Product", "Admin"].map((value, index) => (<Link href={`/${value.toLowerCase()}`} key={index}>
                <Button variant={'link'}> {value} </Button>
            </Link>))
        }
    </div>)
}