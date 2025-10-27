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
      licenseNumber,
      email,
      phone,
      specialty,
      healthInsurances,
      description,
      consultationFee,
      image,
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

    if (consultationFee === undefined || consultationFee === null) {
      return NextResponse.json(
        { message: "consultationFee es obligatorio" },
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
      phone: phone?.trim() || "",
      email: email?.trim() || "",
      specialty: specialtyIds,
      healthInsurances: healthIds,
      description: description || "",
      consultationFee: Number(consultationFee) || 0,
      image: image || "",
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
      licenseNumber,
      phone,
      email,
      specialty,
      healthInsurances,
      description,
      consultationFee,
      image,
    } = body;

    if (
      !id ||
      !firstName?.trim() ||
      !lastName?.trim() ||
      !consultationFee ||
      !licenseNumber
    ) {
      return NextResponse.json(
        {
          message:
            "ID, firstName, lastName, licenseNumber y consultationFee son obligatorios",
        },
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
        licenseNumber: licenseNumber,
        phone: phone?.trim() || "",
        email: email?.trim() || "",
        specialty: specialtyIds,
        healthInsurances: healthIds,
        description: description || "",
        consultationFee:
          consultationFee !== undefined ? Number(consultationFee) : 0,
        image: image || "",
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
