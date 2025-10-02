import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: Request){
    try{
        const form = await req.json()
        if(!form || !form.name || !form.location){
            return NextResponse.json({error: 'Please fill in all required field'}, {status: 400})
        }

        const dptExist = await prisma.department.findFirst({
            where: {
                name: form.name
            }
        })
        if(dptExist){
            return NextResponse.json({error: 'This already exists'}, {status: 400})
        }

        const createDepartment = await prisma.department.create({
            data: {
                name: form.name,
                location: form.location
            }
        })
        return NextResponse.json(createDepartment, {status: 200})
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error POST'}, {status: 500})
    }
}

export async function GET(){
    try{
        const department = await prisma.department.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return NextResponse.json(department, {status: 200})
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error GET'}, {status: 500})
    }
}