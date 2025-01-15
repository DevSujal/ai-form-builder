"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JosnForms } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import { useToast } from "../../../hooks/use-toast";
import Controller from "../_components/Controller";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
const EditForm = ({ params }) => {
  const { user } = useUser();
  const { formId } = React.use(params);
  const [jsonForm, setJsonForm] = React.useState([]);
  const [selectedTheme, setSelectedTheme] = React.useState("light");
  const [enableSignIn, setEnableSignIn] = useState(false);
  const [background, setBackground] = useState();
  const [style, setStyle] = useState();
  const { toast } = useToast();
  const router = useRouter();

  const onFieldUpdate = (data, index) => {
    jsonForm.fields[index].label = data?.label;
    jsonForm.fields[index].placeholder = data?.placeholder;
    setJsonForm({ ...jsonForm });
    updateJsonFormInDb();
    toast({
      description: "Field Updated!!!",
    });
  };

  const deleteField = (data, index) => {
    jsonForm.fields.splice(index, 1);
    setJsonForm({ ...jsonForm });
    updateJsonFormInDb();
    toast({
      description: "Field Deleted!!!",
    });
  };

  useEffect(() => {
    user && getFormData();
  }, [user]);
  const getFormData = async () => {
    const result = await db
      .select()
      .from(JosnForms)
      .where(
        and(
          eq(JosnForms.id, formId),
          eq(JosnForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (result) {
      setJsonForm(JSON.parse(result[0]?.jsonform));
      setSelectedTheme(result[0]?.theme || "light");
      setBackground(result[0]?.background || "#fff");
      setStyle(result[0]?.style || "none");
      setEnableSignIn(result[0]?.enableSignIn);
    }
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JosnForms)
      .set({ jsonform: jsonForm })
      .where(
        and(
          eq(JosnForms.id, formId),
          eq(JosnForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    console.log(result);
  };

  const updateFieldInDb = async (value, columnName) => {
    const result = await db
      .update(JosnForms)
      .set({ [columnName]: value })
      .where(
        and(
          eq(JosnForms.id, formId),
          eq(JosnForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (!result) {
      console.log("Error updating field in db");
      return;
    }

    toast({
      description: "Field Updated!!!",
    });
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center my-2">
        <h2
          className="flex gap-2 items-center my-2 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowLeft className="inline-block" /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={`/aiform/${formId}`} target="_blank">
            <Button className="flex gap-2">
              {" "}
              <SquareArrowOutUpRight /> Live Preview
            </Button>
          </Link>
          <Button className="flex gap-2 bg-orange-600 hover:bg-orange-500">
            {" "}
            <Share2 /> Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border p-5 h-screen overflow-y-scroll rounded-lg shadow-md">
          <Controller
            setSelectedTheme={(value) => {
              setSelectedTheme(value);
              updateFieldInDb(value, "theme");
            }}
            updateFieldInDb={updateFieldInDb}
            setBackground={(value) => {
              setBackground(value);
              updateFieldInDb(value, "background");
            }}
            setStyle={(value) => {
              setStyle(value);
              updateFieldInDb(value, "style");
            }}
            selectedTheme={selectedTheme}
            enableSignIn={enableSignIn}
          />
        </div>
        <div className="md:col-span-2 rounded-md h-screen overflow-y-scroll">
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={deleteField}
            selectedTheme={selectedTheme}
            background={background}
            style={style}
            enableSignIn = {enableSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
