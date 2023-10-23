import ReminderForm from "@/components/form/ReminderForm";
import RootLayout from "@/components/shared/RootLayout";
import React from "react";

const page = () => {
  return (
    <div className="bg-second-pil">
      <RootLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-8">
          <ReminderForm />
        </div>
      </RootLayout>
    </div>
  );
};

export default page;
