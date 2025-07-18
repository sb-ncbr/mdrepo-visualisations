import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjectsSummary } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";

const LandingPage = () => {
  const { data, error, isError, isLoading } = useProjectsSummary();

  if (isLoading) {
    return <LoadingSpinner message="Loading general project statistics..." />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Welcome Card */}
      <Card className="flex-row flex-between items-center justify-between px-6">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold">
              Welcome to MDPosit data visualisations
            </CardTitle>
            <CardDescription>
              See available analyses and their visualisations
            </CardDescription>
          </CardHeader>
        </div>
        <Link to={"/projects"} className="flex-shrink-0">
          <Button size={"lg"}>
            Project list
            <ChevronRight className="size-5" />
          </Button>
        </Link>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total projects</CardTitle>
            <CardDescription>
              Number of research projects available in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.projectsCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Molecular Dynamics Simulations</CardTitle>
            <CardDescription>
              Total number of MD simulations across all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.mdCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Time</CardTitle>
            <CardDescription>
              Cumulative simulation time across all MD runs (ns)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {Math.floor(data?.totalTime || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Frames</CardTitle>
            <CardDescription>
              Total number of trajectory frames available for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.totalFrames || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Volume</CardTitle>
            <CardDescription>
              Total size of all MD simulation data (TB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.totalSize || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Analyses</CardTitle>
            <CardDescription>
              Number of analysis tasks performed on MD data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.totalAnalyses || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-2xl">Storage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Raw Data</CardTitle>
                <CardDescription>
                  Size of raw simulation data files (TB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data?.storageStats.dataSizeInTB || 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Utilization</CardTitle>
                <CardDescription>
                  Total disk space currently in use (TB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data?.storageStats.storageUsedInTB || 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Index Size</CardTitle>
                <CardDescription>
                  Size of database indices for quick data retrieval (TB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data?.storageStats.indexSizeInTB || 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Storage</CardTitle>
                <CardDescription>
                  Combined size of all data, indices, and system files (TB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data?.storageStats.totalSizeInTB || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
