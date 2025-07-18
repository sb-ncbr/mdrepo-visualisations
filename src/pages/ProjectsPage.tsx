import DynamicPagination from "@/components/DynamicPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjects } from "@/hooks/hooks";
import { getAnalysisDisplayNames } from "@/lib/utils";
import type { Project } from "@/types/types";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";

const getPagesAmount = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize);
};

const ProjectsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

  const { data, error, isError, isPending } = useProjects(pageSize, page);

  if (isPending) return <LoadingSpinner message="Loading projects data..." />;

  if (isError) return <ErrorComponent error={error} />;

  const handleRowClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Projects List</CardTitle>
          <CardDescription>
            This page lists all available projects. You can view details by
            clicking on the project row.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identifier</TableHead>
                <TableHead>Creation Date</TableHead>
                <TableHead>Available analyses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.projects.map((project: Project) => (
                <TableRow
                  key={project.identifier}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(project.identifier)}
                >
                  <TableCell>{project.identifier}</TableCell>
                  <TableCell>
                    {new Date(project.creationDate).toDateString()}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-1">
                    {project.analyses.length > 0 ? (
                      <>
                        {getAnalysisDisplayNames(project.analyses)
                          .slice(0, 3)
                          .map((analysis, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {analysis}
                            </Badge>
                          ))}
                        {project.analyses.length > 3 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs">
                                +
                                {getAnalysisDisplayNames(project.analyses)
                                  .length - 3}{" "}
                                more
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[250px]">
                              <span className="text-sm">
                                {getAnalysisDisplayNames(project.analyses)
                                  .slice(3)
                                  .join(", ")}
                              </span>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No analyses available
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-muted-foreground">Show</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(parseInt(value))}
              defaultValue="10"
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Items per page</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-muted-foreground text-nowrap">
              items per page
            </span>
          </div>
          <DynamicPagination
            totalPages={getPagesAmount(data.filteredCount, pageSize)}
            page={page}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectsPage;
