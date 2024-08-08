import NewTaskForm from "@/app/components/NewTaskForm/NewTaskForm";
import React from "react";

const NewTaskPage = () => {
  return (
    <div className="flex flex-col justify-center py-20 ">
      <h2 className="text-center text-2xl font-bold">Create New Task</h2>
      <NewTaskForm />
    </div>
  );
};

export default NewTaskPage;
