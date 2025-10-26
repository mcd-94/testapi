// /routes/doctors/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Doctor from "@/models/doctor";
import Specialty from "@/models/specialty";
import HealthInsurance from "@/models/HealthInsurance";

export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find()
      .populate("specialty", "name")
      .populate("healthInsurances", "name");
    return NextResponse.json(doctors);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      firstName,
      lastName,
      specialty,
      healthInsurances,
      email,
      phone,
      licenseNumber,
      description,
      consultationFee,
      photo,
    } = body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { message: "firstName y lastName son obligatorios" },
        { status: 400 },
      );
    }

    if (licenseNumber === undefined || licenseNumber === null) {
      return NextResponse.json(
        { message: "licenseNumber es obligatorio" },
        { status: 400 },
      );
    }

    // Validar y filtrar IDs de Specialty
    let specialtyIds = [];
    if (Array.isArray(specialty)) {
      specialtyIds = specialty
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    // Validar y filtrar IDs de HealthInsurance
    let healthIds = [];
    if (Array.isArray(healthInsurances)) {
      healthIds = healthInsurances
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    const newDoctor = new Doctor({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      licenseNumber: Number(licenseNumber),
      description: description || "",
      email: email?.trim() || "",
      phone: phone?.trim() || "",
      consultationFee: Number(consultationFee) || 0,
      photo: photo || "",
      specialty: specialtyIds,
      healthInsurances: healthIds,
    });

    const savedDoctor = await newDoctor.save();

    // Populate correctamente
    const populatedDoctor = await Doctor.findById(savedDoctor._id)
      .populate("specialty", "name")
      .populate("healthInsurances", "name");

    return NextResponse.json(populatedDoctor, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      id,
      firstName,
      lastName,
      specialty,
      healthInsurances,
      email,
      phone,
      licenseNumber,
      description,
      consultationFee,
      photo,
    } = body;

    if (!id || !firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { message: "ID, firstName y lastName son obligatorios" },
        { status: 400 },
      );
    }

    // Validar IDs de Specialty
    let specialtyIds = [];
    if (Array.isArray(specialty)) {
      specialtyIds = specialty
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    // Validar IDs de HealthInsurance
    let healthIds = [];
    if (Array.isArray(healthInsurances)) {
      healthIds = healthInsurances
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        licenseNumber:
          licenseNumber !== undefined ? Number(licenseNumber) : undefined,
        description: description || "",
        email: email?.trim() || "",
        phone: phone?.trim() || "",
        consultationFee:
          consultationFee !== undefined ? Number(consultationFee) : 0,
        photo: photo || "",
        specialty: specialtyIds,
        healthInsurances: healthIds,
      },
      { new: true, runValidators: true },
    )
      .populate("specialty", "name")
      .populate("healthInsurances", "name");

    if (!updatedDoctor) {
      return NextResponse.json(
        { message: "Doctor no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedDoctor);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return NextResponse.json(
        { message: "Doctor no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Doctor eliminado correctamente" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
