"use client";
import { useState } from "react";
import DoctorsCrud from "@/components/DoctorsCrud/DoctorsCrud";
import HealthInsurancesCrud from "@/components/HealthInsurancesCrud/HealthInsurancesCrud";
import SpecialtiesCrud from "@/components/SpecialtiesCrud/SpecialtiesCrud";
import { useSelector, useDispatch } from "react-redux";
export default function AdminPage() {
  const adminMenu = [
    { name: "Doctores", component: DoctorsCrud },
    { name: "Obras Sociales", component: HealthInsurancesCrud },
    { name: "Especialidades", component: SpecialtiesCrud },
  ];

  const [selected, setSelected] = useState(adminMenu[0]);
  const userRole = useSelector((state) => state.userSession.user?.role);
  return (
    <div className="p-6 mt-[5em] relative bg-[#c0c0c0]">
      {userRole === "admin" ? (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Admin Dashboard</h2>
          <nav>
            <ul className="flex flex-row items-end">
              {adminMenu.map((e) => {
                const active = selected.name === e.name;
                return (
                  <li key={e.name}>
                    <button
                      onClick={() => setSelected(e)}
                      className={`
                    relative
                    px-4 py-2
                    rounded-t-md
                    transition-all
                    border border-[#c0c0c0]
                    ${
                      active
                        ? "bg-white z-10 -mb-[2px] border-[0]"
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

          <div className="rounded-b-md rounded-tr-md bg-white p-4">
            {selected && <selected.component />}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700">Access denied</div>
      )}
    </div>
  );
}
