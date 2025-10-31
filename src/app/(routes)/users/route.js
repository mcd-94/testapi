// /routes/users/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import HealthInsurance from "@/models/healthInsurance";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().populate("healthInsurances", "name");
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { firstName, lastName, email, phone, healthInsurances, image } = body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { message: "firstName y lastName son obligatorios" },
        { status: 400 },
      );
    }

    // Validar y filtrar IDs de HealthInsurance
    const healthIds = Array.isArray(healthInsurances)
      ? healthInsurances
          .filter((id) => mongoose.Types.ObjectId.isValid(id))
          .map((id) => new mongoose.Types.ObjectId(id))
      : [];

    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone?.trim() || "",
      email: email?.trim() || "",
      healthInsurances: healthIds,
      image: image || "",
    });

    const savedUser = await newUser.save();

    // Populate correctamente
    const populatedUser = await User.findById(savedUser._id).populate(
      "healthInsurances",
      "name",
    );

    return NextResponse.json(populatedUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, firstName, lastName, phone, email, healthInsurances, image } =
      body;

    if (!id?.trim() || !firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { message: "ID, firstName y lastName son obligatorios" },
        { status: 400 },
      );
    }

    // Validar IDs de HealthInsurance
    const healthIds = Array.isArray(healthInsurances)
      ? healthInsurances
          .filter((id) => mongoose.Types.ObjectId.isValid(id))
          .map((id) => new mongoose.Types.ObjectId(id))
      : [];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone?.trim() || "",
        email: email?.trim() || "",
        healthInsurances: healthIds,
        image: image || "",
      },
      { new: true, runValidators: true },
    ).populate("healthInsurances", "name");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id?.trim()) {
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
