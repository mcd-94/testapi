// /(routes)/turns/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Turn from "@/models/turn";

// GET: obtener todos los turnos
export async function GET() {
  try {
    await connectDB();
    const turns = await Turn.find();
    return NextResponse.json(turns);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST: crear un nuevo turno
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.doctor?.trim() || !data.dateTime) {
      return NextResponse.json(
        { message: "Doctor y fecha/hora son obligatorios" },
        { status: 400 },
      );
    }

    const turn = new Turn({
      doctor: data.doctor,
      dateTime: data.dateTime,
      available: data.available !== undefined ? data.available : true,
    });

    const savedTurn = await turn.save();
    return NextResponse.json(savedTurn, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PATCH: actualizar turno
export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );
    }

    const updatedTurn = await Turn.findByIdAndUpdate(
      data.id,
      {
        doctor: data.doctor || undefined,
        dateTime: data.dateTime || undefined,
        available: data.available !== undefined ? data.available : undefined,
      },
      { new: true },
    );

    if (!updatedTurn) {
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedTurn);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE: eliminar turno
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );

    const deletedTurn = await Turn.findByIdAndDelete(id);

    if (!deletedTurn) {
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Turno eliminado correctamente" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
