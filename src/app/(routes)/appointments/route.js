import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/appointment";

export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find();
    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
