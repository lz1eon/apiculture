import * as d3 from "d3";
import { Fragment, useEffect, useMemo, useRef } from "react";
import './charts.css';

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 70;
const BUCKET_PADDING = 1;

type HistogramProps = {
  width: number;
  height: number;
  data: number[];
  thresholds: number[];
  setComputedBins: (bins: any) => void;
};

export const Histogram = ({ width, height, data, thresholds, setComputedBins }: HistogramProps) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    const max = Math.max(...data);
    return d3
      .scaleLinear()
      .domain([1, 650])
      .range([1, boundsWidth]);
  }, [data, width, thresholds]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(thresholds)
    return bucketGenerator(data);
  }, [xScale, thresholds]);


  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height, thresholds]);

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);

    setComputedBins(buckets);
  }, [xScale, yScale, boundsHeight, thresholds]);


  const allRects = buckets.map((bucket, i) => {
    return (
      <Fragment key={i}> 
        <rect
          fill="#69b3a2"
          x={xScale(bucket.x0) + BUCKET_PADDING / 2}
          width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
          y={yScale(bucket.length)}
          height={boundsHeight - yScale(bucket.length)}
        />
       <text 
          className="small top" 
          x={xScale(bucket.x0) + 20}
          y={yScale(bucket.length) - 5}
        >
          {bucket.length}
        </text>        
      </Fragment>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  );
};