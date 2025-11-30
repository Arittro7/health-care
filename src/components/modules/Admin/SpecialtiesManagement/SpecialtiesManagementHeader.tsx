"use client";

import { Plus } from "lucide-react";
import SpecialtiesFormDialog from "./SpecialtiesFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RefreshButton from "@/components/shared/RefreshButton";

const SpecialtiesManagementHeader = () => {
  const router = useRouter() //from next/navigation
  const [, startTransition] = useTransition() 
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Management</h1>

          <p className="text-muted-foreground mt-1">
            Manage Doctors Information and Details
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div> */}

      {/* I will use the ManagementPageHeader component to handle the above components code by sending there as props*/}

      <ManagementPageHeader 
        title="Specialties Management"
        description="Manage Specialties information and details"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true)
        }}
      />
      <SpecialtiesFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default SpecialtiesManagementHeader;

/*
4. Send the Info to the ManagementPageHeader as props.
  4.1 - define the state as its required
5. Remove the the props interface as none of them are using 
6. Use This component on 📂src\app\(dashboardLayout)\admin\dashboard\specialties-management\page.tsx
7. Pass the RefreshButton Component as Children from ManagementPageHeader
*/
