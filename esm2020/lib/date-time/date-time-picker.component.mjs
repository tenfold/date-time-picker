/**
 * date-time-picker.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { OwlDialogService } from '../dialog/dialog.service';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "../dialog/dialog.service";
import * as i3 from "./adapter/date-time-adapter.class";
/** Injection token that determines the scroll handling while the dtPicker is open. */
export const OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/** @docs-private */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    const fn = () => overlay.scrollStrategies.block();
    return fn;
}
/** @docs-private */
export const OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
export class OwlDateTimeComponent extends OwlDateTime {
    constructor(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        super(dateTimeAdapter, dateTimeFormats);
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dialogService = dialogService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        this.document = document;
        /** Custom class for the picker backdrop. */
        this.backdropClass = [];
        /** Custom class for the picker overlay pane. */
        this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        this._pickerMode = 'popup';
        /** Whether the calendar is open. */
        this._opened = false;
        /**
         * Callback when the picker is closed
         * */
        this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         * */
        this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         * */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         * */
        this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         * */
        this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         * */
        this.disabledChange = new EventEmitter();
        this.dtInputSub = Subscription.EMPTY;
        this.hidePickerStreamSub = Subscription.EMPTY;
        this.confirmSelectedStreamSub = Subscription.EMPTY;
        this.pickerOpenedStreamSub = Subscription.EMPTY;
        /** The element that was focused before the date time picker was opened. */
        this.focusedElementBeforeOpen = null;
        this._selecteds = [];
        this.defaultScrollStrategy = defaultScrollStrategy;
    }
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        if (this._startAt) {
            return this._startAt;
        }
        if (this._dtInput) {
            if (this._dtInput.selectMode === 'single') {
                return this._dtInput.value || null;
            }
            else if (this._dtInput.selectMode === 'range' ||
                this._dtInput.selectMode === 'rangeFrom') {
                return this._dtInput.values[0] || null;
            }
            else if (this._dtInput.selectMode === 'rangeTo') {
                return this._dtInput.values[1] || null;
            }
        }
        else {
            return null;
        }
    }
    set startAt(date) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    }
    get pickerType() {
        return this._pickerType;
    }
    set pickerType(val) {
        if (val !== this._pickerType) {
            this._pickerType = val;
            if (this._dtInput) {
                this._dtInput.formatNativeInputValue();
            }
        }
    }
    get pickerMode() {
        return this._pickerMode;
    }
    set pickerMode(mode) {
        if (mode === 'popup') {
            this._pickerMode = mode;
        }
        else {
            this._pickerMode = 'dialog';
        }
    }
    get disabled() {
        return this._disabled === undefined && this._dtInput
            ? this._dtInput.disabled
            : !!this._disabled;
    }
    set disabled(value) {
        value = coerceBooleanProperty(value);
        if (value !== this._disabled) {
            this._disabled = value;
            this.disabledChange.next(value);
        }
    }
    get opened() {
        return this._opened;
    }
    set opened(val) {
        val ? this.open() : this.close();
    }
    get dtInput() {
        return this._dtInput;
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.changeDetector.markForCheck();
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values;
        this.changeDetector.markForCheck();
    }
    /** The minimum selectable date. */
    get minDateTime() {
        return this._dtInput && this._dtInput.min;
    }
    /** The maximum selectable date. */
    get maxDateTime() {
        return this._dtInput && this._dtInput.max;
    }
    get dateTimeFilter() {
        return this._dtInput && this._dtInput.dateTimeFilter;
    }
    get selectMode() {
        return this._dtInput.selectMode;
    }
    get isInSingleMode() {
        return this._dtInput.isInSingleMode;
    }
    get isInRangeMode() {
        return this._dtInput.isInRangeMode;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    }
    registerInput(input) {
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((value) => {
            if (Array.isArray(value)) {
                this.selecteds = value;
            }
            else {
                this.selected = value;
            }
        });
    }
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        // reset the picker selected value
        if (this.isInSingleMode) {
            this.selected = this._dtInput.value;
        }
        else if (this.isInRangeMode) {
            this.selecteds = this._dtInput.values;
        }
        // when the picker is open , we make sure the picker's current selected time value
        // is the same as the _startAt time value.
        if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe(() => {
            this.close();
        });
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((event) => {
            this.confirmSelect(event);
        });
    }
    /**
     * Selects the given date
     */
    select(date) {
        if (Array.isArray(date)) {
            this.selecteds = [...date];
        }
        else {
            this.selected = date;
        }
        /**
         * Cases in which automatically confirm the select when date or dates are selected:
         * 1) picker mode is NOT 'dialog'
         * 2) picker type is 'calendar' and selectMode is 'single'.
         * 3) picker type is 'calendar' and selectMode is 'range' and
         *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
         * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
         * 5) selectMode is 'rangeTo' and selecteds[1] has value.
         * */
        if (this.pickerMode !== 'dialog' &&
            this.pickerType === 'calendar' &&
            ((this.selectMode === 'single' && this.selected) ||
                (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                (this.selectMode === 'range' &&
                    this.selecteds[0] &&
                    this.selecteds[1]))) {
            this.confirmSelect();
        }
    }
    /**
     * Emits the selected year in multi-year view
     * */
    selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     * */
    selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Hide the picker
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal &&
            this.pickerContainerPortal.isAttached) {
            this.pickerContainerPortal.detach();
        }
        if (this.hidePickerStreamSub) {
            this.hidePickerStreamSub.unsubscribe();
            this.hidePickerStreamSub = null;
        }
        if (this.confirmSelectedStreamSub) {
            this.confirmSelectedStreamSub.unsubscribe();
            this.confirmSelectedStreamSub = null;
        }
        if (this.pickerOpenedStreamSub) {
            this.pickerOpenedStreamSub.unsubscribe();
            this.pickerOpenedStreamSub = null;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
        const completeClose = () => {
            if (this._opened) {
                this._opened = false;
                this.afterPickerClosed.emit(null);
                this.focusedElementBeforeOpen = null;
            }
        };
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Confirm the selected value
     */
    confirmSelect(event) {
        if (this.isInSingleMode) {
            const selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    }
    /**
     * Open the picker as a dialog
     */
    openAsDialog() {
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: [
                'cdk-overlay-dark-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            paneClass: ['owl-dt-dialog', ...coerceArray(this.panelClass)],
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe(() => {
            this.afterPickerOpen.emit(null);
            this._opened = true;
        });
        this.dialogRef.afterClosed().subscribe(() => this.close());
    }
    /**
     * Open the picker as popup
     */
    openAsPopup() {
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            const componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.popupRef.updatePosition();
            });
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe(() => {
                this.afterPickerOpen.emit(null);
                this._opened = true;
            });
        }
    }
    createPopup() {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: [
                'cdk-overlay-transparent-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: ['owl-dt-popup', ...coerceArray(this.panelClass)]
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE ||
            (this._dtInput &&
                event.altKey &&
                event.keyCode === UP_ARROW)))).subscribe(() => this.close());
    }
    /**
     * Create the popup PositionStrategy.
     * */
    createPopupPositionStrategy() {
        return this.overlay
            .position()
            .flexibleConnectedTo(this._dtInput.elementRef)
            .withTransformOriginOn('.owl-dt-container')
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352
            }
        ]);
    }
}
OwlDateTimeComponent.ɵfac = function OwlDateTimeComponent_Factory(t) { return new (t || OwlDateTimeComponent)(i0.ɵɵdirectiveInject(i1.Overlay), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i2.OwlDialogService), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.DateTimeAdapter, 8), i0.ɵɵdirectiveInject(OWL_DTPICKER_SCROLL_STRATEGY), i0.ɵɵdirectiveInject(OWL_DATE_TIME_FORMATS, 8), i0.ɵɵdirectiveInject(DOCUMENT, 8)); };
OwlDateTimeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OwlDateTimeComponent, selectors: [["owl-date-time"]], inputs: { backdropClass: "backdropClass", panelClass: "panelClass", startAt: "startAt", pickerType: "pickerType", pickerMode: "pickerMode", disabled: "disabled", opened: "opened", scrollStrategy: "scrollStrategy" }, outputs: { afterPickerClosed: "afterPickerClosed", afterPickerOpen: "afterPickerOpen", yearSelected: "yearSelected", monthSelected: "monthSelected" }, exportAs: ["owlDateTime"], features: [i0.ɵɵInheritDefinitionFeature], decls: 0, vars: 0, template: function OwlDateTimeComponent_Template(rf, ctx) { }, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDateTimeComponent, [{
        type: Component,
        args: [{ selector: 'owl-date-time', exportAs: 'owlDateTime', changeDetection: ChangeDetectionStrategy.OnPush, preserveWhitespaces: false, template: "" }]
    }], function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i2.OwlDialogService }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i3.DateTimeAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [OWL_DTPICKER_SCROLL_STRATEGY]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [OWL_DATE_TIME_FORMATS]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, { backdropClass: [{
            type: Input
        }], panelClass: [{
            type: Input
        }], startAt: [{
            type: Input
        }], pickerType: [{
            type: Input
        }], pickerMode: [{
            type: Input
        }], disabled: [{
            type: Input
        }], opened: [{
            type: Input
        }], scrollStrategy: [{
            type: Input
        }], afterPickerClosed: [{
            type: Output
        }], afterPickerOpen: [{
            type: Output
        }], yearSelected: [{
            type: Output
        }], monthSelected: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFFSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNILFdBQVcsRUFJZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFF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QU87Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixPQUFPLEVBQUUsQ0FBQyxHQUFHO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7d0ZBbGxCUSxvQkFBb0IseVFBaU9qQiw0QkFBNEIsd0JBRTVCLHFCQUFxQiwyQkFHckIsUUFBUTt1RUF0T1gsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FSaEMsU0FBUzsyQkFDSSxlQUFlLFlBQ2YsYUFBYSxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNLHVCQUMxQixLQUFLOztzQkFrT3JCLFFBQVE7O3NCQUNSLE1BQU07dUJBQUMsNEJBQTRCOztzQkFDbkMsUUFBUTs7c0JBQ1IsTUFBTTt1QkFBQyxxQkFBcUI7O3NCQUU1QixRQUFROztzQkFDUixNQUFNO3VCQUFDLFFBQVE7d0JBbE9iLGFBQWE7a0JBRG5CLEtBQUs7WUFLQyxVQUFVO2tCQURoQixLQUFLO1lBTUYsT0FBTztrQkFEVixLQUFLO1lBc0NGLFVBQVU7a0JBRGIsS0FBSztZQW1CRixVQUFVO2tCQURiLEtBQUs7WUFnQkYsUUFBUTtrQkFEWCxLQUFLO1lBa0JGLE1BQU07a0JBRFQsS0FBSztZQWNDLGNBQWM7a0JBRHBCLEtBQUs7WUFPTixpQkFBaUI7a0JBRGhCLE1BQU07WUFPUCxlQUFlO2tCQURkLE1BQU07WUFRUCxZQUFZO2tCQURYLE1BQU07WUFRUCxhQUFhO2tCQURaLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQmxvY2tTY3JvbGxTdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheVJlZixcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgY29lcmNlQXJyYXksIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPd2xEYXRlVGltZSxcbiAgICBQaWNrZXJNb2RlLFxuICAgIFBpY2tlclR5cGUsXG4gICAgU2VsZWN0TW9kZVxufSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dSZWYgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgZHRQaWNrZXIgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgICgpID0+IFNjcm9sbFN0cmF0ZWd5XG4+KCdvd2wtZHRwaWNrZXItc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICAgIG92ZXJsYXk6IE92ZXJsYXlcbik6ICgpID0+IEJsb2NrU2Nyb2xsU3RyYXRlZ3kge1xuICAgIGNvbnN0IGZuID0gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG4gICAgcmV0dXJuIGZuO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUnLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4gZXh0ZW5kcyBPd2xEYXRlVGltZTxUPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgYmFja2Ryb3AuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYmFja2Ryb3BDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgb3ZlcmxheSBwYW5lLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBhbmVsQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICAgIHByaXZhdGUgX3N0YXJ0QXQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xuICAgICAgICAvLyBJZiBhbiBleHBsaWNpdCBzdGFydEF0IGlzIHNldCB3ZSBzdGFydCB0aGVyZSwgb3RoZXJ3aXNlIHdlIHN0YXJ0IGF0IHdoYXRldmVyIHRoZSBjdXJyZW50bHlcbiAgICAgICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXG4gICAgICAgIGlmICh0aGlzLl9zdGFydEF0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1swXSB8fCBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1sxXSB8fCBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgc3RhcnRBdChkYXRlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShkYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdHlwZSBvZiB0aGUgZGF0ZVRpbWUgcGlja2VyXG4gICAgICogICAgICAnYm90aCcgLS0gc2hvdyBib3RoIGNhbGVuZGFyIGFuZCB0aW1lclxuICAgICAqICAgICAgJ2NhbGVuZGFyJyAtLSBzaG93IG9ubHkgY2FsZW5kYXJcbiAgICAgKiAgICAgICd0aW1lcicgLS0gc2hvdyBvbmx5IHRpbWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBfcGlja2VyVHlwZTogUGlja2VyVHlwZSA9ICdib3RoJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyVHlwZTtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyVHlwZSh2YWw6IFBpY2tlclR5cGUpIHtcbiAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fcGlja2VyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyVHlwZSA9IHZhbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBwaWNrZXIgb3BlbiBhcyBhIGRpYWxvZ1xuICAgICAqL1xuICAgIF9waWNrZXJNb2RlOiBQaWNrZXJNb2RlID0gJ3BvcHVwJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9kZTtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9kZShtb2RlOiBQaWNrZXJNb2RlKSB7XG4gICAgICAgIGlmIChtb2RlID09PSAncG9wdXAnKSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJNb2RlID0gbW9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSAnZGlhbG9nJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHRpbWUgcGlja2VyIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZHRJbnB1dFxuICAgICAgICAgICAgPyB0aGlzLl9kdElucHV0LmRpc2FibGVkXG4gICAgICAgICAgICA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gICAgfVxuXG4gICAgc2V0IG9wZW5lZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNjcm9sbCBzdHJhdGVneSB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlblxuICAgICAqIExlYXJuIG1vcmUgdGhpcyBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvb3ZlcmxheS9vdmVydmlldyNzY3JvbGwtc3RyYXRlZ2llc1xuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2Nyb2xsU3RyYXRlZ3k6IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgd2hlbiB0aGUgcGlja2VyIGlzIGNsb3NlZFxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgYWZ0ZXJQaWNrZXJDbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICBhZnRlclBpY2tlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY29uZmlybWVkXG4gICAgICogKi9cbiAgICBwdWJsaWMgY29uZmlybVNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgZGF0ZSB0aW1lIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkaXNhYmxlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgcGlja2VyQ29udGFpbmVyUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8XG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XG4gICAgPjtcbiAgICBwcml2YXRlIHBpY2tlckNvbnRhaW5lcjogT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD47XG4gICAgcHJpdmF0ZSBwb3B1cFJlZjogT3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+PjtcbiAgICBwcml2YXRlIGR0SW5wdXRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBoaWRlUGlja2VyU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgcGlja2VyT3BlbmVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBkYXRlIHRpbWUgcGlja2VyIHdhcyBvcGVuZWQuICovXG4gICAgcHJpdmF0ZSBmb2N1c2VkRWxlbWVudEJlZm9yZU9wZW46IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9kdElucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+O1xuICAgIGdldCBkdElucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgZ2V0IHNlbGVjdGVkcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBtaW5EYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWluO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQgJiYgdGhpcy5fZHRJbnB1dC5tYXg7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGVUaW1lRmlsdGVyKCk6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQuZGF0ZVRpbWVGaWx0ZXI7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnNlbGVjdE1vZGU7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5pc0luU2luZ2xlTW9kZTtcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblJhbmdlTW9kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogT3dsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBASW5qZWN0KE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICAgICAgcHJvdGVjdGVkIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKVxuICAgICAgICBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGF0ZVRpbWVBZGFwdGVyLCBkYXRlVGltZUZvcm1hdHMpO1xuICAgICAgICB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSA9IGRlZmF1bHRTY3JvbGxTdHJhdGVneTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuZHRJbnB1dFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgICdBIE93bCBEYXRlVGltZVBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2R0SW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5kdElucHV0U3ViID0gdGhpcy5fZHRJbnB1dC52YWx1ZUNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAodmFsdWU6IFRbXSB8IFQgfCBudWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2R0SW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgICdBdHRlbXB0ZWQgdG8gb3BlbiBhbiBEYXRlVGltZVBpY2tlciB3aXRoIG5vIGFzc29jaWF0ZWQgaW5wdXQuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBwaWNrZXIgc2VsZWN0ZWQgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLl9kdElucHV0LnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSB0aGlzLl9kdElucHV0LnZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuICwgd2UgbWFrZSBzdXJlIHRoZSBwaWNrZXIncyBjdXJyZW50IHNlbGVjdGVkIHRpbWUgdmFsdWVcbiAgICAgICAgLy8gaXMgdGhlIHNhbWUgYXMgdGhlIF9zdGFydEF0IHRpbWUgdmFsdWUuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIHRoaXMucGlja2VyVHlwZSAhPT0gJ2NhbGVuZGFyJyAmJiB0aGlzLl9zdGFydEF0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5zZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5fc3RhcnRBdCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLl9zdGFydEF0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMuX3N0YXJ0QXQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5waWNrZXJNb2RlID09PSAnZGlhbG9nJyA/IHRoaXMub3BlbkFzRGlhbG9nKCkgOiB0aGlzLm9wZW5Bc1BvcHVwKCk7XG5cbiAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXIucGlja2VyID0gdGhpcztcblxuICAgICAgICAvLyBMaXN0ZW4gdG8gcGlja2VyIGNvbnRhaW5lcidzIGhpZGVQaWNrZXJTdHJlYW1cbiAgICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIuaGlkZVBpY2tlclN0cmVhbS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBwaWNrZXIgY29udGFpbmVyJ3MgY29uZmlybVNlbGVjdGVkU3RyZWFtXG4gICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIuY29uZmlybVNlbGVjdGVkU3RyZWFtLnN1YnNjcmliZShcbiAgICAgICAgICAgIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdChkYXRlOiBUW10gfCBUKTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IFsuLi5kYXRlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhc2VzIGluIHdoaWNoIGF1dG9tYXRpY2FsbHkgY29uZmlybSB0aGUgc2VsZWN0IHdoZW4gZGF0ZSBvciBkYXRlcyBhcmUgc2VsZWN0ZWQ6XG4gICAgICAgICAqIDEpIHBpY2tlciBtb2RlIGlzIE5PVCAnZGlhbG9nJ1xuICAgICAgICAgKiAyKSBwaWNrZXIgdHlwZSBpcyAnY2FsZW5kYXInIGFuZCBzZWxlY3RNb2RlIGlzICdzaW5nbGUnLlxuICAgICAgICAgKiAzKSBwaWNrZXIgdHlwZSBpcyAnY2FsZW5kYXInIGFuZCBzZWxlY3RNb2RlIGlzICdyYW5nZScgYW5kXG4gICAgICAgICAqICAgIHRoZSAnc2VsZWN0ZWRzJyBoYXMgJ2Zyb20nKHNlbGVjdGVkc1swXSkgYW5kICd0bycoc2VsZWN0ZWRzWzFdKSB2YWx1ZXMuXG4gICAgICAgICAqIDQpIHNlbGVjdE1vZGUgaXMgJ3JhbmdlRnJvbScgYW5kIHNlbGVjdGVkc1swXSBoYXMgdmFsdWUuXG4gICAgICAgICAqIDUpIHNlbGVjdE1vZGUgaXMgJ3JhbmdlVG8nIGFuZCBzZWxlY3RlZHNbMV0gaGFzIHZhbHVlLlxuICAgICAgICAgKiAqL1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vZGUgIT09ICdkaWFsb2cnICYmXG4gICAgICAgICAgICB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcicgJiZcbiAgICAgICAgICAgICgodGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJyAmJiB0aGlzLnNlbGVjdGVkKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmIHRoaXMuc2VsZWN0ZWRzWzBdKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyAmJiB0aGlzLnNlbGVjdGVkc1sxXSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzBdICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzFdKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyIGluIG11bHRpLXllYXIgdmlld1xuICAgICAqICovXG4gICAgcHVibGljIHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAgICogKi9cbiAgICBwdWJsaWMgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgcGlja2VyXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9wdXBSZWYgJiYgdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwgJiZcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsLmlzQXR0YWNoZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yikge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1Yikge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpYWxvZ1JlZikge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlckNsb3NlZC5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gQmVjYXVzZSBJRSBtb3ZlcyBmb2N1cyBhc3luY2hyb25vdXNseSwgd2UgY2FuJ3QgY291bnQgb24gaXQgYmVpbmcgcmVzdG9yZWQgYmVmb3JlIHdlJ3ZlXG4gICAgICAgICAgICAvLyBtYXJrZWQgdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLiBJZiB0aGUgZXZlbnQgZmlyZXMgb3V0IG9mIHNlcXVlbmNlIGFuZCB0aGUgZWxlbWVudCB0aGF0XG4gICAgICAgICAgICAvLyB3ZSdyZSByZWZvY3VzaW5nIG9wZW5zIHRoZSBkYXRlcGlja2VyIG9uIGZvY3VzLCB0aGUgdXNlciBjb3VsZCBiZSBzdHVjayB3aXRoIG5vdCBiZWluZ1xuICAgICAgICAgICAgLy8gYWJsZSB0byBjbG9zZSB0aGUgY2FsZW5kYXIgYXQgYWxsLiBXZSB3b3JrIGFyb3VuZCBpdCBieSBtYWtpbmcgdGhlIGxvZ2ljLCB0aGF0IG1hcmtzXG4gICAgICAgICAgICAvLyB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQsIGFzeW5jIGFzIHdlbGwuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpcm0gdGhlIHNlbGVjdGVkIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGNvbmZpcm1TZWxlY3QoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkIHx8IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgYXMgYSBkaWFsb2dcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5Bc0RpYWxvZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbihcbiAgICAgICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogW1xuICAgICAgICAgICAgICAgICAgICAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICAgICAgICAgICAgICAgIC4uLmNvZXJjZUFycmF5KHRoaXMuYmFja2Ryb3BDbGFzcylcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHBhbmVDbGFzczogWydvd2wtZHQtZGlhbG9nJywgLi4uY29lcmNlQXJyYXkodGhpcy5wYW5lbENsYXNzKV0sXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXIgPSB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZTtcblxuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlck9wZW4uZW1pdChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhlIHBpY2tlciBhcyBwb3B1cFxuICAgICAqL1xuICAgIHByaXZhdGUgb3BlbkFzUG9wdXAoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxcbiAgICAgICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxuICAgICAgICAgICAgPihPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFxuICAgICAgICAgICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XG4gICAgICAgICAgICA+ID0gdGhpcy5wb3B1cFJlZi5hdHRhY2godGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwpO1xuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLlxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVwUmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgb3BlbiBzdHJlYW1cbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIucGlja2VyT3BlbmVkU3RyZWFtXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlck9wZW4uZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUG9wdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmNyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiBbXG4gICAgICAgICAgICAgICAgJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgICAgICAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IFsnb3dsLWR0LXBvcHVwJywgLi4uY29lcmNlQXJyYXkodGhpcy5wYW5lbENsYXNzKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wb3B1cFJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG5cbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKSxcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGV0YWNobWVudHMoKSxcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWZcbiAgICAgICAgICAgICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2R0SW5wdXQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS5cbiAgICAgKiAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5XG4gICAgICAgICAgICAucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZHRJbnB1dC5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm93bC1kdC1jb250YWluZXInKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFB1c2goZmFsc2UpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFk6IC0xNzZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFk6IC0zNTJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKTtcbiAgICB9XG59XG4iXX0=