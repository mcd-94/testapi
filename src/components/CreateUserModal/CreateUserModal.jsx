"use client";

export default function CreateUserModal({
  newUser = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    healthInsurances: [],
    image: "",
  },
  healthInsurances = [],
  handleChange,
  handleCreate,
  handleClose,
}) {
  return (
    <div className="fixed inset-0 z-[3000] flex justify-center bg-black/50 backdrop-blur-sm p-1">
      <div className="w-full flex justify-center p-5">
        <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl p-6 sm:p-8 overflow-auto max-h-[90vh] animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Agregar nuevo Usuario
          </h2>

          <div className="space-y-3">
            {/* Nombre */}
            <input
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            {/* Apellido */}
            <input
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            {/* Email */}
            <input
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            {/* Teléfono */}
            <input
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

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
                      checked={newUser.healthInsurances.includes(hi._id)}
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
                    const file = e.target.files?.[0];
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

              {newUser.image && (
                <img
                  src={newUser.image}
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
