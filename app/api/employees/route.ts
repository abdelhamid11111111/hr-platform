import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveFile } from "@/lib/upload";


export async function POST(req: Request){
    try{
    const formData = await req.formData()
    const name = formData.get('name') as string
    const salary = formData.get('salary') as string
    const position = formData.get('position') as string
    const DepartmentId = formData.get('DepartmentId') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const profilePic = formData.get('profilePic') as File | null

    if(!name || !salary || !position || !DepartmentId || !email || !phone || !dateOfBirth ){
        return NextResponse.json({error: 'Please fill in all required field'}, {status: 400})
    }

    const existingEmp = await prisma.employee.findFirst({
        where: {
            name: name
        }
    })
    if(existingEmp){
        return NextResponse.json({error: 'This employee already exist'}, {status: 400})
    }

    let pathImage = ''
    if(profilePic && profilePic.size > 0){
        pathImage = await saveFile(profilePic)
    }

    const createEmployee = await prisma.employee.create({
        data: {
            name: name.trim(),
            salary: Number(salary),
            position: position.trim(),
            email: email.trim(),
            phone: phone.trim(),
            profilePic: pathImage || null,
            dateOfBirth: dateOfBirth.trim(),
            department: {
                connect: {id: Number(DepartmentId)}
            }
        },
        include: {
            department: true
        }
    })

    return NextResponse.json(createEmployee, {status: 201})
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error POST'}, {status: 500})
    }
}