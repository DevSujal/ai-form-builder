"use client";
import React, { use, useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JosnForms } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormUi } from "../../edit-form/_components";
import Link from "next/link";
import Image from "next/image";

function LiveAiForm({ params }) {
  const { formid } = use(params);
  const [record, setRecord] = useState(null);
  const [jsonForm, setJsonForm] = useState([]);
  useEffect(() => {
    params && getFormData();
  }, [params]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(JosnForms)
      .where(eq(JosnForms.id, Number(formid)));
    setJsonForm(JSON.parse(result[0]?.jsonform));
    setRecord(result[0]);
    console.log(result);
  };
  return (
    <div
      className="w-full p-5 flex justify-center min-h-screen items-center"
      style={{ background: record?.background }}
    >
      {record && (
        <FormUi
          jsonForm={jsonForm}
          selectedTheme={record.theme}
          onFieldUpdate={() => {}}
          deleteField={() => {}}
          style={record.style}
          editable={false}
          formId={formid}
          enableSignIn={record.enableSignIn}
        />
      )}

      <Link
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed right-5 bottom-5 cursor-pointer"
        href="/"
      >
        <Image src={"/logo.png"} width={26} height={26} alt="logo.png"></Image>
        <p className="text-sm">Build Your Own Form</p>
      </Link>
    </div>
  );
}

export default LiveAiForm;
