type Props = {
  name: string;
  label: string;
  labels: Record<string, string>;
  value: string;
  all?: boolean;
  error?: string;
};

export default function StatusSelect({ name, label, labels, value, all, error }: Props) {
  return (
    <label>
      {label}
      <select name={name} defaultValue={value} aria-invalid={error ? true : undefined}
        aria-describedby={error ? name + '-error' : undefined}>
        {all ? <option value="">Semua</option> : null}
        {Object.entries(labels).map(([key, text]) => <option key={key} value={key}>{text}</option>)}
      </select>
      {error ? <small id={name + '-error'}>{error}</small> : null}
    </label>
  );
}
