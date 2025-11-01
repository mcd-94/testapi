"use client";
import { useState } from "react";
import DoctorsCrud from "@/components/DoctorsCrud/DoctorsCrud";
import HealthInsurancesCrud from "@/components/HealthInsurancesCrud/HealthInsurancesCrud";
import SpecialtiesCrud from "@/components/SpecialtiesCrud/SpecialtiesCrud";
import AppointmentsCrud from "@/components/AppointmentsCrud/AppointmentsCrud";
import ReservationsCrud from "@/components/ReservationsCrud/ReservationsCrud";
import UsersCrud from "@/components/UsersCrud/UsersCrud";
import { useSelector, useDispatch } from "react-redux";
export default function AdminPage() {
  const adminMenu = [
    { name: "Doctores", component: DoctorsCrud },
    { name: "Obras Sociales", component: HealthInsurancesCrud },
    { name: "Especialidades", component: SpecialtiesCrud },
    { name: "Turnos", component: AppointmentsCrud },
    { name: "Reservas", component: ReservationsCrud },
    { name: "Usuarios", component: UsersCrud },
  ];

  const [selected, setSelected] = useState(adminMenu[0]);
  const userRole = useSelector((state) => state.userSession.user?.role);
  return (
    <div className="p-1 mt-[4em] relative bg-[#c0c0c0]">
      {userRole === "admin" ? (
        <div>
          <h2 className="border border-dashed text-center text-xl font-semibold mb-1">
            Panel de administración
          </h2>
          <nav>
            <ul className="grid grid-cols-[auto_auto_auto]">
              {adminMenu.map((e) => {
                const active = selected.name === e.name;
                return (
                  <li key={e.name}>
                    <button
                      onClick={() => setSelected(e)}
                      className={`
                    relative
                    w-[100%]
                    rounded-t-md
                    transition-all
                    border border-[#c0c0c0]
                    ${
                      active
                        ? "bg-white z-10 -mb-[2px] border border-blue-500 rounded-md"
                        : "bg-gray-100 hover:bg-gray-200 z-0"
                    }
                  `}
                    >
                      {e.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="rounded-b-md rounded-tr-md bg-white p-1 py-3">
            {selected && <selected.component />}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700">Access denied</div>
      )}
    </div>
  );
}
