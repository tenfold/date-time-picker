/**
 * timer-box.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./numberedFixLen.pipe";
function OwlTimerBoxComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
export class OwlTimerBoxComponent {
    constructor() {
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
    }
    get displayValue() {
        return this.boxValue || this.value;
    }
    get owlDTTimerBoxClass() {
        return true;
    }
    ngOnInit() {
        this.inputStreamSub = this.inputStream.pipe(debounceTime(500), distinctUntilChanged()).subscribe((val) => {
            if (val) {
                const inputValue = coerceNumberProperty(val, 0);
                this.updateValueViaInput(inputValue);
            }
        });
    }
    ngOnDestroy() {
        this.inputStreamSub.unsubscribe();
    }
    upBtnClicked() {
        this.updateValue(this.value + this.step);
    }
    downBtnClicked() {
        this.updateValue(this.value - this.step);
    }
    handleInputChange(val, event) {
        const value = this.filterInt(val);
        if (!isNaN(value)) {
            if (value > this.max || value < this.min) {
                event.target.value = event.target.value.replace(event.target.value, `0${event.target.value.substring(0, event.target.value.length - 1)}`);
                return;
            }
        }
        else {
            event.target.value = event.target.value.replace(event.target.value, '');
        }
        this.inputStream.next(val);
    }
    updateValue(value) {
        this.valueChange.emit(value);
    }
    updateValueViaInput(value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    }
    filterInt(value) {
        if (/^[-+]?(\d+|Infinity)$/.test(value)) {
            return Number(value);
        }
        else {
            return NaN;
        }
    }
}
OwlTimerBoxComponent.ɵfac = function OwlTimerBoxComponent_Factory(t) { return new (t || OwlTimerBoxComponent)(); };
OwlTimerBoxComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OwlTimerBoxComponent, selectors: [["owl-date-time-timer-box"]], hostVars: 2, hostBindings: function OwlTimerBoxComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("owl-dt-timer-box", ctx.owlDTTimerBoxClass);
    } }, inputs: { showDivider: "showDivider", upBtnAriaLabel: "upBtnAriaLabel", upBtnDisabled: "upBtnDisabled", downBtnAriaLabel: "downBtnAriaLabel", downBtnDisabled: "downBtnDisabled", boxValue: "boxValue", value: "value", min: "min", max: "max", step: "step", inputLabel: "inputLabel" }, outputs: { valueChange: "valueChange", inputChange: "inputChange" }, exportAs: ["owlDateTimeTimerBox"], decls: 15, vars: 10, consts: [["class", "owl-dt-timer-divider", "aria-hidden", "true", 4, "ngIf"], ["type", "button", "tabindex", "-1", 1, "owl-dt-control-button", "owl-dt-control-arrow-button", 3, "disabled", "click"], ["tabindex", "-1", 1, "owl-dt-control-button-content"], ["xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "version", "1.1", "x", "0px", "y", "0px", "viewBox", "0 0 451.847 451.846", 0, "xml", "space", "preserve", "width", "100%", "height", "100%", 2, "enable-background", "new 0 0 451.847 451.846"], ["d", "M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z"], [1, "owl-dt-timer-content"], ["maxlength", "2", 1, "owl-dt-timer-input", 3, "value", "input"], ["valueInput", ""], [1, "owl-hidden-accessible"], ["d", "M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"], ["aria-hidden", "true", 1, "owl-dt-timer-divider"]], template: function OwlTimerBoxComponent_Template(rf, ctx) { if (rf & 1) {
        const _r2 = i0.ɵɵgetCurrentView();
        i0.ɵɵtemplate(0, OwlTimerBoxComponent_div_0_Template, 1, 0, "div", 0);
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵlistener("click", function OwlTimerBoxComponent_Template_button_click_1_listener() { return ctx.upBtnClicked(); });
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(3, "svg", 3);
        i0.ɵɵelement(4, "path", 4);
        i0.ɵɵelementEnd()()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(5, "label", 5)(6, "input", 6, 7);
        i0.ɵɵlistener("input", function OwlTimerBoxComponent_Template_input_input_6_listener($event) { i0.ɵɵrestoreView(_r2); const _r1 = i0.ɵɵreference(7); return i0.ɵɵresetView(ctx.handleInputChange(_r1.value, $event)); });
        i0.ɵɵpipe(8, "numberFixedLen");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "span", 8);
        i0.ɵɵtext(10);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "button", 1);
        i0.ɵɵlistener("click", function OwlTimerBoxComponent_Template_button_click_11_listener() { return ctx.downBtnClicked(); });
        i0.ɵɵelementStart(12, "span", 2);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(13, "svg", 3);
        i0.ɵɵelement(14, "path", 9);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.showDivider);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.upBtnDisabled);
        i0.ɵɵattribute("aria-label", ctx.upBtnAriaLabel);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("value", i0.ɵɵpipeBind2(8, 7, ctx.displayValue, 2));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.inputLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.downBtnDisabled);
        i0.ɵɵattribute("aria-label", ctx.downBtnAriaLabel);
    } }, dependencies: [i1.NgIf, i2.NumberFixedLenPipe], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlTimerBoxComponent, [{
        type: Component,
        args: [{ exportAs: 'owlDateTimeTimerBox', selector: 'owl-date-time-timer-box', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                }, template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"upBtnDisabled\"\n        [attr.aria-label]=\"upBtnAriaLabel\"\n        (click)=\"upBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\n           [value]=\"displayValue | numberFixedLen : 2\"\n           (input)=\"handleInputChange(valueInput.value, $event)\" #valueInput>\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\n</label>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"downBtnDisabled\"\n        [attr.aria-label]=\"downBtnAriaLabel\"\n        (click)=\"downBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n" }]
    }], function () { return []; }, { showDivider: [{
            type: Input
        }], upBtnAriaLabel: [{
            type: Input
        }], upBtnDisabled: [{
            type: Input
        }], downBtnAriaLabel: [{
            type: Input
        }], downBtnDisabled: [{
            type: Input
        }], boxValue: [{
            type: Input
        }], value: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], step: [{
            type: Input
        }], inputLabel: [{
            type: Input
        }], valueChange: [{
            type: Output
        }], inputChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS90aW1lci1ib3guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7SUNmcEUsMEJBQStFOztBRDZCL0UsTUFBTSxPQUFPLG9CQUFvQjtJQTRDN0I7UUExQ1MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFzQnBCLFNBQUksR0FBRyxDQUFDLENBQUM7UUFJUixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFekMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTNDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVwQyxtQkFBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFXNUMsQ0FBQztJQVRELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBS00sUUFBUTtRQUNYLElBQUksQ0FB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QUV5RTtRQUN6RSwrQkFBb0M7UUFBQSxhQUFjO1FBQUEsaUJBQU8sRUFBQTtRQUU3RCxrQ0FJbUM7UUFBM0Isa0dBQVMsb0JBQWdCLElBQUM7UUFDOUIsZ0NBQTBEO1FBRTFELG1CQUd3QztRQUh4QywrQkFHd0M7UUFDeEIsMkJBRTZHO1FBQ2pILGlCQUFNLEVBQUEsRUFBQTs7UUF2Q2hCLHNDQUFpQjtRQUdmLGVBQTBCO1FBQTFCLDRDQUEwQjtRQUMxQixnREFBa0M7UUFpQi9CLGVBQTJDO1FBQTNDLGlFQUEyQztRQUVkLGVBQWM7UUFBZCxvQ0FBYztRQUk5QyxlQUE0QjtRQUE1Qiw4Q0FBNEI7UUFDNUIsa0RBQW9DOzt1RkRDL0Isb0JBQW9CO2NBWmhDLFNBQVM7MkJBQ0kscUJBQXFCLFlBQ3JCLHlCQUF5Qix1QkFHZCxLQUFLLG1CQUNULHVCQUF1QixDQUFDLE1BQU0sUUFDekM7b0JBQ0YsMEJBQTBCLEVBQUUsb0JBQW9CO2lCQUNuRDtzQ0FLUSxXQUFXO2tCQUFuQixLQUFLO1lBRUcsY0FBYztrQkFBdEIsS0FBSztZQUVHLGFBQWE7a0JBQXJCLEtBQUs7WUFFRyxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFFRyxlQUFlO2tCQUF2QixLQUFLO1lBTUcsUUFBUTtrQkFBaEIsS0FBSztZQUVHLEtBQUs7a0JBQWIsS0FBSztZQUVHLEdBQUc7a0JBQVgsS0FBSztZQUVHLEdBQUc7a0JBQVgsS0FBSztZQUVHLElBQUk7a0JBQVosS0FBSztZQUVHLFVBQVU7a0JBQWxCLEtBQUs7WUFFSSxXQUFXO2tCQUFwQixNQUFNO1lBRUcsV0FBVztrQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZXItYm94LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZVRpbWVyQm94JyxcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXItYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZXItYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci1ib3guY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyLWJveF0nOiAnb3dsRFRUaW1lckJveENsYXNzJ1xuICAgIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBPd2xUaW1lckJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNob3dEaXZpZGVyID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYm94XG4gICAgICogSWYgaXQgaXMgbnVsbCwgdGhlIGJveCB3b3VsZCBkaXNwbGF5IFt2YWx1ZV1cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpIGJveFZhbHVlOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHN0ZXAgPSAxO1xuXG4gICAgQElucHV0KCkgaW5wdXRMYWJlbDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIHByaXZhdGUgaW5wdXRTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIGlucHV0U3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3hWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRpbWVyQm94Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbVN1YiA9IHRoaXMuaW5wdXRTdHJlYW0ucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApLnN1YnNjcmliZSgoIHZhbDogc3RyaW5nICkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVWaWFJbnB1dChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBCdG5DbGlja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWUgKyB0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRDaGFuZ2UoIHZhbDogc3RyaW5nLCBldmVudDogYW55ICk6IHZvaWQge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmZpbHRlckludCh2YWwpO1xuICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1heCB8fCB2YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgICAgICBgMCR7ZXZlbnQudGFyZ2V0LnZhbHVlLnN1YnN0cmluZygwLCBldmVudC50YXJnZXQudmFsdWUubGVuZ3RoIC0gMSl9YCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnJlcGxhY2UoZXZlbnQudGFyZ2V0LnZhbHVlLCAnJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmlucHV0U3RyZWFtLm5leHQodmFsKTtcbiAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlVmlhSW5wdXQoIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4IHx8IHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVySW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICgvXlstK10/KFxcZCt8SW5maW5pdHkpJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgfVxuICAgIH1cblxufVxuIiwiPGRpdiAqbmdJZj1cInNob3dEaXZpZGVyXCIgY2xhc3M9XCJvd2wtZHQtdGltZXItZGl2aWRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvZGl2PlxuPGJ1dHRvbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJ1cEJ0bkRpc2FibGVkXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJ1cEJ0bkFyaWFMYWJlbFwiXG4gICAgICAgIChjbGljayk9XCJ1cEJ0bkNsaWNrZWQoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDwhLS0gPGVkaXRvci1mb2xkIGRlc2M9XCJTVkcgQXJyb3cgVXBcIj4gLS0+XG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgICAgICAgICAgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCA0NTEuODQ3IDQ1MS44NDZcIlxuICAgICAgICAgICAgICAgICBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxLjg0NyA0NTEuODQ2O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTI0OC4yOTIsMTA2LjQwNmwxOTQuMjgxLDE5NC4yOWMxMi4zNjUsMTIuMzU5LDEyLjM2NSwzMi4zOTEsMCw0NC43NDRjLTEyLjM1NCwxMi4zNTQtMzIuMzkxLDEyLjM1NC00NC43NDQsMFxuICAgICAgICAgICAgICAgICAgICAgICAgTDIyNS45MjMsMTczLjUyOUw1NC4wMTgsMzQ1LjQ0Yy0xMi4zNiwxMi4zNTQtMzIuMzk1LDEyLjM1NC00NC43NDgsMGMtMTIuMzU5LTEyLjM1NC0xMi4zNTktMzIuMzkxLDAtNDQuNzVMMjAzLjU1NCwxMDYuNFxuICAgICAgICAgICAgICAgICAgICAgICAgYzYuMTgtNi4xNzQsMTQuMjcxLTkuMjU5LDIyLjM2OS05LjI1OUMyMzQuMDE4LDk3LjE0MSwyNDIuMTE1LDEwMC4yMzIsMjQ4LjI5MiwxMDYuNDA2elwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgICA8L3NwYW4+XG48L2J1dHRvbj5cbjxsYWJlbCBjbGFzcz1cIm93bC1kdC10aW1lci1jb250ZW50XCI+XG4gICAgPGlucHV0IGNsYXNzPVwib3dsLWR0LXRpbWVyLWlucHV0XCIgbWF4bGVuZ3RoPVwiMlwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5VmFsdWUgfCBudW1iZXJGaXhlZExlbiA6IDJcIlxuICAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlSW5wdXRDaGFuZ2UodmFsdWVJbnB1dC52YWx1ZSwgJGV2ZW50KVwiICN2YWx1ZUlucHV0PlxuICAgIDxzcGFuIGNsYXNzPVwib3dsLWhpZGRlbi1hY2Nlc3NpYmxlXCI+e3tpbnB1dExhYmVsfX08L3NwYW4+XG48L2xhYmVsPlxuPGJ1dHRvbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkb3duQnRuRGlzYWJsZWRcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImRvd25CdG5BcmlhTGFiZWxcIlxuICAgICAgICAoY2xpY2spPVwiZG93bkJ0bkNsaWNrZWQoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDwhLS0gPGVkaXRvci1mb2xkIGRlc2M9XCJTVkcgQXJyb3cgRG93blwiPiAtLT5cbiAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDQ1MS44NDcgNDUxLjg0NlwiXG4gICAgICAgICAgICAgICAgIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTEuODQ3IDQ1MS44NDY7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjI1LjkyMywzNTQuNzA2Yy04LjA5OCwwLTE2LjE5NS0zLjA5Mi0yMi4zNjktOS4yNjNMOS4yNywxNTEuMTU3Yy0xMi4zNTktMTIuMzU5LTEyLjM1OS0zMi4zOTcsMC00NC43NTFcbiAgICAgICAgICAgICAgICAgICAgICAgIGMxMi4zNTQtMTIuMzU0LDMyLjM4OC0xMi4zNTQsNDQuNzQ4LDBsMTcxLjkwNSwxNzEuOTE1bDE3MS45MDYtMTcxLjkwOWMxMi4zNTktMTIuMzU0LDMyLjM5MS0xMi4zNTQsNDQuNzQ0LDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGMxMi4zNjUsMTIuMzU0LDEyLjM2NSwzMi4zOTIsMCw0NC43NTFMMjQ4LjI5MiwzNDUuNDQ5QzI0Mi4xMTUsMzUxLjYyMSwyMzQuMDE4LDM1NC43MDYsMjI1LjkyMywzNTQuNzA2elwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgICA8L3NwYW4+XG48L2J1dHRvbj5cbiJdfQ==