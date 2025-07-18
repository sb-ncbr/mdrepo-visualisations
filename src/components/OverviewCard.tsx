import type { ReactElement, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const OverviewCard = ({
  children,
  title,
  icon,
}: {
  children: ReactNode;
  title: string;
  icon: ReactElement;
}) => {
  return (
    <Card className="justify-between">
      <CardHeader className="gap-0">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-lg font-medium">{children}</CardContent>
    </Card>
  );
};

export default OverviewCard;
