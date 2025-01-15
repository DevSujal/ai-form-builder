"use client";
import { Edit2, Share2, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { JosnForms, userResponses } from "../../../../configs/schema";
import { toast } from "../../../hooks/use-toast";
import { db } from "../../../../configs";
import ShareButton from "./ShareButton";

const FormListItem = ({ form, formId, setRefresh }) => {
  const { user } = useUser();
  const deleteForm = async () => {
    try {
      await db.delete(userResponses).where(eq(userResponses.formId, formId));
      const result = await db
        .delete(JosnForms)
        .where(
          and(
            eq(JosnForms.id, formId),
            eq(JosnForms.createdBy, user.primaryEmailAddress?.emailAddress)
          )
        );
      if (result) {
        toast({
          description: "Form deleted successfully",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
      });
    } finally {
      setRefresh((prev) => !prev);
    }
  };
  return (
    <div className="border h-52 shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 className="h-5 w-5 text-red-500 cursor-pointer hover:scale-105 hover:transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteForm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h1 className="text-ellipsis font-semibold text-lg">{form?.title}</h1>
      <p className="text-ellipsis text-sm text-gray-600">{form?.subheading}</p>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <Link href="/">
          <ShareButton
            title={"Share"}
            text={"Share this form"}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${formId}`}
          >
            <Share2 /> Share
          </ShareButton>
        </Link>
        <Link href={`/edit-form/${formId}`}>
          <Button className="flex gap-2" size="sm">
            <Edit2 className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;
