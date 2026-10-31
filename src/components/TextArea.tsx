import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = ({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={`
          w-full resize-y rounded-lg border border-slate-300
          bg-white px-4 py-3 outline-none
          focus:border-indigo-500
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Textarea;
