import {
  // getProjectAnalyses,
  getProjectAnalysisByName,
  getProjectById,
  getProjectFilenotes,
  getProjectFiles,
  getProjects,
  getProjectsSummary,
  getProjectStructure,
  getProjectTopology,
  getProjectTrajectory,
} from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProjects = (limit: number, page: number) => {
  return useQuery({
    queryKey: ["projects", limit, page],
    queryFn: () => getProjects(limit, page),
    placeholderData: keepPreviousData,
  });
};

export const useProjectsSummary = () => {
  return useQuery({
    queryKey: ["projectsSummary"],
    queryFn: getProjectsSummary,
  });
};

export const useProject = (projectId?: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => {
      if (projectId) return getProjectById(projectId);
      throw new Error("Project ID is required");
    },
    enabled: !!projectId,
  });
};

export const useProjectTopology = (projectId: string) => {
  return useQuery({
    queryKey: ["projectTopology", projectId],
    queryFn: () => getProjectTopology(projectId),
  });
};

export const useProjectStructure = (projectId: string) => {
  return useQuery({
    queryKey: ["projectStructure", projectId],
    queryFn: () => getProjectStructure(projectId),
  });
};

export const useProjectTrajctory = (projectId: string) => {
  return useQuery({
    queryKey: ["projectTrajectory", projectId],
    queryFn: () => getProjectTrajectory(projectId),
  });
};

export const useProjectFiles = (projectId: string) => {
  return useQuery({
    queryKey: ["projectFiles", projectId],
    queryFn: () => getProjectFiles(projectId),
  });
};

export const useProjectFilenotes = (projectId: string) => {
  return useQuery({
    queryKey: ["projectFilenotes", projectId],
    queryFn: () => getProjectFilenotes(projectId),
  });
};

// export const useProjectAnalyses = (projectId: string) => {
//   return useQuery({
//     queryKey: ["projectAnalyses", projectId],
//     queryFn: () => getProjectAnalyses(projectId),
//   });
// };

export const useProjectAnalysisByName = (
  projectId: string,
  analysisName: string
) => {
  return useQuery({
    queryKey: ["projectAnalyses", projectId, analysisName],
    queryFn: () => getProjectAnalysisByName(projectId, analysisName),
  });
};
