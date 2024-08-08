import TaskCard from "@/app/components/TaskCard/TaskCard";

const CompletedTaskPage = () => {
  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bokd flex items-center">
          Completed Tasks
        </h1>
      </header>
      <div className="mt-8 flex flex-wrap gap-4s">
        <TaskCard />
      </div>
    </div>
  );
};

export default CompletedTaskPage;
