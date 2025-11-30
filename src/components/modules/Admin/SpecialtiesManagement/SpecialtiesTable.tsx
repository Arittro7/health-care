"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialties.interface";
import { specialtiesColumns } from "./SpecialtiesColumns";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSpecialty } from "@/services/Admin/specialtiesManagement";

interface SpecialtiesTableProps {
  specialties: ISpecialty[];
}

const SpecialtiesTable = ({ specialties }: SpecialtiesTableProps) => {
  const [deletingSpecialty, setDeletingSpecialty] =
    useState<ISpecialty | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);
  const router = useRouter()
  const [, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  
  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };

  const confirmDelete = async () => {
    if (!deletingSpecialty) return;

    setIsDeletingDialog(true);
    const result = await deleteSpecialty(deletingSpecialty.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Specialty deleted successfully");
      setDeletingSpecialty(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete specialty");
    }
  };

  return (
    <>
      <ManagementTable
        data={specialties} //from 👆🏻 params
        columns={specialtiesColumns} //import from ./SpecialtiesColumns
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
        emptyMessage="No specialties found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSpecialty} //it will always return truthy value
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesTable;

/*
Add use client
1. Create the react component using rafce
2. Define Interface which will have array of specialties From ISpecialty from specialties interface file
3. Pass the props on React Component function
4. As I didn't want to define any client interaction [on src\app\(dashboardLayout)\admin\dashboard\specialties-management\page.tsx] in Page file thats why I will Handle the Management Table here.
5. Define state for DeleteSpecialty and DeletingDialog
6. Define a handleDelete to execute the deleting operation
7. Define Handle to Refresh the UI after deletion executed
  7.1 For That I have to call the router from next/navigation and Transition from react hook
8. Define a Confirmation function for delete 
  8.1 const result = await deleteSpecialty(deletingSpecialty.id); Call the deleteSpecialty server action from 📂 services/Admin/specialtiesManagement
9. Use this File on 📂src\app\(dashboardLayout)\admin\dashboard\specialties-management\page.tsx
*/
