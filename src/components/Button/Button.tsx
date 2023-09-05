import { Inputs } from '@/types/types';
import React, { BaseSyntheticEvent } from 'react';
import { SubmitHandler } from 'react-hook-form';

type ButtonProps = {
  color: string;
  text: string;
  textSize?: string;
  classes?: string[];
  width?: string;
  height?: string;
  onSubmit?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

export const Button: React.FC<ButtonProps> = ({
  color,
  text,
  textSize,
  classes,
  height,
  width,
  onSubmit,
}) => {
  return (
    <button
      onClick={onSubmit ? () => onSubmit() : () => {}}
      className={`flex ${height ? height : 'h-[83px]'} ${
        width ? width : 'w-[160px]'
      } cursor-pointer items-center justify-center font-thunder ${
        classes
          ? Object.entries(classes)
              .map(([_key, value]) => value)
              .join(' ')
          : ''
      }`}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center ${
          color === 'red-carmen' ? 'bg-red-button' : 'bg-cream-button'
        } bg-contain bg-center bg-no-repeat`}
      >
        <h3
          className={`absolute mt-2 font-thunder ${textSize} text-${
            color === 'red-carmen' ? 'cream-carmen' : 'red-carmen'
          }`}
        >
          {text}
        </h3>
      </div>
    </button>
  );
};
