// app/(routes)/reservations/route/js
import { NextResponse } from "next/server";
import Reservation from "@/models/reservation";
import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import Specialty from "@/models/specialty";
import HealthInsurance from "@/models/healthInsurance";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find()
      .populate("appointment")
      .populate("doctor")
      .populate("specialty")
      .populate("healthInsurance");

    return NextResponse.json(JSON.parse(JSON.stringify(reservations)));
  } catch (err) {
    console.error("❌ Error en GET /reservations:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      dni,
      patientName,
      appointment,
      doctor,
      specialty,
      healthInsurance,
    } = data;

    // ==============================
    // 1️⃣ Validar campos requeridos
    // ==============================
    const required = {
      dni,
      patientName,
      appointment,
      doctor,
      specialty,
      healthInsurance,
    };
    for (const [key, val] of Object.entries(required)) {
      if (!val)
        return NextResponse.json(
          { message: `Campo obligatorio: ${key}` },
          { status: 400 },
        );
    }

    // ==============================
    // 2️⃣ Buscar documentos relacionados
    // ==============================
    const [appointmentDoc, doctorDoc, specialtyDoc, insuranceDoc] =
      await Promise.all([
        Appointment.findById(appointment),
        Doctor.findById(doctor),
        Specialty.findById(specialty),
        HealthInsurance.findById(healthInsurance),
      ]);

    if (!appointmentDoc)
      return NextResponse.json(
        { message: "Turno no encontrado" },
        { status: 404 },
      );
    if (!doctorDoc)
      return NextResponse.json(
        { message: "Médico no encontrado" },
        { status: 404 },
      );
    if (!specialtyDoc)
      return NextResponse.json(
        { message: "Especialidad no encontrada" },
        { status: 404 },
      );
    if (!insuranceDoc)
      return NextResponse.json(
        { message: "Obra social no encontrada" },
        { status: 404 },
      );

    if (!appointmentDoc.available)
      return NextResponse.json(
        { message: "Turno no disponible" },
        { status: 400 },
      );

    // ==============================
    // 3️⃣ Calcular valor total
    // ==============================
    const discount = insuranceDoc.discount || 0;
    const totalAmount = doctorDoc.consultationFee * (1 - discount / 100);

    // ==============================
    // 4️⃣ Crear reserva
    // ==============================
    const reservation = new Reservation({
      dni,
      patientName: patientName.trim(),
      appointment,
      specialty,
      healthInsurance,
      doctor,
      totalAmount,
    });

    const saved = await reservation.save();

    // Marcar turno como ocupado
    appointmentDoc.available = false;
    await appointmentDoc.save();

    // ==============================
    // 5️⃣ Generar respuesta amigable
    // ==============================
    const response = {
      message: "✅ Reserva creada correctamente",
      patient: {
        name: saved.patientName,
        dni: saved.dni,
      },
      doctor: {
        name: doctorDoc.name,
        lastName: doctorDoc.lastName,
      },
      specialty: specialtyDoc.name,
      healthInsurance: insuranceDoc.name,
      totalAmount,
      appointment: appointmentDoc.dateTime,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (err) {
    console.error("❌ Error en POST /reservations:", err);
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

    const updated = await Reservation.findByIdAndUpdate(
      id,
      {
        dni: data.dni,
        patientName: data.patientName?.trim(),
        totalAmount: data.totalAmount,
      },
      { new: true, runValidators: true },
    );

    if (!updated)
      return NextResponse.json(
        { message: "Reserva no encontrada" },
        { status: 404 },
      );

    return NextResponse.json(JSON.parse(JSON.stringify(updated)));
  } catch (err) {
    console.error("❌ Error en PATCH /reservations:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json({ message: "ID obligatorio" }, { status: 400 });

    const deleted = await Reservation.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Reserva no encontrada" },
        { status: 404 },
      );

    // liberar el turno nuevamente
    await Appointment.findByIdAndUpdate(deleted.appointment, {
      available: true,
    });

    return NextResponse.json({ message: "Reserva eliminada correctamente" });
  } catch (err) {
    console.error("❌ Error en DELETE /reservations:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
