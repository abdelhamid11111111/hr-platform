import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try{
        const {id} = await params
        await prisma.department.delete({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json({status: 200})
    } catch(error){
        console.error('can not delete department', error);
        return NextResponse.json({error: 'server error DELETE'}, {status: 500})
    }
}

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try{
        const { id } = await params
        const department = await prisma.department.findUnique({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json(department, {status: 200})
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error GET'}, {status: 500})
    }
}

export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try{
        const {id} = await params
        const form = await req.json()
        if(!form || !form.name || !form.location){
            return NextResponse.json({error: 'Please fill in all required field'}, {status: 400})
        }

        // const dptExist = await prisma.department.findFirst({
        //     where: {
        //         name: form.name
        //     }
        // })
        // if(dptExist){
        //     return NextResponse.json({error: 'This already exists'}, {status: 400})
        // }

        const updateDepartment = await prisma.department.update({
            where: {
                id: Number(id)
            },
            data: {
                name: form.name,
                location: form.location
            }
        })
        return NextResponse.json(updateDepartment, {status: 200})
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error PUT'}, {status: 500})
    }
}