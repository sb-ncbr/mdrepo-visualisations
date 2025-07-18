import type { Analysis } from "@/types/types";
import { useState, type FC } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getAnalysisDisplayName } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AnalysisContainer from "./Analyses/AnalysisContainer";

interface AnalysesProps {
  projectId: string;
  availableAnalyses: Analysis[];
}

const Analyses: FC<AnalysesProps> = ({ projectId, availableAnalyses }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<
    Analysis | undefined
  >();

  return (
    <>
      <Card className="h-[900px]">
        <CardHeader>
          {currentAnalysis && (
            <>
              <CardTitle>{getAnalysisDisplayName(currentAnalysis)}</CardTitle>
              <CardDescription>{currentAnalysis}</CardDescription>
            </>
          )}

          <CardAction>
            <Select
              onValueChange={(value: Analysis) => {
                setCurrentAnalysis(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Analysis" />
              </SelectTrigger>
              <SelectContent>
                {availableAnalyses.map((analysis) => (
                  <SelectItem key={analysis} value={analysis}>
                    {getAnalysisDisplayName(analysis)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="h-[780px]">
          {currentAnalysis ? (
            <AnalysisContainer
              projectId={projectId}
              analysisIdentifier={currentAnalysis}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-muted rounded-md shadow-lg">
              <span className="text-lg font-medium">No analysis selected</span>
              <span className="text-muted-foreground">
                Please select an analysis from the dropdown above to view its
                visualization.
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/50 p-3">
          <div className="flex justify-end w-full gap-2">
            <Button variant="outline" size="sm">
              Download Data
            </Button>
            <Button variant="default" size="sm">
              Export Graph
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Analyses;
