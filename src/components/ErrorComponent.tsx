import { type FC } from "react";

const ErrorComponent: FC<{ error: Error }> = ({ error }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center h-full w-full p-4 rounded-md shadow-lg bg-muted/50">
        <span className="text-2xl font-bold text-destructive">
          {error.name}
        </span>
        <span className="text-destructive text-lg">{error.message}</span>
        <span className="bg-muted p-4 rounded font-mono max-h-[50%] overflow-auto">
          {error.stack || "No stack trace available"}
        </span>
        <span className="text-muted-foreground">
          Please try refreshing the page or contact support if the issue
          persists.
        </span>
      </div>
    </>
  );
};

export default ErrorComponent;
