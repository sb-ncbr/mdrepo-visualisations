type RMSDData = {
  step: number;
  y: {
    rmsd: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
  };
};

type DistPerResMeanData = {
  y: number[][];
};

type DistPerResStdevData = {
  y: number[][];
};

type RMSDPairwiseInterfaceData = {
  y: number[][];
};

type DistPerResData = {
  name: string;
  means: number[][];
};

type EnergiesData = {
  name: string;
  agent1: {
    vdw: number[];
    es: number[];
    both: number[];
    ivdw: number[];
    ies: number[];
    iboth: number[];
    fvdw: number[];
    fes: number[];
    fboth: number[];
  };
  agent2: {
    vdw: number[];
    es: number[];
    both: number[];
    ivdw: number[];
    ies: number[];
    iboth: number[];
    fvdw: number[];
    fes: number[];
    fboth: number[];
  };
  varsion: string;
};

type HBondsData = {
  name: string;
  acceptors: number[];
  donors: number[];
  hydrogens: number[];
  hbonds: number[];
  version: string;
  hbonds_timed: number[][];
};

type RMSDPairwiseData = {
  name: string;
  rmsds: number[][];
  start: number;
  step: number;
};

type FluctuationData = {
  start: number;
  step: number;
  y: {
    rmsf: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
  };
};

type TMScoresData = {
  start: number;
  step: number;
  data: {
    values: number[];
    reference: string;
    group: string;
  }[];
};

type RGYRData = {
  start: number;
  step: number;
  y: {
    rgyr: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
    rgyrx: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
    rgyry: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
    rgyrz: {
      average: number;
      stddev: number;
      data: number[];
      min: number;
      max: number;
    };
  };
};

type RMSDsData = {
  start: number;
  step: number;
  data: {
    values: number[];
    reference: string;
    group: string;
  }[];
};

type PocketsData = {
  data: {
    name: string;
    volumes: number[];
    atoms: number[];
  }[];
  start: number;
  step: number;
};

type InteractionsData = {
  name: string;
  agent_1: string;
  agent_2: string;
  has_cg: boolean;
  atom_indices_1: number[];
  interface_atom_indices_1: number[];
  atom_indices_2: number[];
  interface_atom_indices_2: number[];
  strong_bonds: number[];
  version: string;
}[];

type PCAData = {
  data: {
    framestep: number;
    atoms: number[];
    eigenvalues: number[];
    projections: number[][];
  };
  version: string;
};

type RMSDPerResData = {
  step: number;
  rmsdpr: number[][];
};

type SasaData = {
  step: number;
  saspf: number[][];
};

export type {
  RMSDData,
  DistPerResMeanData,
  DistPerResStdevData,
  RMSDPairwiseInterfaceData,
  DistPerResData,
  EnergiesData,
  HBondsData,
  RMSDPairwiseData,
  FluctuationData,
  TMScoresData,
  RGYRData,
  RMSDsData,
  PocketsData,
  InteractionsData,
  PCAData,
  RMSDPerResData,
  SasaData,
};
