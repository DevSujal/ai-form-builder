import { Delete, Edit, Trash } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
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

const FieldEdit = ({ defaultValue, onUpdate, deleteField }) => {
  const [label, setLabel] = React.useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = React.useState(
    defaultValue?.placeholder
  );
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="cursor-pointer h-4 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 p-4">
          <h2 className="text-center">Edit Fields</h2>
          <div>
            <label htmlFor="Label name" className="text-xs text-gray-500">
              Label Name
            </label>
            <Input
              type="text"
              placeholder="Label Name"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Placeholder name" className="text-gray-500 text-xs">
              Placeholder Name
            </label>
            <Input
              type="text"
              placeholder="Placeholder Name"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder,
              })
            }
          >
            Save
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="cursor-pointer h-4 w-5 text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete this component from
              the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteField()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldEdit;
