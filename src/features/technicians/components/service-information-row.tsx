interface ServiceInformationRowProps {
  label: string;
  value?: string | null;
  className?: string;
}

export function ServiceInformationRow({
  label,
  value,
  className,
}: ServiceInformationRowProps) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}