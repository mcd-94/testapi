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
    <div className="fixed inset-0 z-[3000] flex justify-center bg-black/50 backdrop-blur-sm p-15">
      <div className="w-full flex justify-center p-5">
        <div className="bg-white rounded-md shadow-2xl w-[100%] sm:p-8 overflow-auto max-h-[90vh] animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Agregar nuevo Doctor
          </h2>

          <div className="space-y-3">
            <input
              name="firstName"
              value={newDoctor.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              name="lastName"
              value={newDoctor.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              name="licenseNumber"
              value={newDoctor.licenseNumber}
              onChange={handleChange}
              placeholder="Número de matrícula"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              name="email"
              value={newDoctor.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              name="phone"
              value={newDoctor.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              name="consultationFee"
              value={newDoctor.consultationFee}
              onChange={handleChange}
              placeholder="Precio por consulta"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <textarea
              name="description"
              value={newDoctor.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={3}
            />

            {/* Especialidades */}
            <div>
              <h3 className="text-gray-700 font-medium mb-2">Especialidades</h3>
              <div className="grid grid-cols-2 gap-2">
                {specialty.map((s) => (
                  <label
                    key={s._id}
                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="specialty"
                      value={s._id}
                      checked={newDoctor.specialty.includes(s._id)}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{s.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Obras Sociales */}
            <div>
              <h3 className="text-gray-700 font-medium mb-2">Obras Sociales</h3>
              <div className="grid grid-cols-2 gap-2">
                {healthInsurances.map((hi) => (
                  <label
                    key={hi._id}
                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="healthInsurances"
                      value={hi._id}
                      checked={newDoctor.healthInsurances.includes(hi._id)}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{hi.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Imagen */}
            <div>
              <label className="block w-full cursor-pointer">
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Subir imagen
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleChange({
                        target: {
                          name: "image",
                          value: reader.result,
                          type: "text",
                        },
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>
              {newDoctor.image && (
                <img
                  src={newDoctor.image}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg mt-3 shadow-md border"
                />
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
