"use client";
import { useState } from "react";
import { useDoctors } from "./useDoctors";
import DoctorTable from "./DoctorTable";
import DoctorFilters from "./DoctorFilters";
import DoctorSearchBar from "./DoctorSearchBar";
import DoctorCardList from "./DoctorCardList";
import CreateDoctorModal from "@/components/CreateDoctorModal/CreateDoctorModal";

export default function DoctorsCrud() {
  const {
    doctors,
    specialty,
    healthInsurances,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useDoctors();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialties, setFilterSpecialties] = useState([]);
  const [filterHealthInsurances, setFilterHealthInsurances] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoctorData, setEditingDoctorData] = useState(null);

  const filteredDoctors = doctors.filter((doctor) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      doctor.firstName.toLowerCase().includes(term) ||
      doctor.lastName.toLowerCase().includes(term) ||
      (doctor.licenseNumber?.toString() || "").includes(term);
    const matchesSpecialty =
      filterSpecialties.length === 0 ||
      doctor.specialty?.some((s) => filterSpecialties.includes(s._id));
    const matchesHealthInsurance =
      filterHealthInsurances.length === 0 ||
      doctor.healthInsurances?.some((h) =>
        filterHealthInsurances.includes(h._id),
      );
    return matchesSearch && matchesSpecialty && matchesHealthInsurance;
  });

  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center">
        <h1 className="text-2xl font-bold">Doctores</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar nuevo Doctor
        </button>
      </header>

      <DoctorSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="hidden md:block"
      />
      <DoctorFilters
        specialty={specialty}
        healthInsurances={healthInsurances}
        filterSpecialties={filterSpecialties}
        setFilterSpecialties={setFilterSpecialties}
        filterHealthInsurances={filterHealthInsurances}
        setFilterHealthInsurances={setFilterHealthInsurances}
      />

      {/* Vista desktop */}
      <DoctorTable
        doctors={filteredDoctors}
        onEdit={(doctor) => {
          setEditingDoctorData(doctor);
          setShowEditModal(true);
        }}
        onDelete={deleteDoctor}
      />

      {/* Vista mobile */}
      <DoctorCardList
        doctors={filteredDoctors}
        onEdit={(doctor) => {
          setEditingDoctorData(doctor);
          setShowEditModal(true);
        }}
        onDelete={deleteDoctor}
      />

      {showCreateModal && (
        <CreateDoctorModal
          newDoctor={{}}
          specialty={specialty}
          healthInsurances={healthInsurances}
          handleCreate={createDoctor}
          handleClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && editingDoctorData && (
        <CreateDoctorModal
          newDoctor={editingDoctorData}
          specialty={specialty}
          healthInsurances={healthInsurances}
          handleCreate={updateDoctor}
          handleClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
