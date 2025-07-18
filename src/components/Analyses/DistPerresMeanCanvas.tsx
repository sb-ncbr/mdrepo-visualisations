import type { DistPerResMeanData } from "@/types/analyses";
import React, {
  type FC,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { BaseAnalysisProps } from "./AnalysisContainer";

interface DistPerresMeanCanvasProps extends BaseAnalysisProps {
  data: DistPerResMeanData;
}

const DistPerresMeanCanvas: FC<DistPerresMeanCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [zoomArea, setZoomArea] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
    visible: boolean;
  }>({ x: 0, y: 0, content: "", visible: false });

  // Color scale function
  const getColor = useCallback((value: number, min: number, max: number) => {
    if (isNaN(value) || value === null || value === undefined) {
      return [200, 200, 200, 255]; // Gray for missing data
    }

    const normalized = (value - min) / (max - min);

    // Blue to red color scale
    const r = Math.round(255 * normalized);
    const b = Math.round(255 * (1 - normalized));
    const g = Math.round(128 * (1 - Math.abs(normalized - 0.5) * 2));

    return [r, g, b, 255];
  }, []);

  // Aggregate matrix function
  const aggregateMatrix = useCallback(
    (
      matrix: number[][],
      binSize: number,
      xRange?: [number, number],
      yRange?: [number, number]
    ) => {
      const startX = xRange ? Math.floor(xRange[0]) : 0;
      const endX = xRange ? Math.ceil(xRange[1]) : matrix[0]?.length || 0;
      const startY = yRange ? Math.floor(yRange[0]) : 0;
      const endY = yRange ? Math.ceil(yRange[1]) : matrix.length;

      const aggregated: { value: number; count: number }[][] = [];

      for (let i = startY; i < endY; i += binSize) {
        const row: { value: number; count: number }[] = [];
        for (let j = startX; j < endX; j += binSize) {
          const values = [];
          let validCount = 0;

          // Collect values in the bin
          for (let di = 0; di < binSize && i + di < endY; di++) {
            for (let dj = 0; dj < binSize && j + dj < endX; dj++) {
              const rowIdx = i + di;
              const colIdx = j + dj;
              if (
                rowIdx < matrix.length &&
                colIdx < matrix[rowIdx].length &&
                matrix[rowIdx][colIdx] !== null &&
                matrix[rowIdx][colIdx] !== undefined &&
                !isNaN(matrix[rowIdx][colIdx])
              ) {
                values.push(matrix[rowIdx][colIdx]);
                validCount++;
              }
            }
          }

          const avgValue =
            validCount > 0
              ? values.reduce((sum, val) => sum + val, 0) / values.length
              : NaN;

          row.push({ value: avgValue, count: validCount });
        }
        aggregated.push(row);
      }

      return aggregated;
    },
    []
  );

  // Draw the heatmap
  const drawHeatmap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.y || data.y.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = data.y;

    // Determine view area and bin size
    const viewX1 = zoomArea?.x1 || 0;
    const viewY1 = zoomArea?.y1 || 0;
    const viewX2 = zoomArea?.x2 || matrix[0]?.length || 0;
    const viewY2 = zoomArea?.y2 || matrix.length;

    const zoomedSize = Math.max(viewX2 - viewX1, viewY2 - viewY1);
    let binSize = 1;
    if (zoomedSize > 100) binSize = Math.ceil(zoomedSize / 50);
    else if (zoomedSize > 50) binSize = Math.ceil(zoomedSize / 30);

    // Get aggregated data
    const xRange: [number, number] | undefined = zoomArea
      ? [viewX1, viewX2]
      : undefined;
    const yRange: [number, number] | undefined = zoomArea
      ? [viewY1, viewY2]
      : undefined;
    const aggregated = aggregateMatrix(matrix, binSize, xRange, yRange);

    // Find min/max for color scaling
    const allValues = aggregated
      .flat()
      .map((cell) => cell.value)
      .filter((v) => !isNaN(v));
    const minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
    const maxValue = allValues.length > 0 ? Math.max(...allValues) : 1;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate cell size
    const cellWidth = canvas.width / aggregated[0]?.length || 1;
    const cellHeight = canvas.height / aggregated.length;

    // Draw cells
    aggregated.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.count > 0) {
          const color = getColor(cell.value, minValue, maxValue);
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
            color[3] / 255
          })`;

          const x = j * cellWidth;
          const y = i * cellHeight;

          ctx.fillRect(x, y, cellWidth, cellHeight);

          // Draw border for individual cells
          if (binSize === 1) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, cellWidth, cellHeight);
          }
        }
      });
    });

    // Draw selection rectangle
    if (isSelecting && selectionStart && selectionEnd) {
      ctx.strokeStyle = "#0066cc";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const x = Math.min(selectionStart.x, selectionEnd.x);
      const y = Math.min(selectionStart.y, selectionEnd.y);
      const width = Math.abs(selectionEnd.x - selectionStart.x);
      const height = Math.abs(selectionEnd.y - selectionStart.y);
      ctx.strokeRect(x, y, width, height);
      ctx.setLineDash([]);
    }
  }, [
    data.y,
    zoomArea,
    isSelecting,
    selectionStart,
    selectionEnd,
    aggregateMatrix,
    getColor,
  ]);

  // Handle mouse events
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setIsSelecting(true);
    setSelectionStart({ x, y });
    setSelectionEnd({ x, y });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !data.y) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isSelecting && selectionStart) {
      setSelectionEnd({ x, y });
    } else {
      // Show tooltip
      const matrix = data.y;
      const cellWidth = canvas.width / (matrix[0]?.length || 1);
      const cellHeight = canvas.height / matrix.length;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      if (
        row >= 0 &&
        row < matrix.length &&
        col >= 0 &&
        col < matrix[0].length
      ) {
        const value = matrix[row][col];
        if (!isNaN(value)) {
          setTooltip({
            x: event.clientX,
            y: event.clientY,
            content: `Residue ${row + 1} ↔ ${col + 1}: ${value.toFixed(3)} Å`,
            visible: true,
          });
        }
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && selectionStart && selectionEnd && canvasRef.current) {
      const canvas = canvasRef.current;
      const matrix = data.y;

      const cellWidth = canvas.width / (matrix[0]?.length || 1);
      const cellHeight = canvas.height / matrix.length;

      const x1 = Math.min(selectionStart.x, selectionEnd.x) / cellWidth;
      const y1 = Math.min(selectionStart.y, selectionEnd.y) / cellHeight;
      const x2 = Math.max(selectionStart.x, selectionEnd.x) / cellWidth;
      const y2 = Math.max(selectionStart.y, selectionEnd.y) / cellHeight;

      if (Math.abs(x2 - x1) > 1 && Math.abs(y2 - y1) > 1) {
        setZoomArea({ x1, y1, x2, y2 });
      }
    }

    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
    if (isSelecting) {
      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
    }
  };

  const resetZoom = () => {
    setZoomArea(null);
  };

  // Resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width - 20, height: height - 100 });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Redraw when data or zoom changes
  useEffect(() => {
    drawHeatmap();
  }, [drawHeatmap, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col">
      {/* Controls */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {zoomArea ? (
            <span>
              Zoomed: Residues {Math.floor(zoomArea.x1)}-
              {Math.ceil(zoomArea.x2)} × {Math.floor(zoomArea.y1)}-
              {Math.ceil(zoomArea.y2)}
            </span>
          ) : (
            <span>
              Full view ({data.y?.length || 0} × {data.y?.[0]?.length || 0})
            </span>
          )}
        </div>
        {zoomArea && (
          <button
            onClick={resetZoom}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Reset Zoom
          </button>
        )}
      </div>

      {/* Instructions */}
      {!zoomArea && (
        <div className="mb-2 text-xs text-gray-500">
          Click and drag to select an area to zoom in
        </div>
      )}

      {/* Canvas */}
      <div className="relative flex-1">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="border border-gray-300 cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute bg-black text-white text-xs p-2 rounded pointer-events-none z-10"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 30,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistPerresMeanCanvas;
