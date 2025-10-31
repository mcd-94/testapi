export default function DoctorFilters({
  specialty,
  healthInsurances,
  filterSpecialties,
  setFilterSpecialties,
  filterHealthInsurances,
  setFilterHealthInsurances,
}) {
  function toggleFilter(value, setter) {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value],
    );
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-center">
      <FilterGroup
        title="Filtrar por especialidad"
        items={specialty}
        selected={filterSpecialties}
        toggle={(val) => toggleFilter(val, setFilterSpecialties)}
      />
      <FilterGroup
        title="Filtrar por obra social"
        items={healthInsurances}
        selected={filterHealthInsurances}
        toggle={(val) => toggleFilter(val, setFilterHealthInsurances)}
      />
    </div>
  );
}

function FilterGroup({ title, items, selected, toggle }) {
  return (
    <div className="border border-[#c0c0c0] rounded-md p-1">
      <h3 className="mb-1">{title}:</h3>
      <div className="grid grid-cols-[auto_auto_auto] gap-1 md:grid-cols-5">
        {items.map((item) => (
          <label key={item._id} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={item._id}
              checked={selected.includes(item._id)}
              onChange={() => toggle(item._id)}
            />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  );
}
