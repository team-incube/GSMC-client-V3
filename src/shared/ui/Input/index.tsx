interface InputProps {
  label: string;
}

export default function Input({
  label,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="body-4 text-main-700" htmlFor={label}>
        {label}
      </label>
      <input className="rounded-2xl border border-gray-500 p-4" {...props} id={label} type="text" />
    </div>
  );
}
