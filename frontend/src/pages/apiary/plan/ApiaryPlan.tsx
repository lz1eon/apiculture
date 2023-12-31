import * as d3 from 'd3';
import { SyntheticEvent, createRef, useEffect, useRef, useState } from "react";
import { ContextMenu } from 'primereact/contextmenu';
import { HiveForm } from '../../../components/hive/HiveForm';
import client from "../../../api";
import { ModalDialog } from '../../../components';
import { Apiary, Hive } from '../../../models';
import { IonButton, IonIcon } from '@ionic/react';
import { pencil } from 'ionicons/icons';
import HiveImage from './HiveImage';
import { BaseType } from 'd3';


export type ApiaryPlanProps = {
  apiary: Apiary
}

export const ApiaryPlan = ({apiary}: ApiaryPlanProps) => {
  const [ selectedHive, setSelectedHive ] = useState<Hive | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [hivesColor, setHivesColor] = useState('#000000');
  const hiveContextMenuRef = createRef<ContextMenu>();

  const hiveSelector = 'g.hive svg';

  let dx = 0;
  let dy = 0;
  
  function handleZoom(event: any) {
    d3.selectAll('svg#apiary-plan g.hive')
      .attr('transform', event.transform);
  }

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .on('zoom', handleZoom);

  d3.selectAll<SVGSVGElement, unknown>('svg#apiary-plan').call(zoom);

  function handleDragStart(this: any, event: MouseEvent) {
    const dragged = d3.select(this);
    dragged.classed('dragged', true);

    const x = Number(dragged.attr('x'));
    const y = Number(dragged.attr('y'));
    dx = event.x - x;
    dy = event.y - y;
  }

  function handleDrag(this: any, event: MouseEvent) {
    const hiveSvg = d3.select(this);
    const groupId = `group-${hiveSvg.attr('hive-id')}`;
    const hiveTextSvg = d3.select(`svg#apiary-plan g#${groupId} text`);

    hiveSvg
      .attr('x', event.x - dx)
      .attr('y', event.y - dy);
    
    hiveTextSvg
      .attr('x', event.x - dx + 1.7)
      .attr('y', event.y - dy + 7.5);
  }

  function handleDragEnd(this: any) {
    const hiveSvg = d3.select(this);
    hiveSvg.classed('dragged', false);

    const x = Number(hiveSvg.attr("x"));
    const y = Number(hiveSvg.attr("y"));
    const id = Number(hiveSvg.attr("hive-id"));
    const apiaryId = Number(hiveSvg.attr("apiary-id"));
    client.updateHiveCoordinates(id, apiaryId, x, y);
  }

  function handleClick(this: any) {
    const hiveId = d3.select(this).attr('hive-id');
    const selectedHive = apiary.hives.find(hive => hive.id == hiveId);
    setSelectedHive(selectedHive);
    setShowModal(true);
  }
  
  function registerClickable(svgElement: any) {
    svgElement.selectAll(hiveSelector).on('click', handleClick);
  }

  function unregisterClickable(svgElement: any) {
    svgElement.selectAll(hiveSelector).on('click', null);
  }


  function registerDraggable(svgElement: any) {
    svgElement.selectAll(hiveSelector).call(
      d3.drag()
      .on("start", handleDragStart)
      .on("drag", handleDrag)
      .on("end", handleDragEnd)
    )      
  }

  function unregisterDraggable(svgElement: any) {
    svgElement.selectAll(hiveSelector).call(
      d3.drag()
        .on('start', null)
        .on('drag', null)
        .on('end', null)
    )
  }

  function onHiveContextMenu(event: SyntheticEvent) {
    const node = hiveContextMenuRef.current;
    if (node) {
      node.show(event);
    } 
    return {}; // somehow fixing typescript error
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

  const hiveContextMenuItems = [
    {label: 'Премести в', icon: pencil, items: [{label: 'Ридо'}, {label: 'Рилски манастир'}]},
    {label: 'Добави задача'},
    {separator: true},
    {label: 'Премахни'}
  ];
  
  return (
    <>
      { showModal && selectedHive && 
        <ModalDialog isOpen={showModal} title={`Кошер ${selectedHive.number}`} onClose={() => setShowModal(false)}>
          {selectedHive ? <HiveForm hive={selectedHive}/> : ''}
        </ModalDialog>
      }
      
      <ContextMenu
        model={hiveContextMenuItems}
        ref={hiveContextMenuRef}
        breakpoint="767px" 
      />

      <div>
        <IonButton color={mode === 'view' ? "dark" : "danger"} className='edit-plan' onClick={toggleMode}>
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonButton>
        
        <svg id="apiary-plan" viewBox="0 0 100 50" style={{border: '1px solid black'}}>
            {apiary.hives?.map((hive, i) => (
                  <HiveImage
                    key={i}
                    hive={hive}
                    fill={hivesColor}
                    onContextMenu={onHiveContextMenu} 
                  />
              ))};
        </svg>
      </div>
    </>
  )
}