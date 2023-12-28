import * as d3 from 'd3';
import { useEffect, useRef, useState } from "react";
import { HiveForm } from '../../../components/hive/HiveForm';
import client from "../../../api";
import { ModalDialog } from '../../../components';
import { Apiary, Hive } from '../../../models';
import { IonButton, IonIcon } from '@ionic/react';
import { pencil } from 'ionicons/icons';
import HiveImage from './HiveImage';


export type ApiaryPlanProps = {
  apiary: Apiary
}

export const ApiaryPlan = ({apiary}: ApiaryPlanProps) => {
  const ref = useRef()
  const [ selectedHive, setSelectedHive ] = useState<Hive | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [hivesColor, setHivesColor] = useState('#000000');

  let dx = 0;
  let dy = 0;

  function handleDragStart(event: MouseEvent) {
    const dragged = d3.select(this);
    const x = Number(dragged.attr('x'));
    const y = Number(dragged.attr('y'));
    dx = event.x - x;
    dy = event.y - y;
  }

  function handleDrag(event: MouseEvent) {
    d3.select(this)
        .attr('x', event.x - dx)
        .attr('y', event.y - dy);
  }

  function handleDragEnd() {
    const x = Number(d3.select(this).attr("x"));
    const y = Number(d3.select(this).attr("y"));
    const id = Number(d3.select(this).attr("hive-id"));
    const apiaryId = Number(d3.select(this).attr("apiary-id"));
    client.updateHiveCoordinates(id, apiaryId, x, y);
  }

  function handleClick() {
    const hiveId = d3.select(this).attr('hive-id');
    const selectedHive = apiary.hives.find(hive => hive.id == hiveId);
    setSelectedHive(selectedHive);
    setShowModal(true);
  }

  function registerClickable(svgElement: any) {
    svgElement.selectAll('svg').on('click', handleClick);
  }

  function unregisterClickable(svgElement: any) {
    svgElement.selectAll('svg').on('click', null);
  }

  function registerDraggable(svgElement: any) {
    svgElement.selectAll('svg').call(
      d3.drag()
      .on("start", handleDragStart)
      .on("drag", handleDrag)
      .on("end", handleDragEnd) as any
    )      
  }

  function unregisterDraggable(svgElement: any) {
    svgElement.selectAll('svg').call(
      d3.drag()
        .on('start', null)
        .on('drag', null)
        .on('end', null) as any
    )
  }

  useEffect(() => {
    const svgElement = d3.select('svg#apiary-plan');
    registerClickable(svgElement);
  }, [apiary]);

  function toggleMode() {
    const svgElement = d3.select('svg#apiary-plan');

    if (mode === 'view') {
      setMode('edit');
      setHivesColor('#ff0000');      
      unregisterClickable(svgElement);
      registerDraggable(svgElement);
    } else {
      setMode('view');
      setHivesColor('#000000');
      unregisterDraggable(svgElement);
      registerClickable(svgElement);
    } 
  }
  

  return (
    <>
      { showModal && selectedHive && 
        <ModalDialog isOpen={showModal} title={`Кошер ${selectedHive.number}`} onClose={() => setShowModal(false)}>
          {selectedHive ? <HiveForm hive={selectedHive}/> : ''}
        </ModalDialog>
      }
      
      <div>
        <IonButton color={mode === 'view' ? "dark" : "danger"} className='edit-plan' onClick={toggleMode}>
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonButton>
        
        <svg viewBox="0 0 100 50" id="apiary-plan" style={{border: '1px solid black'}}>
          {apiary.hives?.map((hive, i) => (
              <HiveImage key={i} hive={hive} fill={hivesColor} />
          ))};
        </svg>
      </div>
    </>
  )
}