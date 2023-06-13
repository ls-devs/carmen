"use client";
import {block} from "million/react";
import React from "react";

type ButtonProps = {
  color: string;
  text: string;
  textSize?: string;
  classes?: string[];
  width?: string;
  height?: string;
};

export const Button: React.FC<ButtonProps> = /* @optimize */ block(
  ({color, text, textSize, classes, height, width}) => {
    return (
      <button
        className={`flex ${height ? height : "h-[83px]"} ${
          width ? width : "w-[160px]"
        } cursor-pointer items-center justify-center font-thunder ${
          classes
            ? Object.entries(classes)
                .map(([key, value]) => value)
                .join(" ")
            : ""
        }`}
      >
        <div
          className={`relative flex h-full w-full items-center justify-center ${
            color === "red-carmen" ? "bg-red-button" : "bg-cream-button"
          } bg-contain bg-center bg-no-repeat`}
        >
          <h3
            className={`absolute mt-2 font-thunder ${textSize} text-${
              color === "red-carmen" ? "cream-carmen" : "red-carmen"
            }`}
          >
            {text}
          </h3>
        </div>
      </button>
    );
  },
);
