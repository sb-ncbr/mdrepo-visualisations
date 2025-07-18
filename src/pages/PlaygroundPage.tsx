import distPerresMeanData from "@/assets/mocks/dist-perres-mean.json";
import hbondsData from "@/assets/mocks/hbonds.json";
import DistPerresMeanCanvas from "@/components/Analyses/DistPerresMeanCanvas";
import Hbonds from "@/components/Analyses/Hbonds";

const PlaygroundPage = () => {
  return (
    <div className="w-full p-24 space-y-8">
      <div className="h-[500px]">
        <h2 className="text-xl font-bold mb-4">Hydrogen Bonds Visualization</h2>
        <p className="text-sm text-gray-600 mb-4">
          This visualization shows hydrogen bond analysis with both frame-level
          and sub-frame data. The sub-frame data (hbonds_timed) provides
          multiple measurements within each simulation frame.
        </p>
        <Hbonds analysis="hbonds" data={hbondsData} />
      </div>

      <div className="h-[800px]">
        <h2 className="text-xl font-bold mb-4">Distance Per Residue Mean</h2>
        <DistPerresMeanCanvas
          analysis="dist-perres-mean"
          data={distPerresMeanData}
        />
      </div>
    </div>
  );
};

export default PlaygroundPage;
