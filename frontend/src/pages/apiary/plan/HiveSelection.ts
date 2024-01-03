import * as d3 from 'd3';
import { Hive } from "../../../models";

export class HiveSelection {
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
        this.selected = [...hives];
    }

    clear() {
        this.svgElement.selectAll('.hive').classed('selected-hive', false);
        this.svgElement.selectAll('.hive').classed('deselected-hive', false);
    }

    select(filterFn: (value: Hive, index: number, all: Hive[]) => boolean) {
        this.hives.forEach((hive, i, all) => {
            if (filterFn(hive, i, all)) {
                this.selected.push(hive);
                this.svgElement.select(`g#group-${hive.id}`).classed('selected-hive', true);
                
            } else {
                this.deselected.push(hive);
                this.svgElement.select(`g#group-${hive.id}`).classed('deselected-hive', true);
            }
        });

        this.dimDeselected();
        // this.highlightSelected();
    }

    private dimDeselected() {
        this.svgElement.selectAll('.deselected-hive').attr('opacity', this.DESELECTED_OPACITY);
    }
    
    private highlightSelected() {
        this.svgElement.selectAll('.selected-hive').attr('fill', 'lightblue');
    }
}