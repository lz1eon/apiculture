import * as d3 from 'd3';
import { Hive } from "../../../models";

export class HiveSelection {
    private DESELECTED_OPACITY: number = 0.1;
    private selector: string;
    private svgElement: d3.Selection<SVGElement, {}, HTMLElement, any>;
    private hives: Hive[] = [];
    private selected: Hive[] = [];
    private deselected: Hive[] = [];

    constructor(selector: string, hives: Hive[]) {
        this.selector = selector;
        this.svgElement = d3.select<SVGElement, {}>(selector);
        this.hives = hives;
    }

    clear() {
        this.svgElement.selectAll('.hive').classed('selected-hive', false);
        this.svgElement.selectAll('.hive').classed('deselected-hive', false);
    }

    select(filterFn: (value: Hive, index: number, all: Hive[]) => boolean) {
        this.hives.forEach((hive, i, all) => {
            console.log(hive, filterFn(hive, i, all));
            if (filterFn(hive, i, all)) {
                this.selected.push(hive);
                this.svgElement.select(`g#group-${hive.id}`).classed('selected-hive', true);
                
            } else {
                this.deselected.push(hive);
                this.svgElement.select(`g#group-${hive.id}`).classed('deselected-hive', true);
            }
        });

        console.log(this.selected, this.deselected);
        this.dimDeselected();
    }

    private dimDeselected() {
        this.svgElement.selectAll('.hive.deselected-hive').attr('opacity', this.DESELECTED_OPACITY);
    }
}