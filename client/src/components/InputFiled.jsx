export default function InputField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-xl text-sm outline-none
          bg-(--neo-bg)
          shadow-[inset_6px_6px_12px_var(--neo-dark),inset_-6px_-6px_12px_var(--neo-light)]
          focus:shadow-[inset_4px_4px_8px_var(--neo-dark),inset_-4px_-4px_8px_var(--neo-light)]
          placeholder-gray-400 transition
        "
        required
      />
    </div>
  );
}
