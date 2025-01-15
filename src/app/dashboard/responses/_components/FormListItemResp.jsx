"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../configs";
import { userResponses } from "../../../../../configs/schema";
import { Loader2, Upload } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { count, eq } from "drizzle-orm";
import * as XLSX from "xlsx";
import { toast } from "../../../../hooks/use-toast";

const FormListItemResp = ({ form, formId }) => {
  const [resCount, setResCount] = React.useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    formId && getResCount();
  }, [formId]);
  const getResCount = async () => {
    const result = await db
      .select({ count: count() }) // Use 'count()' to get row count
      .from(userResponses)
      .where(eq(userResponses.formId, formId));

    setResCount(result[0]?.count || 0); // Access the count and handle undefined
  };

  const ExportData = async () => {
    setLoading(true);
    // Export data here
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formId, formId));

    if (!result) {
      toast({
        Description: "error while retrieving the data",
      });
      setLoading(false);
      return;
    }
    const resList = result.map((res) => JSON.parse(res.jsonResponse));
    if (Array.isArray(resList) && resList.length !== 0) {
      exportToExcel(resList);
    } else {
      toast({
        Description: "error while generating the excel sheet",
      });
    }
    setLoading(false);
  };

  const exportToExcel = (resList) => {
    const wb = XLSX.utils.book_new(); // Create a new workbook

    resList.forEach((response, index) => {
      // Convert each response object into column-wise format
      const responseData = Object.entries(response).map(([key, value]) => ({
        Field: key,
        Value: Array.isArray(value) ? value.join(", ") : value,
      }));

      // Create a worksheet for each response
      const ws = XLSX.utils.json_to_sheet(responseData);

      // Append the worksheet to the workbook with a unique sheet name
      XLSX.utils.book_append_sheet(wb, ws, `Response_${index + 1}`);
    });

    // Save the workbook with the form title
    XLSX.writeFile(wb, `${form?.title || "Responses"}.xlsx`);
  };
  return (
    <div className="border h-52 shadow-sm rounded-lg p-4">
      <h1 className="text-ellipsis font-semibold text-lg">{form?.title}</h1>
      <p className="text-ellipsis text-sm text-gray-600">{form?.subheading}</p>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <h2>
          <strong>{resCount}</strong> Responses
        </h2>
        <Button
          onClick={ExportData}
          disabled={loading}
          className="flex gap-2"
          size="sm"
        >
          {(loading && <Loader2 className="animate-spin" />) || (
            <>
              <Upload className="h-5 w-5" /> Export
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormListItemResp;
