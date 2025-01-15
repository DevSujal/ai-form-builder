import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import FieldEdit from "./FieldEdit";
import { userResponses } from "../../../../configs/schema";
import { db } from "../../../../configs";
import moment from "moment";
import { toast } from "../../../hooks/use-toast";
import { Button } from "../../../components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";

const FormUi = ({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  background,
  style,
  editable = true,
  formId,
  enableSignIn,
}) => {
  const { user, isSignedIn } = useUser();
  const [form, setForm] = useState({});

  const handleInputChange = (label, e) => {
    const { value } = e.target;
    const name = label;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await db.insert(userResponses).values({
      jsonResponse: JSON.stringify(form),
      createdAt: moment().format("DD/MM/yyyy"),
      formId: formId,
    });
    if (!result)
      return toast({
        description: "Something went wrong",
      });

    toast({
      description: "Form submitted successfully",
    });
  };

  const headleCheckBoxChange = (name, value) => {
    if (form[name]?.includes(value)) {
      setForm((prev) => {
        const checkBoxValue = prev[name].filter((val) => val !== value);
        return { ...prev, [name]: checkBoxValue };
      });
    } else {
      setForm((prev) => {
        if (prev[name]) {
          return { ...prev, [name]: [...prev[name], value] };
        } else {
          return { ...prev, [name]: [value] };
        }
      });
    }
  };
  return (
    <form
      className="w-full p-5 flex justify-center min-h-screen items-center"
      style={{ background: background }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        className="md:w-[600px] shadow-md rounded-lg"
        data-theme={selectedTheme}
        style={{ border: style }}
      >
        <div className="w-full flex flex-col gap-4 p-5">
          <h2 className="font-bold text-center text-2xl">{jsonForm?.title}</h2>
          <h4 className="text-sm text-gray-500 text-center">
            {jsonForm?.subheading}
          </h4>
          {jsonForm?.fields?.map((field, index) => (
            <div key={index} className="flex gap-2">
              {field?.fieldType === "select" && (
                <div className="w-full">
                  <label key={index} className=" text-sm block">
                    {field?.label && (
                      <span className="text-sm text-black">{field?.label}</span>
                    )}
                  </label>
                  <Select
                    required={field?.required}
                    onValueChange={(value) =>
                      handleSelectChange(field?.label, value)
                    }
                  >
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder={field?.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field?.options?.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option}
                          className="bg-transparent"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {["text", "number", "email"]?.some(
                (type) => field?.fieldType == type
              ) && (
                <div className="w-full">
                  <label key={index} className=" text-sm block">
                    {field?.label && (
                      <span className="text-sm text-black">{field?.label}</span>
                    )}
                  </label>
                  <Input
                    type={field?.fieldType}
                    placeholder={field?.placeholder}
                    name={field?.fieldName}
                    className="placeholder:text-gray-400 bg-transparent"
                    required={field?.required}
                    onChange={(e) => handleInputChange(field?.label, e)}
                  />
                </div>
              )}
              {field?.fieldType === "radio" && (
                <div className="w-full flex flex-col gap-2">
                  <label key={index} className=" text-sm block">
                    {field?.label && (
                      <span className="text-sm text-black">{field?.label}</span>
                    )}
                  </label>
                  <RadioGroup
                    className="flex flex-col gap-1"
                    required={field?.required}
                  >
                    {field?.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={option}
                          onClick={() =>
                            handleSelectChange(field?.label, option)
                          }
                        />
                        <Label
                          className="text-gray-500 text-sm"
                          htmlFor={option}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {field?.fieldType === "checkbox" &&
                (field.options ? (
                  <div className="w-full flex flex-col gap-2">
                    <label key={index} className=" text-sm block">
                      {field?.label && (
                        <span className="text-sm text-black">
                          {field?.label}
                        </span>
                      )}
                    </label>
                    {field?.options?.map((option, index) => (
                      <div
                        className="w-full flex gap-2 items-center"
                        key={index}
                      >
                        <Checkbox
                          key={index}
                          label={option}
                          value={option}
                          onCheckedChange={() =>
                            headleCheckBoxChange(field?.label, option)
                          }
                        />
                        <Label htmlFor={option} className="text-gray-500">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex gap-2">
                    <Checkbox
                      key={index}
                      label={field?.label}
                      value={field?.label}
                      required={field?.required}
                      onCheckedChange={() =>
                        headleCheckBoxChange(field?.label, field?.label)
                      }
                    />
                    <label className=" text-sm block">
                      {field?.label && (
                        <span className="text-sm text-black">
                          {field?.label}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              {field?.fieldType === "textarea" && (
                <div className="w-full">
                  <label key={index} className=" text-sm block">
                    {field?.label && (
                      <span className="text-sm text-black">{field?.label}</span>
                    )}
                  </label>
                  <Textarea
                    type={field?.fieldType}
                    placeholder={field?.placeholder}
                    name={field?.fieldName}
                    className="placeholder:text-gray-400 bg-transparent"
                    required={field?.required}
                    onChange={(e) => handleInputChange(field?.label, e)}
                  />
                </div>
              )}
              {editable && (
                <div>
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(data) => onFieldUpdate(data, index)}
                    deleteField={(data) => deleteField(data, index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center p-2">
          {!isSignedIn && enableSignIn ? (
            <SignInButton mode="modal">
              <Button>Sign In To Submit</Button>
            </SignInButton>
          ) : (
            <button
              type="submit"
              className="btn w-64 btn-primary rounded-md text-center"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormUi;
