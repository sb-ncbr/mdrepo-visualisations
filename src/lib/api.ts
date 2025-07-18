import type { AxiosResponse } from "axios";
import mdposit from "./mdposit";
import type { Project, ProjectList, Summary } from "@/types/types";

/**
 * API functions to interact with the MDPosit service.
 * These functions handle fetching projects, project summaries, and specific project details.
 */

// TODO: Add types for the responses based on swagger documentation

export const getProjects = async (
  limit: number,
  page: number
): Promise<ProjectList> => {
  try {
    const response: AxiosResponse = await mdposit.get("/projects", {
      params: {
        limit,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectsSummary = async (): Promise<Summary> => {
  try {
    const response: AxiosResponse<Summary> = await mdposit.get(
      "/projects/summary"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects summary:", error);
    throw error;
  }
};

export const getProjectById = async (projectId: string): Promise<Project> => {
  try {
    const response: AxiosResponse = await mdposit.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw error;
  }
};

export const getProjectTopology = async (projectId: string) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/topology`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching topology for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};

export const getProjectStructure = async (projectId: string) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/structure`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching structure for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};

export const getProjectTrajectory = async (projectId: string) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/trajectory`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching trajectory for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};

export const getProjectFiles = async (projectId: string) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/files`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching files for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};

export const getProjectFilenotes = async (projectId: string) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/filenotes`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching filenotes for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};

// export const getProjectAnalyses = async (projectId: string) => {
//   try {
//     const response: AxiosResponse = await mdposit.get(
//       `/projects/${projectId}/analyses`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Error fetching analyses for project with ID ${projectId}:`,
//       error
//     );
//     throw error;
//   }
// };

export const getProjectAnalysisByName = async (
  projectId: string,
  analysisName: string
) => {
  try {
    const response: AxiosResponse = await mdposit.get(
      `/projects/${projectId}/analyses/${analysisName}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching analysis with name ${analysisName} for project with ID ${projectId}:`,
      error
    );
    throw error;
  }
};
