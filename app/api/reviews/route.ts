import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const form = await req.json();
    if (!form.rating || !form.notes || !form.employeeId) {
      return NextResponse.json(
        { error: "Please fill in all required field" },
        { status: 400 }
      );
    }

    const ExistEmp = await prisma.review.findUnique({
      where: {
        employeeId: Number(form.employeeId)
      }
    })
    if(ExistEmp){
      return NextResponse.json({ error: "This employee already has review" }, { status: 400 });
    }

    const createReview = await prisma.review.create({
      data: {
        rating: form.rating,
        notes: form.notes,
        employee: {
          connect: {
            id: Number(form.employeeId),
          },
        },
      },
      include: {
        employee: true,
      },
    });
    
    return NextResponse.json(createReview, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error POST" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        employee: true
      }
    });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}
