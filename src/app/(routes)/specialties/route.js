import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Specialty from "@/models/specialty";

export async function GET() {
  try {
    await connectDB();
    const specialties = await Specialty.find();
    return NextResponse.json(specialties);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
