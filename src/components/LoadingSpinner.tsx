import { Loader2 } from "lucide-react";
import { type FC } from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full w-full gap-2">
      <Loader2 className="size-8 animate-spin text-primary" />
      <span>{message ?? "Loading..."}</span>
    </div>
  );
};

export default LoadingSpinner;
