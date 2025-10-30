// app/(routes)/turns/route.js
import { NextResponse } from "next/server";
import Turn from "@/models/turn";
import Doctor from "@/models/doctor";
import { connectDB } from "@/lib/mongodb";

// GET: lista todos los turnos
export async function GET() {
  try {
    await connectDB();
    const turns = await Turn.find().populate("doctor");
    return NextResponse.json(JSON.parse(JSON.stringify(turns)));
  } catch (err) {
    console.error("❌ Error en GET /turns:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST: crea un nuevo turno
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const { doctor, date, available } = data;

    if (!doctor || !date) {
      return NextResponse.json(
        { message: "El médico y la fecha son obligatorios." },
        { status: 400 },
      );
    }

    // Validar que el médico exista
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return NextResponse.json(
        { message: "El médico no existe." },
        { status: 404 },
      );
    }

    // Verificar si ya existe un turno para ese médico en la misma fecha/hora
    const existing = await Turn.findOne({ doctor, date });
    if (existing) {
      return NextResponse.json(
        { message: "Ya existe un turno para ese médico en esa fecha y hora." },
        { status: 400 },
      );
    }

    const turn = new Turn({
      doctor,
      date: new Date(date),
      available: available ?? true,
    });

    const saved = await turn.save();

    return NextResponse.json(JSON.parse(JSON.stringify(saved)), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ Error creando turno:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PATCH: actualiza un turno
export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();
    const id = data._id || data.id;

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const updated = await Turn.findByIdAndUpdate(
      id,
      {
        doctor: data.doctor,
        date: data.date ? new Date(data.date) : undefined,
        available:
          typeof data.available === "boolean" ? data.available : undefined,
      },
      { new: true, runValidators: true },
    );

    if (!updated)
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );

    return NextResponse.json(JSON.parse(JSON.stringify(updated)));
  } catch (err) {
    console.error("❌ Error en PATCH /turns:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE: elimina un turno
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const deleted = await Turn.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Turno eliminado correctamente",
    });
  } catch (err) {
    console.error("❌ Error en DELETE /turns:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
