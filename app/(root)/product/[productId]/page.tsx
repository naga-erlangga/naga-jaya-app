"use client"

// components/ProductForm.tsx
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";


// Define the type for the form values
interface IFormInput {
    name: string;
    harga_beli: number;
    harga_jual_satuan: number;
    harga_jual_lusinan: number;
    harga_jual_kartonan: number;
}

interface ProductFormProps {
    initialData: IFormInput;
}

// @ts-ignore
const UpdateProductForm: React.FC = ({params}) => {
    let router = useRouter()

    const [initialData, setInitialData] = useState({})

    // Initialize the useForm hook
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
        defaultValues: initialData,
    });

    let {productId} = params

    useEffect(() => {
        const fetch =  async () => {
            let response = await axios.get(`/api/product/${productId}`)
            let product = response.data

            setInitialData(product)

            // Set form values when initialData changes
            Object.keys(product).forEach(key => {
                setValue(key as keyof IFormInput, product[key as keyof IFormInput]);
            });
        }

        fetch()


    }, []);

    // Define the onSubmit function
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        let response = await axios.patch(`/api/product/${productId}`, data)
        let output = response.data

        toast.success("Update Success")
        router.replace("/admin")
    };

    return (
        <div className={'p-5'}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Product</Label>
                    <Input
                        id="name"
                        type="text"
                        {...register('name', {required: 'Name is required'})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="harga_beli" className="block text-sm font-medium text-gray-700">Harga Beli</Label>
                    <Input
                        id="harga_beli"
                        type="number"
                        {...register('harga_beli', {required: 'Harga Beli is required'})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.harga_beli && <p className="text-red-500 text-sm">{errors.harga_beli.message}</p>}
                </div>

                <div>
                    <Label htmlFor="harga_jual_satuan" className="block text-sm font-medium text-gray-700">Harga Jual
                        Satuan</Label>
                    <Input
                        id="harga_jual_satuan"
                        type="number"
                        {...register('harga_jual_satuan', {required: 'Harga Jual Satuan is required'})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.harga_jual_satuan &&
                        <p className="text-red-500 text-sm">{errors.harga_jual_satuan.message}</p>}
                </div>

                <div>
                    <Label htmlFor="harga_jual_lusinan" className="block text-sm font-medium text-gray-700">Harga Jual
                        Lusinan</Label>
                    <Input
                        id="harga_jual_lusinan"
                        type="number"
                        {...register('harga_jual_lusinan', {required: 'Harga Jual Lusinan is required'})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.harga_jual_lusinan &&
                        <p className="text-red-500 text-sm">{errors.harga_jual_lusinan.message}</p>}
                </div>

                <div>
                    <Label htmlFor="harga_jual_kartonan" className="block text-sm font-medium text-gray-700">Harga Jual
                        Kartonan</Label>
                    <Input
                        id="harga_jual_kartonan"
                        type="number"
                        {...register('harga_jual_kartonan', {required: 'Harga Jual Kartonan is required'})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.harga_jual_kartonan &&
                        <p className="text-red-500 text-sm">{errors.harga_jual_kartonan.message}</p>}
                </div>

                <Button
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default UpdateProductForm;
