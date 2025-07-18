import { useProject } from "@/hooks/hooks";
import { useParams } from "react-router";
import { Calendar, Clock, File, BarChart, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProjectFilesList from "@/components/ProjectFilesList";
import OverviewCard from "@/components/OverviewCard";
import Analyses from "@/components/Analyses";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  console.log("Project ID:", projectId);

  const { data, error, isPending, isError } = useProject(projectId);

  if (isPending) return <LoadingSpinner message="Loading project details..." />;

  if (isError) return <ErrorComponent error={error} />;

  return (
    <div className="container flex flex-col gap-6 min-h-full my-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="text-3xl font-bold">{data.identifier}</span>

        <div className="flex gap-2">
          <Button variant="outline">Download Files</Button>
          <Button variant="default">Export Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <OverviewCard
          title="Creation Date"
          icon={<Calendar className="size-4" />}
        >
          {formatDate(data.creationDate)}
        </OverviewCard>

        <OverviewCard title="Chains" icon={<Link className="size-4" />}>
          <div className="flex flex-wrap gap-1">
            {data.chains ? (
              data.chains.map((chain: string) => (
                <Badge key={chain} variant="outline">
                  {chain}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">No chains</span>
            )}
          </div>
        </OverviewCard>

        <OverviewCard title="Files count" icon={<File className="size-4" />}>
          {data.files.length}
        </OverviewCard>

        <OverviewCard
          title="Analyses count"
          icon={<BarChart className="size-4" />}
        >
          {data.analyses.length}
        </OverviewCard>

        <OverviewCard title="Status" icon={<Clock className="size-4" />}>
          <Badge variant={data.published ? "default" : "secondary"}>
            {data.published ? "Published" : "Draft"}
          </Badge>
        </OverviewCard>
      </div>

      <Separator />

      <Tabs defaultValue="analyses">
        <TabsList className="mb-4">
          <TabsTrigger value="analyses">Analyses</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview"></TabsContent>

        <TabsContent value="analyses">
          <Analyses
            projectId={data.identifier}
            availableAnalyses={data.analyses}
          />
        </TabsContent>

        <TabsContent value="files">
          <ProjectFilesList projectId={data.identifier} files={data.files} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;
