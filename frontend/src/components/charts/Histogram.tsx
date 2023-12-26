import * as d3 from "d3"; // we will need d3.js
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import './charts.css';

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 70;
const BUCKET_PADDING = 1;

type HistogramProps = {
  width: number;
  height: number;
  data: number[];
};

export const Histogram = ({ width, height, data }: HistogramProps) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    const max = Math.max(...data);
    return d3
      .scaleLinear()
      .domain([1, 700])
      .range([10, boundsWidth]);
  }, [data, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      // .thresholds(xScale.ticks(BUCKET_NUMBER));
      .thresholds([1, 6, 51, 101, 201, 301, 701])
    return bucketGenerator(data);
  }, [xScale]);

  // console.log(bucket[0], xScale.domain());

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height]);

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
  }, [xScale, yScale, boundsHeight]);


  const allRects = buckets.map((bucket, i) => {
    return (
      <Fragment key={i}> 
       <text 
          className="small" 
          x={xScale(bucket.x0) + 20}
          y={yScale(bucket.length) - 5}
        >
          {bucket.length}
        </text>
        <rect
          fill="#69b3a2"
          x={xScale(bucket.x0) + BUCKET_PADDING / 2}
          width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
          y={yScale(bucket.length)}
          height={boundsHeight - yScale(bucket.length)}
        />
      </Fragment>
    );
  });

  // const onMouseOut = function(d, i) {
  //   d3.select(this).attr('style', 'fill: steelblue;');
  //   d3.select("#toptext").text(`Metropolitan Areas: ${0}`);
  // }

  // const onMouseOver = function(d, i) {
  //   d3.select(this).attr('style', 'fill: orange;');
  //   d3.select("#toptext2").text(`Metropolitan Areas: ${i.length}`);
  // }

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