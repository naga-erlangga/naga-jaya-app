import Link from "next/link";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {cookies} from "next/headers";


const LogoutButton = () => {
    // console.log(cookies().getAll())
    if (cookies().has("auth")){
        return (<Link href={"/logout"}><Button variant={"destructive"}>Logout</Button></Link>)
    }

    return (<></>)
}

export default function Header() {
    return (<div className={"flex justify-between p-3"}>
        <div className={"flex gap-5"}>
            {
                ["Dashboard", "Product", "Admin"].map((value, index) => (
                    <Link href={`/${value.toLowerCase()}`} key={index}>
                        <Button variant={'link'}> {value} </Button>
                    </Link>))
            }
        </div>
        <div>
            <LogoutButton/>
        </div>
    </div>)
}