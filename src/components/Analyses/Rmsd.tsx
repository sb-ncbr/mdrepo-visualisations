import { type FC, useMemo } from "react";
import type { BaseAnalysisProps } from "./AnalysisContainer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import type { RMSDData } from "@/types/analyses";

interface RmsdProps extends BaseAnalysisProps {
  data: RMSDData;
}

const Rmsd: FC<RmsdProps> = ({ data }) => {
  const chartData = data.y.rmsd.data.map((value, index) => ({
    frame: data.step * index,
    rmsd: value,
  }));

  const statistics = useMemo(() => {
    const rmsdData = data.y.rmsd.data;
    const average =
      data.y.rmsd.average ??
      rmsdData.reduce((sum, val) => sum + val, 0) / rmsdData.length;
    const stddev =
      data.y.rmsd.stddev ??
      Math.sqrt(
        rmsdData.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) /
          rmsdData.length
      );
    const min = data.y.rmsd.min ?? Math.min(...rmsdData);
    const max = data.y.rmsd.max ?? Math.max(...rmsdData);

    return {
      average: Number(average.toFixed(4)),
      stddev: Number(stddev.toFixed(4)),
      min: Number(min.toFixed(4)),
      max: Number(max.toFixed(4)),
      dataPoints: rmsdData.length,
    };
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Average
          </div>
          <div className="text-lg font-semibold text-blue-600">
            {statistics.average} Å
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Std Dev
          </div>
          <div className="text-lg font-semibold text-purple-600">
            {statistics.stddev} Å
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Minimum
          </div>
          <div className="text-lg font-semibold text-green-600">
            {statistics.min} Å
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Maximum
          </div>
          <div className="text-lg font-semibold text-red-600">
            {statistics.max} Å
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Data Points
          </div>
          <div className="text-lg font-semibold text-gray-700">
            {statistics.dataPoints}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="frame" />
            <YAxis dataKey="rmsd" />
            <Tooltip
              formatter={(value) => [Number(value).toFixed(4), "RMSD (Å)"]}
              labelFormatter={(label) => `Frame: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="rmsd"
              stroke="#8884d8"
              dot={false}
              name="RMSD"
            />
            <Brush dataKey="frame" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rmsd;
