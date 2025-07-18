type Summary = {
  projectsCount: number;
  mdCount: number;
  totalTime: number;
  totalFrames: number;
  totalSize: number;
  totalAnalyses: number;
  storageStats: {
    dataSizeInTB: number;
    storageUsedInTB: number;
    indexSizeInTB: number;
    totalSizeInTB: number;
  };
};

export const analyses = {
  rmsd: "rmsd",
  distPerresMean: "dist-perres-mean",
  distPerresStdv: "dist-perres-stdv",
  rmsdPairwiseInterface: "rmsd-pairwise-interface",
  distPerres: "dist-perres",
  energies: "energies",
  hbonds: "hbonds",
  rmsdPairwise: "rmsd-pairwise",
  fluctuation: "fluctuation",
  tmscores: "tmscores",
  rgyr: "rgyr",
  rmsds: "rmsds",
  pockets: "pockets",
  interactions: "interactions",
  pca: "pca",
  rmsdPerres: "rmsd-perres",
  sasa: "sasa",
} as const;

type Analysis = (typeof analyses)[keyof typeof analyses];

type ProjectMetadata = unknown; // Replace with actual type when available

type Project = {
  identifier: string;
  accession: string;
  published: boolean;
  metadata: ProjectMetadata;
  mds: string[];
  mdref: number;
  mdNumber: number;
  mdIndex: number;
  local: string;
  node: string;
  indernalId: string;
  creationDate: string;
  analyses: Analysis[];
  files: string[];
  chains?: string[];
};

type ProjectList = {
  filteredCount: number;
  totalMdsCount: number | null;
  projects: Project[];
};

export type { Summary, Analysis, ProjectMetadata, Project, ProjectList };
