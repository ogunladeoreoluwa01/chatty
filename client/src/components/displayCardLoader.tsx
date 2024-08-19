import { Skeleton } from "@/components/ui/skeleton";

export function DisplayCardLoader() {
  return (
    <div className="flex flex-col items-center space-x-4">
      <Skeleton className="h-[12.25rem] bg-primary w-[9.6875rem] rounded-[0.5rem] border-2 border-foreground" />
      <div className="mt-1 flex flex-col gap-1 ">
        <Skeleton className="h-4 w-[8.6875rem] bg-primary border-2 border-foreground" />
      </div>
    </div>
  );
}
