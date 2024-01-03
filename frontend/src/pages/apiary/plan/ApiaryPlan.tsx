import { IonButton, IonIcon } from '@ionic/react';
import * as d3 from 'd3';
import { addCircle, pencil } from 'ionicons/icons';
import { ContextMenu } from 'primereact/contextmenu';
import { SyntheticEvent, createRef, useEffect, useState } from "react";
import client from "../../../api";
import { ModalDialog } from '../../../components';
import { HiveForm } from '../../../components/hive/HiveForm';
import { Apiary, Hive, HiveModels, emptyHive } from '../../../models';
import HiveImage from './HiveImage';
import { useGeneralInfo } from '../../../hooks/useGeneralInfo';
import { MenuItem } from 'primereact/menuitem';
import { HiveSelection } from './HiveSelection';


const HIVES_DEFAULT_COLOR = '#000000';
export type ApiaryPlanProps = {
  apiary: Apiary,
  filters: {prop: string, value: number | null}[]
}

const PLAN_SELECTOR = 'svg#apiary-plan';
const HIVE_SELECTOR = 'g.hive'

export const ApiaryPlan = ({ apiary, filters }: ApiaryPlanProps) => {
  const [selectedHive, setSelectedHive] = useState<Hive | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [planMode, setPlanMode] = useState<'view' | 'edit'>('view');
  const [formOpenMode, setFormOpenMode] = useState<'view' | 'create'>('view');
  const [hivesColor, setHivesColor] = useState(HIVES_DEFAULT_COLOR);
  const hiveContextMenuRef = createRef<ContextMenu>();
  const { apiaries } = useGeneralInfo();
  const hiveSelector = 'g.hive svg';
  const [hiveContextMenuItems, setContextMenuItems] = useState<MenuItem[]>([]);

  let dx = 0;
  let dy = 0;

  function handleZoom(event: any) {
    d3.selectAll(`${PLAN_SELECTOR} ${HIVE_SELECTOR}`)
      .attr('transform', event.transform);
  }

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .on('zoom', handleZoom);

  // Zoom and pan only with Ctrl key pressed
  zoom.filter((event: any) => {
    if (planMode === 'view' && !event.ctrlKey) {
      return false;
    }
    return true
  });

  zoom.wheelDelta((event: any) => {
    // Override default function to remove multiplying zoom when Ctrl is pressed
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 1;
  });

  d3.selectAll<SVGSVGElement, unknown>(PLAN_SELECTOR)
    .call(zoom)

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

  function unregisterDoubleClick(svgElement: any) {
    svgElement.on('dblclick.zoom', null);
  }

  function onHiveContextMenu(event: SyntheticEvent) {
    const node = hiveContextMenuRef.current;
    if (node) {
      node.show(event);
    }
    return {}; // somehow fixing typescript error
  }

  function onHiveCreated(hive: Hive) {
    apiary.hives.push(hive)
    setShowModal(false);
  }

  function onHiveUpdated(hive: Hive) {
    setSelectedHive(hive);
  }

  function toggleMode() {
    const svgElement = d3.select(PLAN_SELECTOR);

    if (planMode === 'view') {
      setPlanMode('edit');
      setHivesColor('#ff0000');
      unregisterClickable(svgElement);
      registerDraggable(svgElement);
    } else {
      setPlanMode('view');
      setHivesColor(HIVES_DEFAULT_COLOR);
      unregisterDraggable(svgElement);
      registerClickable(svgElement);
    }
  }

  function addHive() {
    setSelectedHive(emptyHive(apiary));
    setShowModal(true);
  }

  function zoomToHivesBBox() {
    const svgElement = d3.select(PLAN_SELECTOR);
    svgElement.selectAll(HIVE_SELECTOR);
  }

  useEffect(() => {
    const svgElement = d3.select(PLAN_SELECTOR);
    registerClickable(svgElement);
    unregisterDoubleClick(svgElement);

    setContextMenuItems([{
      label: 'Премести в',
      icon: pencil,
      items: apiaries.map((a) => { return { label: a.name } })
    },
    { label: 'Добави задача' },
    { label: 'Сподели' },
    { separator: true },
    { label: 'Премахни' }
    ]);

    
    // zoomToHivesBBox();
  }, [apiary]);
  
  useEffect(() => {
    if (apiary.hives) {
      const hiveSelection = new HiveSelection(PLAN_SELECTOR, apiary.hives);
      hiveSelection.select(filters);
    }
  }, [apiary, filters])

  return (
    <>
      {showModal && selectedHive &&
        <ModalDialog
          isOpen={showModal}
          title={selectedHive.id ? `Кошер ${selectedHive.number}` : 'Нов кошер'}
          onClose={() => setShowModal(false)}
        >
          {selectedHive ?
            <HiveForm
              hive={selectedHive}
              openMode={selectedHive.id ? 'view' : 'create'}
              onCreateSuccess={onHiveCreated}
              onUpdateSuccess={onHiveUpdated}
            />
            :
            ''
          }
        </ModalDialog>
      }

      <ContextMenu
        model={hiveContextMenuItems}
        ref={hiveContextMenuRef}
        breakpoint="767px"
      />

      <div>
        <IonButton
          color={planMode === 'view' ? "primary" : "danger"}
          className='edit-plan-button'
          onClick={toggleMode}
        >
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonButton>

        <IonButton
          color={"primary"}
          className='add-hive-button'
          onClick={addHive}
        >
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>

        <svg
          id="apiary-plan"
          viewBox="0 0 100 50"
        >
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