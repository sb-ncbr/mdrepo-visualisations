import React, { Fragment, type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

interface ProjectFilesListProps {
  projectId: string;
  files: string[];
}

const ProjectFilesList: FC<ProjectFilesListProps> = ({ projectId, files }) => {
  return (
    <Card className="h-[900px]">
      <CardHeader>
        <CardTitle>Files for project {projectId}</CardTitle>
        <CardDescription>Files associated with this project</CardDescription>
      </CardHeader>
      <CardContent className="h-[780px]">
        <ScrollArea className="h-full bg-muted rounded-lg p-2 pr-4 shadow-lg">
          {files.length > 0 ? (
            <div>
              {files.map((file: string, index: number) => (
                <Fragment key={index}>
                  {/* {index > 0 && <Separator />} */}
                  <div className="flex items-center justify-between p-2 hover:bg-background rounded-lg">
                    <span className="font-mono text-sm">{file}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="shadow-none hover:bg-primary/90 hover:text-primary-foreground"
                    >
                      Download
                    </Button>
                  </div>
                </Fragment>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">No files available</span>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProjectFilesList;
