import * as d3 from 'd3';
import { Hive } from "../../../models";

export class HiveSelection {
  private FULL_OPACITY: number = 1;
  private DESELECTED_OPACITY: number = 0.3;
  private selector: string;
  private svgElement: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private hives: Hive[] = [];
  private selected: Hive[] = [];
  private deselected: Hive[] = [];

  constructor(selector: string, hives: Hive[]) {
    this.selector = selector;
    this.svgElement = d3.select<SVGElement, {}>(selector);
    this.hives = hives;
    this.selected = [];
    this.deselected = [];
  }

  clear() {
    this.svgElement.selectAll('.hive').classed('selected-hive', false);
    this.svgElement.selectAll('.hive').classed('deselected-hive', false);
  }

  selectedCount() {
    return this.selected.length;
  }

  select(filters: { prop: string, value: number | boolean | null }[]) {
    let new_selected: Hive[] = [];
    const new_deselected: Hive[] = [];
    this.selected = [...this.hives];
    this.deselected = [];
    
    // this.removeDimAll();
    this.hives.forEach((hive) => {
      this.svgElement.select(`g#group-${hive.id}`).classed('selected-hive', true);
      this.svgElement.select(`g#group-${hive.id}`).classed('deselected-hive', false);
    })

    // Apply each filter to the currently selected (thus narrowing the selection)
    filters.forEach((filter) => {
      if (filter.value !== null) {      
        new_selected = [];

        this.selected.forEach((hive) => { 
          type HiveObjectKey = keyof Hive;          
          const value = hive[filter.prop as HiveObjectKey];
          
          if (filter.value == value) {
            new_selected.push(hive);
          } else {
            new_deselected.push(hive);
          }
        });

        this.selected = [...new_selected];
      }
    });
    
    this.deselected = [...new_deselected];

    this.selected.forEach((hive) => {
      this.svgElement.select(`g#group-${hive.id}`).classed('selected-hive', true);
    })

    this.deselected.forEach((hive) => {
      this.svgElement.select(`g#group-${hive.id}`).classed('deselected-hive', true);
    })
  }

  private dimDeselected() {
    this.svgElement.selectAll('.deselected-hive').attr('opacity', this.DESELECTED_OPACITY);
  }
  
  private removeDimAll() {
    this.svgElement.selectAll('.deselected-hive').attr('opacity', this.FULL_OPACITY);
    this.svgElement.selectAll('.selected-hive').attr('opacity', this.FULL_OPACITY);
  }

  private highlightSelected() {
    this.svgElement.selectAll('.selected-hive').attr('fill', 'lightblue');
  }
}