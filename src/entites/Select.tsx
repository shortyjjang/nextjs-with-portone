import React, { useState } from "react";
import Input from "./Input";

export default function Select({
  id,
  placeholder,
  className,
  value,
  onChange,
  readOnly,
  disabled,
  options,
  isCustom,
  onClick,
}: {
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
  isCustom?: boolean;
  onClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (disabled) return;
        if (e.target === e.currentTarget) {
          setIsOpen(!isOpen);
          if (onClick) onClick();
        }
      }}
      className={`relative w-full flex items-center p-2 border border-gray-300 focus:outline-none ${
        isOpen ? "border-b-0" : ""
      } ${className}`}
    >
      {isCustom && customMode ? (
        <Input
          id={`${id}-custom`}
          value={value}
          onFocus={() => setCustomMode(true)}
          onChange={(e) => {
            if(onChange) onChange(e.target.value);
            setIsOpen(false);
          }}
          className="border-y-0 border-x-0"
          placeholder="직접입력"
        />
      ) : value ? (
        options?.find((option) => option.value === value)?.label || null
      ) : (
        placeholder
      )}
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="border-b cursor-pointer border-gray-300 border-r absolute right-6 top-1/2 aspect-square -translate-y-1/2 w-2 rotate-45"
      ></span>
      <div
        className={`absolute top-full left-0 w-full bg-white z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options?.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              setIsOpen(false);
              if (readOnly) return;
              if (disabled) return;
              if (onChange) onChange(option.value);
            }}
            className={`p-2 cursor-pointer px-4 hover:bg-gray-100 ${
              option.value === value ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {option.label}
          </div>
        ))}
        {isCustom ? (
          <label
            htmlFor={`${id}-custom`}
            onClick={() => {
              setCustomMode(true);
              setIsOpen(false);
              if (onChange) onChange("");
            }}
            className="p-2 block cursor-pointer px-4 hover:bg-gray-100"
          >
            직접입력
          </label>
        ) : null}
      </div>
    </div>
  );
}
