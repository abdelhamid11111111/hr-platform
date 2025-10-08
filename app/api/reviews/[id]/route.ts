import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.review.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("can not delete review", error);
    return NextResponse.json({ error: "server error DELETE" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await prisma.review.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        employee: true,
      },
    });
    return NextResponse.json(review, { status: 200 });
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
    const form = await req.json();
    if (!form.rating || !form.notes || !form.employeeId) {
      return NextResponse.json(
        { error: "Please fill in all required field" },
        { status: 400 }
      );
    }

    const updateReview = await prisma.review.update({
      where: {
        id: Number(id),
      },
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
    return NextResponse.json(updateReview, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error PUT" }, { status: 500 });
  }
}
