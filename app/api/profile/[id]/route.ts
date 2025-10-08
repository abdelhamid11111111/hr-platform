import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


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
        review: true
      }
    });
    return NextResponse.json(displayEmp, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}