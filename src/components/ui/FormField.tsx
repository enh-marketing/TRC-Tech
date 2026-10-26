import { cn } from "@/lib/cn";

const controlBase =
  "w-full box-border min-h-11 rounded-sm border border-line-200 bg-surface-100 p-3 " +
  "text-body text-ink-900 placeholder:text-ink-500 " +
  "transition-colors duration-150 ease-out hover:border-ink-900";

/**
 * The wrapper around every control. Label above, never a placeholder as
 * a label. Error text starts with the word Error, so the state never
 * rests on danger-600 alone.
 */
export function FormField({
  id,
  label,
  required = false,
  help,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-field-label text-ink-900">
        {label}
        {required ? (
          <span aria-hidden="true" className="ms-0.5 text-danger-600">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1 text-caption text-danger-600">
          Error: {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="text-caption text-ink-500">
          {help}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, invalid && "border-2 border-danger-600", className)}
    />
  );
}

export function Select({
  invalid,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, invalid && "border-2 border-danger-600", className)}
    >
      {children}
    </select>
  );
}

export function Textarea({
  invalid,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "min-h-30 resize-y", invalid && "border-2 border-danger-600", className)}
    />
  );
}

/** The resume upload on the candidate form. */
export function FileInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-sm border border-dashed border-line-200 bg-surface-300 p-4 text-body-sm text-ink-700",
        className,
      )}
    >
      <input type="file" {...props} />
    </div>
  );
}
