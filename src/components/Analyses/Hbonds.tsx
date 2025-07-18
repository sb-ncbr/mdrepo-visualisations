import { type FC, useMemo } from "react";
import type { BaseAnalysisProps } from "./AnalysisContainer";
import type { HBondsData } from "@/types/analyses";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import staticData from "@/assets/mocks/hbonds.json";

interface HbondsProps extends BaseAnalysisProps {
  data: HBondsData;
}

const Hbonds: FC<HbondsProps> = () => {
  // Process time series data - using the passed data prop
  const timeSeriesData = useMemo(() => {
    const length = Math.max(
      staticData.acceptors?.length || 0,
      staticData.donors?.length || 0,
      staticData.hydrogens?.length || 0,
      staticData.hbonds?.length || 0
    );

    return Array.from({ length }, (_, index) => ({
      frame: index,
      acceptors: staticData.acceptors?.[index] || 0,
      donors: staticData.donors?.[index] || 0,
      hydrogens: staticData.hydrogens?.[index] || 0,
      hbonds: staticData.hbonds?.[index] || 0,
    }));
  }, [staticData]);

  // Process hbonds_timed data for sub-frame visualization
  const timedData = useMemo(() => {
    if (!staticData.hbonds_timed || staticData.hbonds_timed.length === 0)
      return [];

    // Take first 10 frames to avoid overcrowding
    const framesToShow = Math.min(10, staticData.hbonds_timed.length);
    const result: Array<{
      frame: number;
      timePoint: number;
      globalTime: number;
      hbonds: number;
      frameLabel: string;
    }> = [];

    for (let frameIndex = 0; frameIndex < framesToShow; frameIndex++) {
      const frameData = staticData.hbonds_timed[frameIndex];
      if (frameData) {
        frameData.forEach((value, timeIndex) => {
          result.push({
            frame: frameIndex,
            timePoint: timeIndex,
            globalTime: frameIndex * frameData.length + timeIndex,
            hbonds: value,
            frameLabel: `F${frameIndex}T${timeIndex}`,
          });
        });
      }
    }

    return result;
  }, [staticData.hbonds_timed]);

  const summaryData = useMemo(() => {
    const calculateStats = (values: number[]) => {
      if (!values || values.length === 0) return { avg: 0, min: 0, max: 0 };
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      return { avg: Math.round(avg * 100) / 100, min, max };
    };

    return [
      { name: "Acceptors", ...calculateStats(staticData.acceptors) },
      { name: "Donors", ...calculateStats(staticData.donors) },
      { name: "Hydrogens", ...calculateStats(staticData.hydrogens) },
      { name: "H-Bonds", ...calculateStats(staticData.hbonds) },
    ];
  }, [staticData]);

  const colors = {
    acceptors: "#8884d8",
    donors: "#82ca9d",
    hydrogens: "#ffc658",
    hbonds: "#ff7300",
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-shrink-0">
        {staticData.name && (
          <p className="text-sm text-gray-600">Dataset: {staticData.name}</p>
        )}
        {staticData.version && (
          <p className="text-xs text-gray-500">Version: {staticData.version}</p>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h4 className="text-md font-medium mb-2">Time Series</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="frame" />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  typeof name === "string"
                    ? name.charAt(0).toUpperCase() + name.slice(1)
                    : name,
                ]}
                labelFormatter={(label) => `Frame: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="acceptors"
                stroke={colors.acceptors}
                strokeWidth={2}
                dot={false}
                name="Acceptors"
              />
              <Line
                type="monotone"
                dataKey="donors"
                stroke={colors.donors}
                strokeWidth={2}
                dot={false}
                name="Donors"
              />
              <Line
                type="monotone"
                dataKey="hydrogens"
                stroke={colors.hydrogens}
                strokeWidth={2}
                dot={false}
                name="Hydrogens"
              />
              <Line
                type="monotone"
                dataKey="hbonds"
                stroke={colors.hbonds}
                strokeWidth={2}
                dot={false}
                name="H-Bonds"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="flex flex-col">
          <h4 className="text-md font-medium mb-2">Statistics Summary</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={summaryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name === "avg"
                    ? "Average"
                    : name === "min"
                    ? "Minimum"
                    : "Maximum",
                ]}
              />
              <Legend />
              <Bar dataKey="avg" fill="#8884d8" name="Average" />
              <Bar dataKey="min" fill="#82ca9d" name="Minimum" />
              <Bar dataKey="max" fill="#ffc658" name="Maximum" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sub-frame H-Bonds Time Series (if available) */}
      {timedData.length > 0 && (
        <div className="flex-shrink-0">
          <h4 className="text-md font-medium mb-2">
            Sub-frame H-Bonds Detail (First 10 frames)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timedData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="globalTime"
                  label={{
                    value: "Sub-frame Time Points",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "H-Bonds Count",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [value, "H-Bonds"]}
                  labelFormatter={(label) => {
                    const point = timedData.find((d) => d.globalTime === label);
                    return point
                      ? `Frame ${point.frame}, Time Point ${point.timePoint}`
                      : `Time: ${label}`;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hbonds"
                  stroke={colors.hbonds}
                  strokeWidth={1}
                  dot={{ r: 2 }}
                  name="H-Bonds"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This shows hydrogen bond counts at multiple time points within each
            simulation frame, providing sub-frame temporal resolution of H-bond
            dynamics.
          </p>
        </div>
      )}

      {staticData.hbonds_timed && staticData.hbonds_timed.length > 0 && (
        <div className="flex-shrink-0 text-xs text-gray-500">
          Additional timed data available ({staticData.hbonds_timed.length}{" "}
          frames, {staticData.hbonds_timed[0]?.length || 0} time points per
          frame)
        </div>
      )}
    </div>
  );
};

export default Hbonds;
