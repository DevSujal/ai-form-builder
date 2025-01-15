"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JosnForms } from "../../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import FormListItemResp from "./_components/FormListItemResp";

const Responses = () => {
    const [formList, setFormList] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && getFormData();
    }, [user])
  const getFormData = async () => {
    const result = await db
      .select()
      .from(JosnForms)
      .where(eq(JosnForms.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JosnForms.createdAt));

    setFormList(result);
  };
  return (
    <div className="p-10">
      <div className="h-full flex justify-between items-center">
        <h2 className="font-bold text-3xl ">Responses</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form) => (
        <div key={form.id} className="p-3 my-2 gap-5">
          <FormListItemResp
            formId={form.id}
            form={JSON.parse(form?.jsonform)}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Responses;
