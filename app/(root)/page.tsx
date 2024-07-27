"use client"

import * as React from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import axios from "axios";
import {useRouter} from "next/navigation";

interface IFormInput {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)

    try{
      // @ts-ignore
      let response = await axios.post("/api/login", data)

      if (response.status === 200) {
        router.replace("/dashboard")
      }
    }
    catch(e){
      console.error(e)
      // window.location.reload()
    }
  };

  return (
      <div className="flex justify-center items-center w-full h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to Naga Jaya App</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                      id="username"
                      placeholder="Username"
                      {...register("username", { required: "Username is required" })}
                  />
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
