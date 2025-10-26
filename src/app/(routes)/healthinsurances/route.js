import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HealthInsurance from "@/models/HealthInsurance";

// GET: obtener todas las obras sociales
export async function GET() {
  try {
    await connectDB();
    const healthInsurances = await HealthInsurance.find();
    return NextResponse.json(healthInsurances);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST: crear una nueva obra social
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data.name?.trim()) {
      return NextResponse.json(
        { message: "El nombre es obligatorio" },
        { status: 400 },
      );
    }

    const newHI = new HealthInsurance({
      name: data.name,
      description: data.description || "",
    });

    const savedHI = await newHI.save();
    return NextResponse.json(savedHI, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PATCH: actualizar obra social
export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data.id || !data.name?.trim()) {
      return NextResponse.json(
        { message: "ID y nombre son obligatorios" },
        { status: 400 },
      );
    }

    const updatedHI = await HealthInsurance.findByIdAndUpdate(
      data.id,
      { name: data.name, description: data.description || "" },
      { new: true },
    );

    if (!updatedHI)
      return NextResponse.json(
        { message: "Obra social no encontrada" },
        { status: 404 },
      );

    return NextResponse.json(updatedHI);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE: eliminar obra social
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );

    const deletedHI = await HealthInsurance.findByIdAndDelete(id);
    if (!deletedHI)
      return NextResponse.json(
        { message: "Obra social no encontrada" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Obra social eliminada correctamente",
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
