import * as d3 from 'd3';
import { useEffect, useRef, useState } from "react";
import { HiveForm } from '../../../components/hive/HiveForm';
import client from "../../../api";
import { ModalDialog } from '../../../components';
import { Apiary, Hive } from '../../../models';
import hiveDadanBlat from './images/hive_dadan_blat.svg';
import hiveFarar from './images/hive_farar.svg';
import hiveLangstroth from './images/hive_langstroth.svg';
import hiveOther from './images/hive_other.svg';

const typeToImage = [hiveOther, hiveDadanBlat, hiveFarar, hiveLangstroth];

export type ApiaryPlanProps = {
  apiary: Apiary
}

export const ApiaryPlan = ({apiary}: ApiaryPlanProps) => {
  const ref = useRef()
  const [ selectedHive, setSelectedHive ] = useState<Hive | undefined>();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const svgElement = d3.select('svg#apiary-plan');
    let dx = 0;
    let dy = 0;

    svgElement.selectAll('svg').call(d3.drag()
      .on("start", function(event: MouseEvent) {
        const dragged = d3.select(this);
        const x = Number(dragged.attr('x'));
        const y = Number(dragged.attr('y'));
        dx = event.x - x;
        dy = event.y - y;
      })
      .on("drag", function(event: MouseEvent) {
        d3.select(this)
            .attr('x', event.x - dx)
            .attr('y', event.y - dy);
      })
      .on("end", function() {
        const x = Number(d3.select(this).attr("x"));
        const y = Number(d3.select(this).attr("y"));
        const id = Number(d3.select(this).attr("id"));
        const apiaryId = Number(d3.select(this).attr("apiary_id"));
        // client.updateHiveCoordinates(id, apiaryId, x, y);
        client.updateHiveCoordinates(id, 1, x, y);
      }) as any
    )

      svgElement.selectAll('svg')
      .on('click', function() {
        console.log(this + 'has been clicked')
        const hiveId = d3.select(this).attr('id');
        const selectedHive = apiary.hives.find(hive => hive.id == hiveId);
        setSelectedHive(selectedHive);
        setShowModal(true);
      })
  }, [apiary]);

  return (
    <>
      СХЕМА
      { showModal && selectedHive && 
        <ModalDialog title={`Кошер ${selectedHive.number}`} onClose={() => setShowModal(false)}>
          {/* {selectedHive? <HiveComponent hive={selectedHive}/> : ''} */}
          {selectedHive? <HiveForm hive={selectedHive}/> : ''}
        </ModalDialog>
      }

      <svg viewBox="0 0 100 50" id="apiary-plan" style={{border: '1px solid black'}}>
        {apiary.hives?.map((hive, i) => (
          // <svg id={hive.id} apiary_id={hive.apiary_id} key={i} x={hive.x} y={hive.y}>            
          <svg id={hive.id} key={i} x={hive.x} y={hive.y}>            
            <image href={typeToImage[hive.model]} height={6} width={6}/>            
            <text style={{fontSize: 1.5}} x={1.5} dy={7.5}>{hive.number}</text>
          </svg>
        ))};
      </svg>
      AFTER
    </>
  )
}