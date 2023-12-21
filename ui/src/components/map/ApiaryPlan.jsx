import { useEffect, useRef } from "react"
import * as d3 from 'd3';
import client from "../../api";
import hiveOther from './images/hive_other.svg';
import hiveDadanBlat from './images/hive_dadan_blat.svg';
import hiveFarar from './images/hive_farar.svg';
import hiveLangstroth from './images/hive_langstroth.svg';

const typeToImage = [hiveOther, hiveDadanBlat, hiveFarar, hiveLangstroth];

export const ApiaryPlan = ({hives}) => {
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    console.log('hahaha')
    let dx = 0;
    let dy = 0;

    svgElement.selectAll('svg')
      .call(d3.drag()
      .on("start", function(event) {
        const dragged = d3.select(this);
        const x = Number(dragged.attr('x'));
        const y = Number(dragged.attr('y'));
        dx = event.x - x;
        dy = event.y - y;
      })
      .on("drag", function(event) {
        d3.select(this)
            .attr('x', event.x - dx)
            .attr('y', event.y - dy);
      })
      .on("end", function() {
        const x = d3.select(this).attr("x");
        const y = d3.select(this).attr("y");
        const id = d3.select(this).attr("id");
        const apiary_id = d3.select(this).attr("apiary_id");
        client.updateHiveCoordinates(id, apiary_id, x, y);
      })
    )
  }, [hives]);

  return (
    <>
      BEFORE
      <svg viewBox="0 0 100 50" style={{border: '1px solid black'}} ref={ref}>
        {hives?.map((hive, i) => (
          <svg id={hive.id} apiary_id={hive.apiary_id} key={i} x={hive.x} y={hive.y}>            
            <image href={typeToImage[hive.model]} height={6} width={6}/>            
            <text style={{fontSize: 1.5}} x={1.5} dy={7.5}>{hive.number}</text>
          </svg>
        ))};
      </svg>
      AFTER
    </>
  )
}