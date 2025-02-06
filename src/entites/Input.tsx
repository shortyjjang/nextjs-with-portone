import React from "react";

export default function Input({
  id,
  type = "text",
  placeholder,
  minLength,
  maxLength,
  className = "",
  value = "",
  onChange,
  readOnly = false,
  disabled = false,
  onClick,
}: {
  id?: string;
  type?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete="new-password"
      aria-invalid={false}
      minLength={minLength}
      maxLength={maxLength}
      className={`w-full p-2 border border-gray-300 focus:outline-none ${className}`}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
