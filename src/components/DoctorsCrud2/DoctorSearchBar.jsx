import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@/lib/icons";

export default function DoctorSearchBar({
  searchTerm,
  setSearchTerm,
  className,
}) {
  return (
    <div className={`relative ${className}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className="text-[1rem] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o matrícula"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block border p-2 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
