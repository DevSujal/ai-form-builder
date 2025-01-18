"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Checkbox
} from "../../../components/ui";
import { themes, backgrounds, styles } from "./";

function Controller({
  setSelectedTheme,
  setBackground,
  selectedTheme,
  setStyle,
  updateFieldInDb,
  enableSignIn
}) {
  const [showMore, setShowMore] = useState();

  async function handleCheckBoxChange(name, value) {
    updateFieldInDb(value, name);
  }
  return (
    <div className="w-full">
      <h2 className="my-1">Themes</h2>
      <Select
        onValueChange={(value) => setSelectedTheme(value)}
        className="w-full"
        value={selectedTheme}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, index) => (
            <SelectItem key={index} value={theme.name}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <span
                    className="w-5 h-5 rounded-bl-lg"
                    style={{ backgroundColor: theme.primary }}
                  ></span>
                  <span
                    className="w-5 h-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></span>
                  <span
                    className="w-5 h-5"
                    style={{ backgroundColor: theme.tertiary }}
                  ></span>
                  <span
                    className="w-5 h-5 rounded-tr-lg"
                    style={{ backgroundColor: theme.quaternary }}
                  ></span>
                </div>
                <p>{theme.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <h2 className="mt-8 my-1">Background</h2>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {backgrounds.map(
          (background, index) =>
            (index < 6 || showMore) && (
              <div
                onClick={() => setBackground(background.gradient)}
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div
                  className="w-28 h-28 flex justify-center items-center rounded-sm shadow-sm hover:border-2 hover:border-black"
                  style={{ background: background.gradient }}
                >
                  {index == 0 && background.name}
                </div>
              </div>
            )
        )}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="w-full mt-4 font-semibold text-sm"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Show Less" : "Show More"}
      </Button>

      {/* styles */}
      <h2 className="mt-8 my-1">Style</h2>

      <div className="flex flex-wrap justify-around gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => setStyle(style.value)}
            className=" w-24 h-24 shadow-lg flex justify-center border rounded-sm  items-center cursor-pointer"
          >
            <div
              className="w-10 h-10 flex justify-center items-center rounded-sm shadow-sm"
              style={{ border: style.value }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 my-4 mt-10">
        <Checkbox
          onCheckedChange={(value) =>
            handleCheckBoxChange("enableSignIn", value)
          }
          checked={enableSignIn}
        />
        <label>Enable Authorize Users Only Submition</label>
      </div>
    </div>
  );
}

export default Controller;
