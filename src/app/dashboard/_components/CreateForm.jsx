"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { AiChatSession } from "../../../../configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import { JosnForms } from "../../../../configs/schema";
import moment from "moment";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
const CreateForm = ({className}) => {
  const [open, setOpen] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState();
  const router = useRouter();
  const { user } = useUser();

  const onCreateForm = async () => {
    setLoading(true);
    try {
      const result = await AiChatSession(userInput);
      if (result) {
        console.log(result);
        const res = await db
          .insert(JosnForms)
          .values({
            jsonform: result,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: JosnForms.id });

        if (res[0]?.id) {
          setLoading(false);
          router.push(`/edit-form/${res[0].id}`);
        }
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    } 
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}

        className={className}
      >
        + Create Form
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
                className="my-2"
                placeholder="write a description of your form..."
              />
              <span className="flex justify-end items-center gap-3 mt-5">
                <Button onClick={() => setOpen(false)} variant="destructive">
                  Cancle
                </Button>
                <Button disabled={loading} onClick={onCreateForm}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
