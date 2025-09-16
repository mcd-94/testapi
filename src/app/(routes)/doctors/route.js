import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/doctor";

export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find();
    return NextResponse.json(doctors);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}