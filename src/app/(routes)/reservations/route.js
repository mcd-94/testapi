import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reservation from "@/models/Reservation";

// GET: obtener todas las reservas
export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find()
      .populate("turn")
      .populate("specialty")
      .populate("healthInsurance");
    return NextResponse.json(reservations);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST: crear una nueva reserva
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { document, fullName, turn, specialty, healthInsurance, totalFee } =
      data;

    if (
      !document?.trim() ||
      !fullName?.trim() ||
      !turn ||
      !specialty ||
      !healthInsurance ||
      totalFee === undefined
    ) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    const newReservation = new Reservation({
      document,
      fullName,
      turn,
      specialty,
      healthInsurance,
      totalFee,
    });

    const savedReservation = await newReservation.save();
    return NextResponse.json(savedReservation, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PATCH: actualizar reserva
export async function PATCH(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (
      !data.id ||
      !data.document ||
      !data.fullName ||
      !data.turn ||
      !data.specialty ||
      !data.healthInsurance ||
      data.totalFee === undefined
    ) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      data.id,
      {
        document: data.document,
        fullName: data.fullName,
        turn: data.turn,
        specialty: data.specialty,
        healthInsurance: data.healthInsurance,
        totalFee: data.totalFee,
      },
      { new: true },
    );

    if (!updatedReservation)
      return NextResponse.json(
        { message: "Reserva no encontrada" },
        { status: 404 },
      );

    return NextResponse.json(updatedReservation);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE: eliminar reserva
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { message: "ID es obligatorio" },
        { status: 400 },
      );

    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation)
      return NextResponse.json(
        { message: "Reserva no encontrada" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Reserva eliminada correctamente" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
