import { useProjectAnalysisByName } from "@/hooks/hooks";
import type { Analysis } from "@/types/types";
import { type ComponentType, type FC } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getAnalysisDisplayName } from "@/lib/utils";
import ErrorComponent from "../ErrorComponent";
import Rmsd from "./Rmsd";
import Hbonds from "./Hbonds";

const Placeholder: FC<{ analysis: Analysis }> = ({ analysis }) => {
  return (
    <div className="h-full flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-md">
      <span className="text-muted-foreground">
        Visualization for {getAnalysisDisplayName(analysis)} is not yet
        available.
      </span>
    </div>
  );
};

const analysisToComponentMap: Record<
  Analysis,
  ComponentType<BaseAnalysisProps>
> = {
  rmsd: Rmsd,
  "dist-perres-mean": Placeholder,
  "dist-perres-stdv": Placeholder,
  "rmsd-pairwise-interface": Placeholder,
  "dist-perres": Placeholder,
  energies: Placeholder,
  hbonds: Hbonds,
  "rmsd-pairwise": Placeholder,
  fluctuation: Placeholder,
  tmscores: Placeholder,
  rgyr: Placeholder,
  rmsds: Placeholder,
  pockets: Placeholder,
  interactions: Placeholder,
  pca: Placeholder,
  "rmsd-perres": Placeholder,
  sasa: Placeholder,
};

export interface BaseAnalysisProps {
  analysis: Analysis;
  data: any;
  [key: string]: any;
}

const AnalysisComponent: FC<BaseAnalysisProps> = (props) => {
  const Component = analysisToComponentMap[props.analysis];

  return <Component {...props} />;
};

interface AnalysisContainerProps {
  projectId: string;
  analysisIdentifier: Analysis;
}

const AnalysisContainer: FC<AnalysisContainerProps> = ({
  projectId,
  analysisIdentifier,
}) => {
  const { data, error, isPending, isError } = useProjectAnalysisByName(
    projectId,
    analysisIdentifier
  );

  if (isPending)
    return (
      <LoadingSpinner
        message={`Loading ${getAnalysisDisplayName(
          analysisIdentifier
        )} data...`}
      />
    );

  if (isError) return <ErrorComponent error={error} />;

  return (
    <>
      <div className="w-full h-full">
        <AnalysisComponent analysis={analysisIdentifier} data={data} />
      </div>
    </>
  );
};

export default AnalysisContainer;
