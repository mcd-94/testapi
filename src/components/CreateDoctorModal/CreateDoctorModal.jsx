"use client";

export default function CreateDoctorModal({
  newDoctor,
  specialty,
  healthInsurances,
  handleChange,
  handleCreate,
  handleClose,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">Agregar nuevo Doctor</h2>

        <input
          name="firstName"
          value={newDoctor.firstName}
          onChange={handleChange}
          placeholder="Nombre"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="lastName"
          value={newDoctor.lastName}
          onChange={handleChange}
          placeholder="Apellido"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="licenseNumber"
          value={newDoctor.licenseNumber}
          onChange={handleChange}
          placeholder="Número de matrícula"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="email"
          value={newDoctor.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="phone"
          value={newDoctor.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="consultationFee"
          value={newDoctor.consultationFee}
          onChange={handleChange}
          placeholder="Precio por consulta"
          className="block w-full mb-2 p-2 border rounded"
        />

        <textarea
          name="description"
          value={newDoctor.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="block w-full mb-2 p-2 border rounded"
        />

        <div className="mb-2">
          <strong>Especialidades:</strong>
          {specialty.map((s) => (
            <label key={s._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="specialty"
                value={s._id}
                checked={newDoctor.specialty.includes(s._id)}
                onChange={handleChange}
              />
              {s.name}
            </label>
          ))}
        </div>

        <div className="mb-2">
          <strong>Obras Sociales:</strong>
          {healthInsurances.map((hi) => (
            <label key={hi._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="healthInsurances"
                value={hi._id}
                checked={newDoctor.healthInsurances.includes(hi._id)}
                onChange={handleChange}
              />
              {hi.name}
            </label>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () => {
              // Actualiza el campo 'image' en el objeto del doctor
              handleChange({
                target: { name: "image", value: reader.result, type: "text" },
              });
            };
            reader.readAsDataURL(file);
          }}
          className="block w-full mb-2 p-2 border rounded"
        />
        {/* Optional image preview */}
        {newDoctor.image && (
          <img
            src={newDoctor.image}
            alt="Vista previa"
            className="w-32 h-32 object-cover rounded mb-2"
          />
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
