/**
 * calendar-body.component
 */
import { ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { SelectMode } from './date-time.class';
export declare class CalendarCell {
    value: number;
    displayValue: string;
    ariaLabel: string;
    enabled: boolean;
    out: boolean;
    cellClass: string;
    constructor(value: number, displayValue: string, ariaLabel: string, enabled: boolean, out?: boolean, cellClass?: string);
}
export declare class OwlCalendarBodyComponent implements OnInit {
    private elmRef;
    private ngZone;
    /**
     * The cell number of the active cell in the table.
     */
    activeCell: number;
    /**
     * The cells to display in the table.
     * */
    rows: CalendarCell[][];
    /**
     * The number of columns in the table.
     * */
    numCols: number;
    /**
     * The ratio (width / height) to use for the cells in the table.
     */
    cellRatio: number;
    /**
     * The value in the table that corresponds to today.
     * */
    todayValue: number;
    /**
     * The value in the table that is currently selected.
     * */
    selectedValues: number[];
    /**
     * Current picker select mode
     */
    selectMode: SelectMode;
    /**
     * Emit when a calendar cell is selected
     * */
    readonly select: EventEmitter<CalendarCell>;
    readonly owlDTCalendarBodyClass: boolean;
    readonly isInSingleMode: boolean;
    readonly isInRangeMode: boolean;
    constructor(elmRef: ElementRef, ngZone: NgZone);
    ngOnInit(): void;
    selectCell(cell: CalendarCell): void;
    isActiveCell(rowIndex: number, colIndex: number): boolean;
    /**
     * Check if the cell is selected
     */
    isSelected(value: number): boolean;
    /**
     * Check if the cell in the range
     * */
    isInRange(value: number): boolean;
    /**
     * Check if the cell is the range from
     * */
    isRangeFrom(value: number): boolean;
    /**
     * Check if the cell is the range to
     * */
    isRangeTo(value: number): boolean;
    /**
     * Focus to a active cell
     * */
    focusActiveCell(): void;
}
