"use client";
import { ProviderModel } from '@/types';

const OPTIONS: { label: string; value: ProviderModel }[] = [
  { label: 'Gemini 2.5 Flash (default)', value: 'gemini-2.5-flash' },
  { label: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
];

export default function ModelSelector({ value, onChange }: { value: ProviderModel; onChange: (m: ProviderModel) => void }) {
  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value as ProviderModel)}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}


