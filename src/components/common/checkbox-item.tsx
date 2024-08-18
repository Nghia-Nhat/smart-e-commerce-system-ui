"use client";

import { Checkbox } from "@/components/ui/checkbox";

type CheckBoxItemType = {
  value: string;
  label: string;
  onChange: (value: string, checked: boolean) => void;
};

export function CheckBoxItem({ value, label, onChange }: CheckBoxItemType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, e.target.checked);
  };
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <Checkbox
        id={value}
        value={value}
        onCheckedChange={(checked) => onChange(value, checked as boolean)}
      />
      <label
        htmlFor={value}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
