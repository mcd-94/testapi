import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Shift from "@/models/shift";

export async function GET() {
  try {
    await connectDB();
    const shifts = await Shift.find();
    return NextResponse.json(shifts);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
