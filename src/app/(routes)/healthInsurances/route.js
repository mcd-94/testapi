import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HealthInsurance from "@/models/healthInsurance";

export async function GET() {
  try {
    await connectDB();
    const healthInsurances = await HealthInsurance.find();
    return NextResponse.json(healthInsurances);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
