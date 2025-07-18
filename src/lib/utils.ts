import { analyses, type Analysis } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAnalysisDisplayName(analysisType: Analysis): string {
  const displayNames: Record<Analysis, string> = {
    [analyses.rmsd]: "RMSD",
    [analyses.distPerresMean]: "Distance Per Residue (Mean)",
    [analyses.distPerresStdv]: "Distance Per Residue (StdDev)",
    [analyses.rmsdPairwiseInterface]: "RMSD Pairwise Interface",
    [analyses.distPerres]: "Distance Per Residue",
    [analyses.energies]: "Energies",
    [analyses.hbonds]: "Hydrogen Bonds",
    [analyses.rmsdPairwise]: "RMSD Pairwise",
    [analyses.fluctuation]: "Fluctuation",
    [analyses.tmscores]: "TM Scores",
    [analyses.rgyr]: "Radius of Gyration",
    [analyses.rmsds]: "Multiple RMSDs",
    [analyses.pockets]: "Pockets",
    [analyses.interactions]: "Interactions",
    [analyses.pca]: "Principal Component Analysis",
    [analyses.rmsdPerres]: "RMSD Per Residue",
    [analyses.sasa]: "Solvent Accessible Surface Area",
  };

  return displayNames[analysisType];
}

export function getAnalysisDisplayNames(analysisTypes: Analysis[]): string[] {
  return analysisTypes.map(getAnalysisDisplayName);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });
}
