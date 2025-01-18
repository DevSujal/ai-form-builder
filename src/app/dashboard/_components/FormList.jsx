"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JosnForms } from "../../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { FormListItem} from "./";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    user && getFormData();
  }, [user, refresh]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(JosnForms)
      .where(eq(JosnForms.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JosnForms.createdAt));

    setFormList(result);
    console.log(result)
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {formList.map((form) => (
        <div key={form.id} className="p-3 my-2 gap-5">
          <FormListItem
            setRefresh={setRefresh}
            formId={form.id}
            form={JSON.parse(form?.jsonform)}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;
