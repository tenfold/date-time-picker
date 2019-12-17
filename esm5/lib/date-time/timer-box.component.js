/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer-box.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
var OwlTimerBoxComponent = /** @class */ (function () {
    function OwlTimerBoxComponent() {
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
    }
    Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.boxValue || this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputStreamSub = this.inputStream.pipe(debounceTime(500), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                /** @type {?} */
                var inputValue = coerceNumberProperty(val, 0);
                _this.updateValueViaInput(inputValue);
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.inputStreamSub.unsubscribe();
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.upBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value + this.step);
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.downBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value - this.step);
    };
    /**
     * @param {?} val
     * @param {?} event
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.handleInputChange = /**
     * @param {?} val
     * @param {?} event
     * @return {?}
     */
    function (val, event) {
        /** @type {?} */
        var value = this.filterInt(val);
        if (!isNaN(value)) {
            if (value > this.max || value < this.min) {
                event.target.value = event.target.value.replace(event.target.value, "0" + event.target.value.substring(0, event.target.value.length - 1));
                return;
            }
        }
        else {
            event.target.value = event.target.value.replace(event.target.value, '');
        }
        this.inputStream.next(val);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueChange.emit(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValueViaInput = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.filterInt = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (/^[-+]?(\d+|Infinity)$/.test(value)) {
            return Number(value);
        }
        else {
            return NaN;
        }
    };
    OwlTimerBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeTimerBox',
                    selector: 'owl-date-time-timer-box',
                    template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"upBtnDisabled\"\n        [attr.aria-label]=\"upBtnAriaLabel\"\n        (click)=\"upBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\n           [value]=\"displayValue | numberFixedLen : 2\"\n           (input)=\"handleInputChange(valueInput.value, $event)\" #valueInput>\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\n</label>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"downBtnDisabled\"\n        [attr.aria-label]=\"downBtnAriaLabel\"\n        (click)=\"downBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlTimerBoxComponent.ctorParameters = function () { return []; };
    OwlTimerBoxComponent.propDecorators = {
        showDivider: [{ type: Input }],
        upBtnAriaLabel: [{ type: Input }],
        upBtnDisabled: [{ type: Input }],
        downBtnAriaLabel: [{ type: Input }],
        downBtnDisabled: [{ type: Input }],
        boxValue: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        inputLabel: [{ type: Input }],
        valueChange: [{ type: Output }],
        inputChange: [{ type: Output }]
    };
    return OwlTimerBoxComponent;
}());
export { OwlTimerBoxComponent };
if (false) {
    /** @type {?} */
    OwlTimerBoxComponent.prototype.showDivider;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnDisabled;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnDisabled;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     *
     * @type {?}
     */
    OwlTimerBoxComponent.prototype.boxValue;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.value;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.min;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.max;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.step;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.valueChange;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStream;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStreamSub;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRTtJQXdESTtRQTFDUyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQXNCcEIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUlSLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV6QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRXBDLG1CQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVc1QyxDQUFDO0lBVEQsc0JBQUksOENBQVk7Ozs7UUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFrQjs7OztRQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBOzs7O0lBS00sdUNBQVE7OztJQUFmO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUN2QyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLG9CQUFv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RUwsS0FBSztrQ0FFTCxLQUFLOzJCQU1MLEtBQUs7d0JBRUwsS0FBSztzQkFFTCxLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLE1BQU07OEJBRU4sTUFBTTs7SUE0RVgsMkJBQUM7Q0FBQSxBQXRIRCxJQXNIQztTQTFHWSxvQkFBb0I7OztJQUU3QiwyQ0FBNkI7O0lBRTdCLDhDQUFnQzs7SUFFaEMsNkNBQWdDOztJQUVoQyxnREFBa0M7O0lBRWxDLCtDQUFrQzs7Ozs7OztJQU1sQyx3Q0FBMEI7O0lBRTFCLHFDQUF1Qjs7SUFFdkIsbUNBQXFCOztJQUVyQixtQ0FBcUI7O0lBRXJCLG9DQUFrQjs7SUFFbEIsMENBQTRCOztJQUU1QiwyQ0FBbUQ7O0lBRW5ELDJDQUFtRDs7Ozs7SUFFbkQsMkNBQTRDOzs7OztJQUU1Qyw4Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHRpbWVyLWJveC5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVUaW1lckJveCcsXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLXRpbWVyLWJveCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZXItYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC10aW1lci1ib3hdJzogJ293bERUVGltZXJCb3hDbGFzcydcbiAgICB9XG59KVxuXG5leHBvcnQgY2xhc3MgT3dsVGltZXJCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzaG93RGl2aWRlciA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgdXBCdG5BcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHVwQnRuRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkb3duQnRuRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB3b3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGJveFxuICAgICAqIElmIGl0IGlzIG51bGwsIHRoZSBib3ggd291bGQgZGlzcGxheSBbdmFsdWVdXG4gICAgICogKi9cbiAgICBASW5wdXQoKSBib3hWYWx1ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzdGVwID0gMTtcblxuICAgIEBJbnB1dCgpIGlucHV0TGFiZWw6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBwcml2YXRlIGlucHV0U3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGdldCBkaXNwbGF5VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm94VmFsdWUgfHwgdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRUaW1lckJveENsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIgPSB0aGlzLmlucHV0U3RyZWFtLnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKS5zdWJzY3JpYmUoKCB2YWw6IHN0cmluZyApID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlVmlhSW5wdXQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0U3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLnZhbHVlICsgdGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG93bkJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUlucHV0Q2hhbmdlKCB2YWw6IHN0cmluZywgZXZlbnQ6IGFueSApOiB2b2lkIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maWx0ZXJJbnQodmFsKTtcbiAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgaWYgKHZhbHVlID4gdGhpcy5tYXggfHwgdmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICAgICAgYDAke2V2ZW50LnRhcmdldC52YWx1ZS5zdWJzdHJpbmcoMCwgZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCAtIDEpfWAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS5yZXBsYWNlKGV2ZW50LnRhcmdldC52YWx1ZSwgJycpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbnB1dFN0cmVhbS5uZXh0KHZhbCk7XG4gIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUoIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZVZpYUlucHV0KCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1heCB8fCB2YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbHRlckludCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAoL15bLStdPyhcXGQrfEluZmluaXR5KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==