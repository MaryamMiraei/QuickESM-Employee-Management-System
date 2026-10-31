import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, id, ...props }: InputProps) => {
  return (
    <div className="flex w-full flex-col">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className=" px-2 py-1 border-2 border-slate-500/10 rounded-md focus-within:ring-1 focus-within:ring-indigo-500/50 outline-none font-medium text-[12px] "
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
