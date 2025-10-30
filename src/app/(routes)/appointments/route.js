// app/(routes)/appointments/route.js
import { NextResponse } from "next/server";
import Appointment from "@/models/appointment";
import { connectDB } from "@/lib/mongodb";

// ======================================
// GET — Listar todos los turnos
// ======================================
export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find().populate("doctor");
    return NextResponse.json(JSON.parse(JSON.stringify(appointments)));
  } catch (err) {
    console.error("❌ Error en GET /appointments:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ======================================
// POST — Crear un nuevo turno
// ======================================
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const { doctor, dateTime, durationMinutes, available } = data;

    if (!doctor || !dateTime)
      return NextResponse.json(
        { message: "Doctor y fecha/hora son obligatorios" },
        { status: 400 },
      );

    // Validar que no exista otro turno del mismo médico a la misma hora
    const exists = await Appointment.findOne({ doctor, dateTime });
    if (exists)
      return NextResponse.json(
        { message: "Ya existe un turno en ese horario para este médico" },
        { status: 400 },
      );

    const appointment = new Appointment({
      doctor,
      dateTime: new Date(dateTime),
      durationMinutes: durationMinutes || 30,
      available: available !== undefined ? available : true,
    });

    const saved = await appointment.save();
    return NextResponse.json(JSON.parse(JSON.stringify(saved)), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ Error creando turno:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ======================================
// PATCH — Actualizar turno existente
// ======================================
export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();
    const id = data._id || data.id;

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        doctor: data.doctor,
        dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
        durationMinutes: data.durationMinutes,
        available: data.available,
      },
      { new: true, runValidators: true },
    ).populate("doctor");

    if (!updated)
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );

    return NextResponse.json(JSON.parse(JSON.stringify(updated)));
  } catch (err) {
    console.error("❌ Error en PATCH /appointments:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ======================================
// DELETE — Eliminar turno
// ======================================
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Turno eliminado correctamente",
    });
  } catch (err) {
    console.error("❌ Error en DELETE /appointments:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
