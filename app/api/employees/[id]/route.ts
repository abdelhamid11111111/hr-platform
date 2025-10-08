import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveFile } from "@/lib/upload";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error DELETE" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const displayEmp = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        department: true,
      }
    });
    return NextResponse.json(displayEmp, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const salary = formData.get("salary") as string;
    const position = formData.get("position") as string;
    const DepartmentId = formData.get("departmentId") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const profilePic = formData.get("profilePic") as File | null;

    if (
      !name ||
      !salary ||
      !position ||
      !DepartmentId ||
      !email ||
      !phone ||
      !dateOfBirth
    ) {
      return NextResponse.json(
        { error: "Please fill in all required field" },
        { status: 400 }
      );
    }

    const currentEmp = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });


    let pathImage = currentEmp?.profilePic || '';
    if (profilePic && profilePic.size > 0) {
      pathImage = await saveFile(profilePic);
    }

    const editEmployee = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name.trim(),
        salary: Number(salary),
        position: position.trim(),
        email: email.trim(),
        phone: phone.trim(),
        profilePic: pathImage || null,
        dateOfBirth: dateOfBirth.trim(),
        department: {
          connect: { id: Number(DepartmentId) },
        },
      },
      include: {
        department: true,
      },
    });

    return NextResponse.json(editEmployee, { status: 201 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error POST" }, { status: 500 });
  }
}
