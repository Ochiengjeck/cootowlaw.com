import type { ComponentPropsWithoutRef } from "react";

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal shadow-sm transition-colors placeholder:text-slate/50 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20";
const labelClass = "block text-sm font-medium text-charcoal";
const helpClass = "mt-1.5 text-xs text-slate";

type FieldProps = { label: string; name: string; help?: string };

export function TextField({
  label,
  name,
  help,
  className,
  ...props
}: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input id={name} name={name} className={`${inputClass} ${className ?? ""}`} {...props} />
      {help && <p className={helpClass}>{help}</p>}
    </div>
  );
}

export function NumberField({ label, name, help, className, ...props }: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        className={`${inputClass} ${className ?? ""}`}
        {...props}
      />
      {help && <p className={helpClass}>{help}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  help,
  rows = 5,
  className,
  ...props
}: FieldProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`${inputClass} ${className ?? ""}`}
        {...props}
      />
      {help && <p className={helpClass}>{help}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  help,
  className,
  children,
  ...props
}: FieldProps & ComponentPropsWithoutRef<"select">) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select id={name} name={name} className={`${inputClass} ${className ?? ""}`} {...props}>
        {children}
      </select>
      {help && <p className={helpClass}>{help}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  help,
  className,
  ...props
}: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-charcoal">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={`h-4 w-4 rounded border-border accent-purple-600 focus:ring-2 focus:ring-gold-500/30 ${className ?? ""}`}
          {...props}
        />
        {label}
      </label>
      {help && <p className={helpClass}>{help}</p>}
    </div>
  );
}
