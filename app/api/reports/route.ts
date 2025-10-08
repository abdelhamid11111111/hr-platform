import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: Request) {
  try {
    const displayEmpData = await prisma.employee.findMany({
      include: {
        department: true,
        review: true
      }
    });
    return NextResponse.json(displayEmpData, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}