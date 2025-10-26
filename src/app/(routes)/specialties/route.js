// app/(routes)/specialties/route.js
import { NextResponse } from "next/server";
import Specialty from "@/models/specialty";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const specialties = await Specialty.find();
    return NextResponse.json(JSON.parse(JSON.stringify(specialties)));
  } catch (err) {
    console.error("❌ Error en GET /specialties:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data?.name?.trim()) {
      return NextResponse.json(
        { message: "Nombre obligatorio" },
        { status: 400 },
      );
    }

    const name = data.name.trim();
    const description = data.description?.trim() || "";

    const exists = await Specialty.findOne({ name });
    if (exists) {
      return NextResponse.json(
        { message: "Ya existe esa especialidad" },
        { status: 400 },
      );
    }

    const specialty = new Specialty({ name, description });
    const saved = await specialty.save();

    return NextResponse.json(JSON.parse(JSON.stringify(saved)), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ Error creando especialidad:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();
    const id = data._id || data.id;

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const updated = await Specialty.findByIdAndUpdate(
      id,
      { name: data.name?.trim(), description: data.description?.trim() || "" },
      { new: true, runValidators: true },
    );

    if (!updated)
      return NextResponse.json(
        { message: "Especialidad no encontrada" },
        { status: 404 },
      );

    return NextResponse.json(JSON.parse(JSON.stringify(updated)));
  } catch (err) {
    console.error("❌ Error en PATCH /specialties:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const deleted = await Specialty.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Especialidad no encontrada" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Especialidad eliminada correctamente",
    });
  } catch (err) {
    console.error("❌ Error en DELETE /specialties:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
