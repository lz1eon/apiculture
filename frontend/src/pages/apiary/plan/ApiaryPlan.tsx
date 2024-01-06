import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import * as d3 from 'd3';
import { addCircle, contractOutline, pencil } from 'ionicons/icons';
import { ContextMenu } from 'primereact/contextmenu';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { SyntheticEvent, createRef, useContext, useEffect, useState } from "react";
import client from "../../../api";
import { ModalDialog } from '../../../components';
import { HiveForm } from '../../../components/hive/HiveForm';
import { useGeneralInfo } from '../../../hooks/useGeneralInfo';
import { Apiary, Hive, emptyHive } from '../../../models';
import HiveImage from './HiveImage';
import { HiveSelection } from './HiveSelection';
import { HiveSelectionContext } from '../../../contexts/HiveSelectionContext';

const HIVES_DEFAULT_COLOR = '#000000';
const PLAN_SELECTOR = 'svg#apiary-plan';
const HIVE_SELECTOR = 'g.hive'

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Highlight = {
  prop: string,
  colors: {
    [key: number]: string
  }
}

export type ApiaryPlanProps = {
  apiary: Apiary,
  filters: { prop: string, value: number | boolean | null }[],
  highlight: Highlight | null
}

export const ApiaryPlan = ({ apiary, filters, highlight }: ApiaryPlanProps) => {
  const [selectedHive, setSelectedHive] = useState<Hive | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [planMode, setPlanMode] = useState<'view' | 'edit'>('view');
  const [hivesColor, setHivesColor] = useState(HIVES_DEFAULT_COLOR);
  const [zoomReady, setZoomReady] = useState(false);
  const hiveContextMenuRef = createRef<ContextMenu>();
  const { apiaries } = useGeneralInfo();
  const { setSelectedHivesCount } = useContext(HiveSelectionContext);
  const hiveSelector = 'g.hive svg';
  const [hiveContextMenuItems, setContextMenuItems] = useState<MenuItem[]>([]);
  const hiveSelection = new HiveSelection(PLAN_SELECTOR, apiary.hives);

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


  let dx = 0;
  let dy = 0;

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

  function handleShareHive(event: MenuItemCommandEvent) {
    console.log(event);
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


  function extendBBox(accumulator: BoundingBox, newBBox: BoundingBox): BoundingBox {
    accumulator = {
      x: Math.min(accumulator.x, newBBox.x),
      y: Math.min(accumulator.y, newBBox.y),
      width: Math.max(accumulator.width, newBBox.x + newBBox.width),
      height: Math.max(accumulator.height, newBBox.y + newBBox.height)
    };
    return accumulator;
  }

  function zoomToHivesBBox() {
    const svgElement = d3.select(PLAN_SELECTOR);
    if (!svgElement || !svgElement.node()) {
      return
    }

    let bbox = { x: 0, y: 0, width: 0, height: 0 };

    svgElement.selectAll(HIVE_SELECTOR).each((datum, i, nodes: any) => {
      const elementBBox = nodes[i].getBBox();
      bbox = extendBBox(bbox, elementBBox);
    });

    const dx = bbox.width;
    const dy = bbox.height;
    const x = (bbox.x + bbox.width) / 2;
    const y = (bbox.y + bbox.height) / 2;

    const { width, height } = svgElement.node().viewBox.baseVal;
    const scale = Math.max(0.1, Math.min(20, 0.9 / Math.max(dx / width, dy / height)));
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    if (scale && translate) {
      svgElement.transition()
        .on('end', () => { setZoomReady(true) })
        .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
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
    { label: 'Сподели', command: handleShareHive },
    { separator: true },
    { label: 'Премахни' }
    ]);

    // setZoomReady(true)
    zoomToHivesBBox();

  }, [apiary]);


  useEffect(() => {
    hiveSelection.select(filters);
    if (highlight) hiveSelection.highlight(highlight);
    else hiveSelection.clearHighlight();  

    setSelectedHivesCount(hiveSelection.selectedCount())
  }, [apiary, filters, highlight])

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
          color={"primary"}
          className='add-hive-button'
          onClick={addHive}
        >
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>

        <IonButton
          color={planMode === 'view' ? "primary" : "danger"}
          className='edit-plan-button'
          onClick={toggleMode}
        >
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonButton>

        <IonButton
          color={"primary"}
          className='zoom-plan-button'
          onClick={zoomToHivesBBox}
        >
          <IonIcon slot="icon-only" icon={contractOutline}></IonIcon>
        </IonButton>
        <IonSpinner style={{ display: !zoomReady ? 'block' : 'none' }}></IonSpinner>
        <svg
          id="apiary-plan"
          viewBox="0 0 100 50"
          style={{ visibility: zoomReady ? 'visible' : 'hidden' }}
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