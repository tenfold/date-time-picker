/**
 * calendar-body.component
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["owl-date-time-calendar-body", ""];
const _c1 = function (a0, a1, a2) { return { "owl-dt-calendar-cell-out": a0, "owl-dt-calendar-cell-today": a1, "owl-dt-calendar-cell-selected": a2 }; };
function OwlCalendarBodyComponent_tr_0_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 3);
    i0.ɵɵlistener("click", function OwlCalendarBodyComponent_tr_0_td_1_Template_td_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const item_r4 = restoredCtx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.selectCell(item_r4)); });
    i0.ɵɵelementStart(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const colIndex_r5 = ctx.index;
    const rowIndex_r2 = i0.ɵɵnextContext().index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("owl-dt-calendar-cell ", item_r4.cellClass, "");
    i0.ɵɵstyleProp("width", 100 / ctx_r3.numCols, "%")("padding-top", 50 * ctx_r3.cellRatio / ctx_r3.numCols, "%")("padding-bottom", 50 * ctx_r3.cellRatio / ctx_r3.numCols, "%");
    i0.ɵɵclassProp("owl-dt-calendar-cell-active", ctx_r3.isActiveCell(rowIndex_r2, colIndex_r5))("owl-dt-calendar-cell-disabled", !item_r4.enabled)("owl-dt-calendar-cell-in-range", ctx_r3.isInRange(item_r4.value))("owl-dt-calendar-cell-range-from", ctx_r3.isRangeFrom(item_r4.value))("owl-dt-calendar-cell-range-to", ctx_r3.isRangeTo(item_r4.value));
    i0.ɵɵproperty("tabindex", ctx_r3.isActiveCell(rowIndex_r2, colIndex_r5) ? 0 : -1);
    i0.ɵɵattribute("aria-label", item_r4.ariaLabel)("aria-disabled", !item_r4.enabled || null);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(24, _c1, item_r4.out, item_r4.value === ctx_r3.todayValue, ctx_r3.isSelected(item_r4.value)));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.displayValue, " ");
} }
function OwlCalendarBodyComponent_tr_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 1);
    i0.ɵɵtemplate(1, OwlCalendarBodyComponent_tr_0_td_1_Template, 3, 28, "td", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r1);
} }
export class CalendarCell {
    constructor(value, displayValue, ariaLabel, enabled, out = false, cellClass = '') {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
}
export class OwlCalendarBodyComponent {
    constructor(elmRef, ngZone) {
        this.elmRef = elmRef;
        this.ngZone = ngZone;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The number of columns in the table.
         * */
        this.numCols = 7;
        /**
         * The ratio (width / height) to use for the cells in the table.
         */
        this.cellRatio = 1;
        /**
         * Emit when a calendar cell is selected
         * */
        this.select = new EventEmitter();
    }
    get owlDTCalendarBodyClass() {
        return true;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    ngOnInit() { }
    selectCell(cell) {
        this.select.emit(cell);
    }
    isActiveCell(rowIndex, colIndex) {
        const cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    }
    /**
     * Check if the cell is selected
     */
    isSelected(value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            const toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
    }
    /**
     * Check if the cell in the range
     * */
    isInRange(value) {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            const toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
    }
    /**
     * Check if the cell is the range from
     * */
    isRangeFrom(value) {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    }
    /**
     * Check if the cell is the range to
     * */
    isRangeTo(value) {
        if (this.isInRangeMode) {
            const toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    }
    /**
     * Focus to a active cell
     * */
    focusActiveCell() {
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            });
        });
    }
}
OwlCalendarBodyComponent.ɵfac = function OwlCalendarBodyComponent_Factory(t) { return new (t || OwlCalendarBodyComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
OwlCalendarBodyComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OwlCalendarBodyComponent, selectors: [["", "owl-date-time-calendar-body", ""]], hostVars: 2, hostBindings: function OwlCalendarBodyComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("owl-dt-calendar-body", ctx.owlDTCalendarBodyClass);
    } }, inputs: { activeCell: "activeCell", rows: "rows", numCols: "numCols", cellRatio: "cellRatio", todayValue: "todayValue", selectedValues: "selectedValues", selectMode: "selectMode" }, outputs: { select: "select" }, exportAs: ["owlDateTimeCalendarBody"], attrs: _c0, decls: 1, vars: 1, consts: [["role", "row", 4, "ngFor", "ngForOf"], ["role", "row"], [3, "class", "tabindex", "owl-dt-calendar-cell-active", "owl-dt-calendar-cell-disabled", "owl-dt-calendar-cell-in-range", "owl-dt-calendar-cell-range-from", "owl-dt-calendar-cell-range-to", "width", "paddingTop", "paddingBottom", "click", 4, "ngFor", "ngForOf"], [3, "tabindex", "click"], [1, "owl-dt-calendar-cell-content", 3, "ngClass"]], template: function OwlCalendarBodyComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, OwlCalendarBodyComponent_tr_0_Template, 2, 1, "tr", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.rows);
    } }, dependencies: [i1.NgClass, i1.NgForOf], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlCalendarBodyComponent, [{
        type: Component,
        args: [{ selector: '[owl-date-time-calendar-body]', exportAs: 'owlDateTimeCalendarBody', host: {
                    '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"owl-dt-calendar-cell {{item.cellClass}}\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [style.width.%]=\"100 / numCols\"\n        [style.paddingTop.%]=\"50 * cellRatio / numCols\"\n        [style.paddingBottom.%]=\"50 * cellRatio / numCols\"\n        (click)=\"selectCell(item)\">\n        <span class=\"owl-dt-calendar-cell-content\"\n              [ngClass]=\"{\n                'owl-dt-calendar-cell-out': item.out,\n                'owl-dt-calendar-cell-today': item.value === todayValue,\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\n              }\">\n            {{item.displayValue}}\n        </span>\n    </td>\n</tr>\n" }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, { activeCell: [{
            type: Input
        }], rows: [{
            type: Input
        }], numCols: [{
            type: Input
        }], cellRatio: [{
            type: Input
        }], todayValue: [{
            type: Input
        }], selectedValues: [{
            type: Input
        }], selectMode: [{
            type: Input
        }], select: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0lDZGxDLDZCQWErQjtJQUEzQixpT0FBUyxlQUFBLDBCQUFnQixDQUFBLElBQUM7SUFDMUIsK0JBS1M7SUFDTCxZQUNKO0lBQUEsaUJBQU8sRUFBQTs7Ozs7O0lBcEJQLHlFQUErQztJQVMvQyxrREFBK0IsNERBQUEsK0RBQUE7SUFQL0IsNEZBQXNFLG1EQUFBLGtFQUFBLHNFQUFBLGtFQUFBO0lBRHRFLGlGQUFzRDtJQU10RCwrQ0FBa0MsMkNBQUE7SUFPNUIsZUFJRTtJQUpGLHlJQUlFO0lBQ0osZUFDSjtJQURJLHFEQUNKOzs7SUF0QlIsNkJBQThEO0lBQzFELDZFQXNCSztJQUNULGlCQUFLOzs7SUF2Qm9CLGVBQVE7SUFBUixnQ0FBUTs7QURnQmpDLE1BQU0sT0FBTyxZQUFZO0lBQ3JCLFlBQ1csS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQWdCLEVBQ2hCLE1BQWUsS0FBSyxFQUNwQixZQUFvQixFQUFFO1FBTHRCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQs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QUFNO2tCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjYWxlbmRhci1ib2R5LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNlbGwge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdmFsdWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgb3V0OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBjZWxsQ2xhc3M6IHN0cmluZyA9ICcnXG4gICAgKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHldJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ2FsZW5kYXJCb2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6e1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1ib2R5XSc6ICdvd2xEVENhbGVuZGFyQm9keUNsYXNzJ1xuICAgIH0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGl2ZUNlbGwgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICByb3dzOiBDYWxlbmRhckNlbGxbXVtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS5cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbnVtQ29scyA9IDc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjZWxsUmF0aW8gPSAxO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICB0b2RheVZhbHVlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZFZhbHVlczogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBpY2tlciBzZWxlY3QgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0TW9kZTogU2VsZWN0TW9kZTtcblxuICAgIC8qKlxuICAgICAqIEVtaXQgd2hlbiBhIGNhbGVuZGFyIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyQ2VsbD4oKTtcblxuICAgIGdldCBvd2xEVENhbGVuZGFyQm9keUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBzZWxlY3RDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KGNlbGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcbiAgICAgICAgcmV0dXJuIGNlbGxOdW1iZXIgPT09IHRoaXMuYWN0aXZlQ2VsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIHB1YmxpYyBpc1NlbGVjdGVkKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWVzIHx8IHRoaXMuc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGluIHRoZSByYW5nZVxuICAgICAqICovXG4gICAgcHVibGljIGlzSW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB0b1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IGZyb21WYWx1ZSAmJiB2YWx1ZSA8PSB0b1ZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSBmcm9tXG4gICAgICogKi9cbiAgICBwdWJsaWMgaXNSYW5nZUZyb20odmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gZnJvbVZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIHRvXG4gICAgICogKi9cbiAgICBwdWJsaWMgaXNSYW5nZVRvKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgdG9WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMV07XG4gICAgICAgICAgICByZXR1cm4gdG9WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRvIGEgYWN0aXZlIGNlbGxcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5vd2wtZHQtY2FsZW5kYXItY2VsbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3M7IGxldCByb3dJbmRleCA9IGluZGV4XCIgcm9sZT1cInJvd1wiPlxuICAgIDx0ZCAqbmdGb3I9XCJsZXQgaXRlbSBvZiByb3c7IGxldCBjb2xJbmRleCA9IGluZGV4XCJcbiAgICAgICAgY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItY2VsbCB7e2l0ZW0uY2VsbENsYXNzfX1cIlxuICAgICAgICBbdGFiaW5kZXhdPVwiaXNBY3RpdmVDZWxsKHJvd0luZGV4LCBjb2xJbmRleCkgPyAwIDogLTFcIlxuICAgICAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtYWN0aXZlXT1cImlzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpXCJcbiAgICAgICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxuICAgICAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtaW4tcmFuZ2VdPVwiaXNJblJhbmdlKGl0ZW0udmFsdWUpXCJcbiAgICAgICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLXJhbmdlLWZyb21dPVwiaXNSYW5nZUZyb20oaXRlbS52YWx1ZSlcIlxuICAgICAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtcmFuZ2UtdG9dPVwiaXNSYW5nZVRvKGl0ZW0udmFsdWUpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLmFyaWFMYWJlbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiIWl0ZW0uZW5hYmxlZCB8fCBudWxsXCJcbiAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiMTAwIC8gbnVtQ29sc1wiXG4gICAgICAgIFtzdHlsZS5wYWRkaW5nVG9wLiVdPVwiNTAgKiBjZWxsUmF0aW8gLyBudW1Db2xzXCJcbiAgICAgICAgW3N0eWxlLnBhZGRpbmdCb3R0b20uJV09XCI1MCAqIGNlbGxSYXRpbyAvIG51bUNvbHNcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2VsbChpdGVtKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1jZWxsLWNvbnRlbnRcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ293bC1kdC1jYWxlbmRhci1jZWxsLW91dCc6IGl0ZW0ub3V0LFxuICAgICAgICAgICAgICAgICdvd2wtZHQtY2FsZW5kYXItY2VsbC10b2RheSc6IGl0ZW0udmFsdWUgPT09IHRvZGF5VmFsdWUsXG4gICAgICAgICAgICAgICAgJ293bC1kdC1jYWxlbmRhci1jZWxsLXNlbGVjdGVkJzogaXNTZWxlY3RlZChpdGVtLnZhbHVlKVxuICAgICAgICAgICAgICB9XCI+XG4gICAgICAgICAgICB7e2l0ZW0uZGlzcGxheVZhbHVlfX1cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvdGQ+XG48L3RyPlxuIl19