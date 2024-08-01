"use client"

import {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Logout() {
    let router = useRouter()

    useEffect(() => {
        const logout = async () => {
            await axios.post("/api/logout")

            window.location.href = "/"
        }

        logout()
    })

    return (<></>)
}