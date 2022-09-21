/**
 * calendar.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "./adapter/date-time-adapter.class";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "./calendar-multi-year-view.component";
import * as i6 from "./calendar-year-view.component";
import * as i7 from "./calendar-month-view.component";
function OwlCalendarComponent_owl_date_time_month_view_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "owl-date-time-month-view", 16);
    i0.ɵɵlistener("pickerMomentChange", function OwlCalendarComponent_owl_date_time_month_view_18_Template_owl_date_time_month_view_pickerMomentChange_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.handlePickerMomentChange($event)); })("selectedChange", function OwlCalendarComponent_owl_date_time_month_view_18_Template_owl_date_time_month_view_selectedChange_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.dateSelected($event)); })("userSelection", function OwlCalendarComponent_owl_date_time_month_view_18_Template_owl_date_time_month_view_userSelection_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.userSelected()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("pickerMoment", ctx_r0.pickerMoment)("firstDayOfWeek", ctx_r0.firstDayOfWeek)("selected", ctx_r0.selected)("selecteds", ctx_r0.selecteds)("selectMode", ctx_r0.selectMode)("minDate", ctx_r0.minDate)("maxDate", ctx_r0.maxDate)("dateFilter", ctx_r0.dateFilter)("hideOtherMonths", ctx_r0.hideOtherMonths);
} }
function OwlCalendarComponent_owl_date_time_year_view_19_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "owl-date-time-year-view", 17);
    i0.ɵɵlistener("keyboardEnter", function OwlCalendarComponent_owl_date_time_year_view_19_Template_owl_date_time_year_view_keyboardEnter_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.focusActiveCell()); })("pickerMomentChange", function OwlCalendarComponent_owl_date_time_year_view_19_Template_owl_date_time_year_view_pickerMomentChange_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.handlePickerMomentChange($event)); })("monthSelected", function OwlCalendarComponent_owl_date_time_year_view_19_Template_owl_date_time_year_view_monthSelected_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.selectMonthInYearView($event)); })("change", function OwlCalendarComponent_owl_date_time_year_view_19_Template_owl_date_time_year_view_change_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.goToDateInView($event, "month")); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("pickerMoment", ctx_r1.pickerMoment)("selected", ctx_r1.selected)("selecteds", ctx_r1.selecteds)("selectMode", ctx_r1.selectMode)("minDate", ctx_r1.minDate)("maxDate", ctx_r1.maxDate)("dateFilter", ctx_r1.dateFilter);
} }
function OwlCalendarComponent_owl_date_time_multi_year_view_20_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "owl-date-time-multi-year-view", 18);
    i0.ɵɵlistener("keyboardEnter", function OwlCalendarComponent_owl_date_time_multi_year_view_20_Template_owl_date_time_multi_year_view_keyboardEnter_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.focusActiveCell()); })("pickerMomentChange", function OwlCalendarComponent_owl_date_time_multi_year_view_20_Template_owl_date_time_multi_year_view_pickerMomentChange_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.handlePickerMomentChange($event)); })("yearSelected", function OwlCalendarComponent_owl_date_time_multi_year_view_20_Template_owl_date_time_multi_year_view_yearSelected_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.selectYearInMultiYearView($event)); })("change", function OwlCalendarComponent_owl_date_time_multi_year_view_20_Template_owl_date_time_multi_year_view_change_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.goToDateInView($event, "year")); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("pickerMoment", ctx_r2.pickerMoment)("selected", ctx_r2.selected)("selecteds", ctx_r2.selecteds)("selectMode", ctx_r2.selectMode)("minDate", ctx_r2.minDate)("maxDate", ctx_r2.maxDate)("dateFilter", ctx_r2.dateFilter);
} }
export class OwlCalendarComponent {
    constructor(elmRef, pickerIntl, ngZone, cdRef, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.ngZone = ngZone;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Set the first day of week
         */
        this.firstDayOfWeek = 0;
        this._selecteds = [];
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /** Emits when the currently picker moment changes. */
        this.pickerMomentChange = new EventEmitter();
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Emits when any date is selected. */
        this.userSelection = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         * */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         * */
        this.monthSelected = new EventEmitter();
        /**
         * Date filter for the month and year view
         */
        this.dateFilterForViews = (date) => {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
        };
        this.intlChangesSub = Subscription.EMPTY;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        this.intlChangesSub = this.pickerIntl.changes.subscribe(() => {
            this.cdRef.markForCheck();
        });
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        value = this.getValidDate(value);
        this._minDate = value
            ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
            : null;
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        value = this.getValidDate(value);
        this._maxDate = value
            ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
            : null;
    }
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment =
            this.getValidDate(value) || this.dateTimeAdapter.now();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values.map(v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        });
    }
    get periodButtonText() {
        return this.isMonthView
            ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.monthYearLabel)
            : this.dateTimeAdapter.getYearName(this.pickerMoment);
    }
    get periodButtonLabel() {
        return this.isMonthView
            ? this.pickerIntl.switchToMultiYearViewLabel
            : this.pickerIntl.switchToMonthViewLabel;
    }
    get prevButtonLabel() {
        if (this._currentView === 'month') {
            return this.pickerIntl.prevMonthLabel;
        }
        else if (this._currentView === 'year') {
            return this.pickerIntl.prevYearLabel;
        }
        else {
            return null;
        }
    }
    get nextButtonLabel() {
        if (this._currentView === 'month') {
            return this.pickerIntl.nextMonthLabel;
        }
        else if (this._currentView === 'year') {
            return this.pickerIntl.nextYearLabel;
        }
        else {
            return null;
        }
    }
    get currentView() {
        return this._currentView;
    }
    set currentView(view) {
        this._currentView = view;
        this.moveFocusOnNextTick = true;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    get showControlArrows() {
        return this._currentView !== 'multi-years';
    }
    get isMonthView() {
        return this._currentView === 'month';
    }
    /**
     * Bind class 'owl-dt-calendar' to host
     * */
    get owlDTCalendarClass() {
        return true;
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this._currentView = this.startView;
    }
    ngAfterViewChecked() {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    ngOnDestroy() {
        this.intlChangesSub.unsubscribe();
    }
    /**
     * Toggle between month view and year view
     */
    toggleViews() {
        this.currentView =
            this._currentView == 'month' ? 'multi-years' : 'month';
    }
    /**
     * Handles user clicks on the previous button.
     * */
    previousClicked() {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1);
        this.pickerMomentChange.emit(this.pickerMoment);
    }
    /**
     * Handles user clicks on the next button.
     * */
    nextClicked() {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1);
        this.pickerMomentChange.emit(this.pickerMoment);
    }
    dateSelected(date) {
        if (!this.dateFilterForViews(date)) {
            return;
        }
        this.selectedChange.emit(date);
        /*if ((this.isInSingleMode && !this.dateTimeAdapter.isSameDay(date, this.selected)) ||
            this.isInRangeMode) {
            this.selectedChange.emit(date);
        }*/
    }
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    goToDateInView(date, view) {
        this.handlePickerMomentChange(date);
        this.currentView = view;
        return;
    }
    /**
     * Change the pickerMoment value
     */
    handlePickerMomentChange(date) {
        this.pickerMoment = this.dateTimeAdapter.clampDate(date, this.minDate, this.maxDate);
        this.pickerMomentChange.emit(this.pickerMoment);
        return;
    }
    userSelected() {
        this.userSelection.emit();
    }
    /**
     * Whether the previous period button is enabled.
     */
    prevButtonEnabled() {
        return (!this.minDate || !this.isSameView(this.pickerMoment, this.minDate));
    }
    /**
     * Whether the next period button is enabled.
     */
    nextButtonEnabled() {
        return (!this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate));
    }
    /**
     * Focus to the host element
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
    selectYearInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    selectMonthInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     */
    isSameView(date1, date2) {
        if (this._currentView === 'month') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2) &&
                this.dateTimeAdapter.getMonth(date1) ===
                    this.dateTimeAdapter.getMonth(date2));
        }
        else if (this._currentView === 'year') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2));
        }
        else {
            return false;
        }
    }
    /**
     * Get a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
OwlCalendarComponent.ɵfac = function OwlCalendarComponent_Factory(t) { return new (t || OwlCalendarComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.OwlDateTimeIntl), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.DateTimeAdapter, 8), i0.ɵɵdirectiveInject(OWL_DATE_TIME_FORMATS, 8)); };
OwlCalendarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OwlCalendarComponent, selectors: [["owl-date-time-calendar"]], hostVars: 2, hostBindings: function OwlCalendarComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("owl-dt-calendar", ctx.owlDTCalendarClass);
    } }, inputs: { dateFilter: "dateFilter", firstDayOfWeek: "firstDayOfWeek", minDate: "minDate", maxDate: "maxDate", pickerMoment: "pickerMoment", selectMode: "selectMode", selected: "selected", selecteds: "selecteds", startView: "startView", hideOtherMonths: "hideOtherMonths" }, outputs: { pickerMomentChange: "pickerMomentChange", selectedChange: "selectedChange", userSelection: "userSelection", yearSelected: "yearSelected", monthSelected: "monthSelected" }, exportAs: ["owlDateTimeCalendar"], decls: 21, vars: 16, consts: [[1, "owl-dt-calendar-control"], ["type", "button", "tabindex", "0", 1, "owl-dt-control", "owl-dt-control-button", "owl-dt-control-arrow-button", 3, "disabled", "click"], ["tabindex", "-1", 1, "owl-dt-control-content", "owl-dt-control-button-content"], ["xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "version", "1.1", "x", "0px", "y", "0px", "viewBox", "0 0 250.738 250.738", 0, "xml", "space", "preserve", "width", "100%", "height", "100%", 2, "enable-background", "new 0 0 250.738 250.738"], ["d", "M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z", 2, "fill-rule", "evenodd", "clip-rule", "evenodd"], [1, "owl-dt-calendar-control-content"], ["type", "button", "tabindex", "0", 1, "owl-dt-control", "owl-dt-control-button", "owl-dt-control-period-button", 3, "click"], [1, "owl-dt-control-button-arrow"], ["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "50%", "height", "50%", "viewBox", "0 0 292.362 292.362", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 292.362 292.362"], ["d", "M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"], ["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 250.738 250.738", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 250.738 250.738"], ["d", "M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z", 2, "fill-rule", "evenodd", "clip-rule", "evenodd"], ["cdkMonitorSubtreeFocus", "", "tabindex", "-1", 1, "owl-dt-calendar-main", 3, "ngSwitch"], [3, "pickerMoment", "firstDayOfWeek", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "hideOtherMonths", "pickerMomentChange", "selectedChange", "userSelection", 4, "ngSwitchCase"], [3, "pickerMoment", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "keyboardEnter", "pickerMomentChange", "monthSelected", "change", 4, "ngSwitchCase"], [3, "pickerMoment", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "keyboardEnter", "pickerMomentChange", "yearSelected", "change", 4, "ngSwitchCase"], [3, "pickerMoment", "firstDayOfWeek", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "hideOtherMonths", "pickerMomentChange", "selectedChange", "userSelection"], [3, "pickerMoment", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "keyboardEnter", "pickerMomentChange", "monthSelected", "change"], [3, "pickerMoment", "selected", "selecteds", "selectMode", "minDate", "maxDate", "dateFilter", "keyboardEnter", "pickerMomentChange", "yearSelected", "change"]], template: function OwlCalendarComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
        i0.ɵɵlistener("click", function OwlCalendarComponent_Template_button_click_1_listener() { return ctx.previousClicked(); });
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(3, "svg", 3);
        i0.ɵɵelement(4, "path", 4);
        i0.ɵɵelementEnd()()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(5, "div", 5)(6, "button", 6);
        i0.ɵɵlistener("click", function OwlCalendarComponent_Template_button_click_6_listener() { return ctx.toggleViews(); });
        i0.ɵɵelementStart(7, "span", 2);
        i0.ɵɵtext(8);
        i0.ɵɵelementStart(9, "span", 7);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(10, "svg", 8)(11, "g");
        i0.ɵɵelement(12, "path", 9);
        i0.ɵɵelementEnd()()()()()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(13, "button", 1);
        i0.ɵɵlistener("click", function OwlCalendarComponent_Template_button_click_13_listener() { return ctx.nextClicked(); });
        i0.ɵɵelementStart(14, "span", 2);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(15, "svg", 10);
        i0.ɵɵelement(16, "path", 11);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(17, "div", 12);
        i0.ɵɵtemplate(18, OwlCalendarComponent_owl_date_time_month_view_18_Template, 1, 9, "owl-date-time-month-view", 13);
        i0.ɵɵtemplate(19, OwlCalendarComponent_owl_date_time_year_view_19_Template, 1, 7, "owl-date-time-year-view", 14);
        i0.ɵɵtemplate(20, OwlCalendarComponent_owl_date_time_multi_year_view_20_Template, 1, 7, "owl-date-time-multi-year-view", 15);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("visibility", ctx.showControlArrows ? "visible" : "hidden");
        i0.ɵɵproperty("disabled", !ctx.prevButtonEnabled());
        i0.ɵɵattribute("aria-label", ctx.prevButtonLabel);
        i0.ɵɵadvance(5);
        i0.ɵɵattribute("aria-label", ctx.periodButtonLabel);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.periodButtonText, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("transform", "rotate(" + (ctx.isMonthView ? 0 : 180) + "deg)");
        i0.ɵɵadvance(4);
        i0.ɵɵstyleProp("visibility", ctx.showControlArrows ? "visible" : "hidden");
        i0.ɵɵproperty("disabled", !ctx.nextButtonEnabled());
        i0.ɵɵattribute("aria-label", ctx.nextButtonLabel);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngSwitch", ctx.currentView);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "month");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "year");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "multi-years");
    } }, dependencies: [i3.NgSwitch, i3.NgSwitchCase, i4.CdkMonitorFocus, i5.OwlMultiYearViewComponent, i6.OwlYearViewComponent, i7.OwlMonthViewComponent], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlCalendarComponent, [{
        type: Component,
        args: [{ selector: 'owl-date-time-calendar', exportAs: 'owlDateTimeCalendar', host: {
                    '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"owl-dt-calendar-control\">\n    <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n            type=\"button\" tabindex=\"0\"\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\n            [disabled]=\"!prevButtonEnabled()\"\n            [attr.aria-label]=\"prevButtonLabel\"\n            (click)=\"previousClicked()\">\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n            <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 250.738 250.738\"\n                 style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                <path style=\"fill-rule: evenodd; clip-rule: evenodd;\" d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"/>\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n    <div class=\"owl-dt-calendar-control-content\">\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\n                type=\"button\" tabindex=\"0\"\n                [attr.aria-label]=\"periodButtonLabel\"\n                (click)=\"toggleViews()\">\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n                {{periodButtonText}}\n\n                <span class=\"owl-dt-control-button-arrow\"\n                      [style.transform]=\"'rotate(' + (isMonthView? 0 : 180) +'deg)'\">\n                    <!-- <editor-fold desc=\"SVG Arrow\"> -->\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                         width=\"50%\" height=\"50%\" viewBox=\"0 0 292.362 292.362\" style=\"enable-background:new 0 0 292.362 292.362;\"\n                         xml:space=\"preserve\">\n                        <g>\n                            <path d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"/>\n                        </g>\n                    </svg>\n                    <!-- </editor-fold> -->\n                </span>\n            </span>\n        </button>\n    </div>\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n            type=\"button\" tabindex=\"0\"\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\n            [disabled]=\"!nextButtonEnabled()\"\n            [attr.aria-label]=\"nextButtonLabel\"\n            (click)=\"nextClicked()\">\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n            <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 250.738 250.738\" style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\">\n                <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"/>\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n</div>\n<div class=\"owl-dt-calendar-main\" cdkMonitorSubtreeFocus [ngSwitch]=\"currentView\" tabindex=\"-1\">\n    <owl-date-time-month-view\n            *ngSwitchCase=\"'month'\"\n            [pickerMoment]=\"pickerMoment\"\n            [firstDayOfWeek]=\"firstDayOfWeek\"\n            [selected]=\"selected\"\n            [selecteds]=\"selecteds\"\n            [selectMode]=\"selectMode\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            [dateFilter]=\"dateFilter\"\n            [hideOtherMonths]=\"hideOtherMonths\"\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n            (selectedChange)=\"dateSelected($event)\"\n            (userSelection)=\"userSelected()\"></owl-date-time-month-view>\n\n    <owl-date-time-year-view\n            *ngSwitchCase=\"'year'\"\n            [pickerMoment]=\"pickerMoment\"\n            [selected]=\"selected\"\n            [selecteds]=\"selecteds\"\n            [selectMode]=\"selectMode\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            [dateFilter]=\"dateFilter\"\n            (keyboardEnter)=\"focusActiveCell()\"\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n            (monthSelected)=\"selectMonthInYearView($event)\"\n            (change)=\"goToDateInView($event, 'month')\"></owl-date-time-year-view>\n\n    <owl-date-time-multi-year-view\n            *ngSwitchCase=\"'multi-years'\"\n            [pickerMoment]=\"pickerMoment\"\n            [selected]=\"selected\"\n            [selecteds]=\"selecteds\"\n            [selectMode]=\"selectMode\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            [dateFilter]=\"dateFilter\"\n            (keyboardEnter)=\"focusActiveCell()\"\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n            (yearSelected)=\"selectYearInMultiYearView($event)\"\n            (change)=\"goToDateInView($event, 'year')\"></owl-date-time-multi-year-view>\n</div>\n" }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.OwlDateTimeIntl }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.DateTimeAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [OWL_DATE_TIME_FORMATS]
            }] }]; }, { dateFilter: [{
            type: Input
        }], firstDayOfWeek: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], pickerMoment: [{
            type: Input
        }], selectMode: [{
            type: Input
        }], selected: [{
            type: Input
        }], selecteds: [{
            type: Input
        }], startView: [{
            type: Input
        }], hideOtherMonths: [{
            type: Input
        }], pickerMomentChange: [{
            type: Output
        }], selectedChange: [{
            type: Output
        }], userSelection: [{
            type: Output
        }], yearSelected: [{
            type: Output
        }], monthSelected: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9jYWxlbmRhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFFMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7O0lDb0NoQyxvREFheUM7SUFGakMseU9BQXNCLGVBQUEsdUNBQWdDLENBQUEsSUFBQyxvTkFDckMsZUFBQSwyQkFBb0IsQ0FBQSxJQURpQiw0TUFFdEMsZUFBQSxxQkFBYyxDQUFBLElBRndCO0lBRXRCLGlCQUEyQjs7O0lBWDVELGtEQUE2Qix5Q0FBQSw2QkFBQSwrQkFBQSxpQ0FBQSwyQkFBQSwyQkFBQSxpQ0FBQSwyQ0FBQTs7OztJQWFyQyxtREFZbUQ7SUFIM0MsdU5BQWlCLGVBQUEsd0JBQWlCLENBQUEsSUFBQywwTkFDYixlQUFBLHVDQUFnQyxDQUFBLElBRG5CLGlOQUVsQixlQUFBLHFDQUE2QixD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LFlBQVk7a0JBRHBCLE1BQU07WUFPRSxhQUFhO2tCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjYWxlbmRhci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtY2FsZW5kYXInLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDYWxlbmRhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXJdJzogJ293bERUQ2FsZW5kYXJDbGFzcydcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bENhbGVuZGFyQ29tcG9uZW50PFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCBhbmQgeWVhciB2aWV3XG4gICAgICogKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGVGaWx0ZXI6IEZ1bmN0aW9uO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlyc3REYXlPZldlZWsgPSAwO1xuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9taW5EYXRlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLl9taW5EYXRlID0gdmFsdWVcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh2YWx1ZSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4RGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodmFsdWUpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudCAqL1xuICAgIHByaXZhdGUgX3BpY2tlck1vbWVudDogVDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdE1vZGU6IFNlbGVjdE1vZGU7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtb21lbnQuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnID0gJ21vbnRoJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlkZU90aGVyTW9udGhzOiBib29sZWFuO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBwaWNrZXIgbW9tZW50IGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcGlja2VyTW9tZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICB1c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIG1vbnRoLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBnZXQgcGVyaW9kQnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc01vbnRoVmlld1xuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLm1vbnRoWWVhckxhYmVsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIGdldCBwZXJpb2RCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc01vbnRoVmlld1xuICAgICAgICAgICAgPyB0aGlzLnBpY2tlckludGwuc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5waWNrZXJJbnRsLnN3aXRjaFRvTW9udGhWaWV3TGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucHJldk1vbnRoTGFiZWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2WWVhckxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbmV4dEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5uZXh0TW9udGhMYWJlbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLm5leHRZZWFyTGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2N1cnJlbnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJztcbiAgICBnZXQgY3VycmVudFZpZXcoKTogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycycge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXc7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRWaWV3KHZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaG93Q29udHJvbEFycm93cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ICE9PSAnbXVsdGkteWVhcnMnO1xuICAgIH1cblxuICAgIGdldCBpc01vbnRoVmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERhdGUgZmlsdGVyIGZvciB0aGUgbW9udGggYW5kIHllYXIgdmlld1xuICAgICAqL1xuICAgIHB1YmxpYyBkYXRlRmlsdGVyRm9yVmlld3MgPSAoZGF0ZTogVCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgISFkYXRlICYmXG4gICAgICAgICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpICYmXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQmluZCBjbGFzcyAnb3dsLWR0LWNhbGVuZGFyJyB0byBob3N0XG4gICAgICogKi9cbiAgICBnZXQgb3dsRFRDYWxlbmRhckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGludGxDaGFuZ2VzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3Igc2NoZWR1bGluZyB0aGF0IGZvY3VzIHNob3VsZCBiZSBtb3ZlZCB0byB0aGUgYWN0aXZlIGNlbGwgb24gdGhlIG5leHQgdGljay5cbiAgICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcbiAgICAgKiBmb3IgQW5ndWxhciB0byByZS1ldmFsdWF0ZSB0aGUgdmlldyBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICAgICAgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge1xuICAgICAgICB0aGlzLmludGxDaGFuZ2VzU3ViID0gdGhpcy5waWNrZXJJbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3O1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVGb2N1c09uTmV4dFRpY2spIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIG1vbnRoIHZpZXcgYW5kIHllYXIgdmlld1xuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaWV3cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9PSAnbW9udGgnID8gJ211bHRpLXllYXJzJyA6ICdtb250aCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLlxuICAgICAqICovXG4gICAgcHVibGljIHByZXZpb3VzQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmlzTW9udGhWaWV3XG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMucGlja2VyTW9tZW50LCAtMSlcbiAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgLTEpO1xuXG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIG5leHQgYnV0dG9uLlxuICAgICAqICovXG4gICAgcHVibGljIG5leHRDbGlja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuaXNNb250aFZpZXdcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIDEpXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIDEpO1xuXG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkYXRlU2VsZWN0ZWQoZGF0ZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlckZvclZpZXdzKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XG5cbiAgICAgICAgLyppZiAoKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShkYXRlLCB0aGlzLnNlbGVjdGVkKSkgfHxcbiAgICAgICAgICAgIHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgICB9Ki9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdGhlIHBpY2tlck1vbWVudCB2YWx1ZSBhbmQgc3dpdGNoIHRvIGEgc3BlY2lmaWMgdmlld1xuICAgICAqL1xuICAgIHB1YmxpYyBnb1RvRGF0ZUluVmlldyhcbiAgICAgICAgZGF0ZTogVCxcbiAgICAgICAgdmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycydcbiAgICApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQaWNrZXJNb21lbnRDaGFuZ2UoZGF0ZSk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3O1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBwaWNrZXJNb21lbnQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlUGlja2VyTW9tZW50Q2hhbmdlKGRhdGU6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgdGhpcy5taW5EYXRlLFxuICAgICAgICAgICAgdGhpcy5tYXhEYXRlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHVibGljIHVzZXJTZWxlY3RlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgcHVibGljIHByZXZCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5pc1NhbWVWaWV3KHRoaXMucGlja2VyTW9tZW50LCB0aGlzLm1pbkRhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgcHVibGljIG5leHRCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWF4RGF0ZSB8fCAhdGhpcy5pc1NhbWVWaWV3KHRoaXMucGlja2VyTW9tZW50LCB0aGlzLm1heERhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgICAqICovXG4gICAgcHVibGljIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFllYXJJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdE1vbnRoSW5ZZWFyVmlldyhub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzU2FtZVZpZXcoZGF0ZTE6IFQsIGRhdGUyOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgcmV0dXJuICEhKFxuICAgICAgICAgICAgICAgIGRhdGUxICYmXG4gICAgICAgICAgICAgICAgZGF0ZTIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlMSkgPT09XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICAgICAgZGF0ZTEgJiZcbiAgICAgICAgICAgICAgICBkYXRlMiAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1jb250cm9sXCI+XG4gICAgPCEtLSBmb2N1cyB3aGVuIGtleWJvYXJkIHRhYiAoaHR0cDovL2tpenUucnUvZW4vYmxvZy9rZXlib2FyZC1vbmx5LWZvY3VzLyN4KSAtLT5cbiAgICA8YnV0dG9uIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRyb2wtYnV0dG9uIG93bC1kdC1jb250cm9sLWFycm93LWJ1dHRvblwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIFtzdHlsZS52aXNpYmlsaXR5XT1cInNob3dDb250cm9sQXJyb3dzPyAndmlzaWJsZSc6ICdoaWRkZW4nXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhcHJldkJ1dHRvbkVuYWJsZWQoKVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInByZXZCdXR0b25MYWJlbFwiXG4gICAgICAgICAgICAoY2xpY2spPVwicHJldmlvdXNDbGlja2VkKClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1jb250ZW50IG93bC1kdC1jb250cm9sLWJ1dHRvbi1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgPCEtLSA8ZWRpdG9yLWZvbGQgZGVzYz1cIlNWRyBBcnJvdyBMZWZ0XCI+IC0tPlxuICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDI1MC43MzggMjUwLjczOFwiXG4gICAgICAgICAgICAgICAgIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAuNzM4IDI1MC43Mzg7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6IGV2ZW5vZGQ7IGNsaXAtcnVsZTogZXZlbm9kZDtcIiBkPVwiTTk2LjYzMywxMjUuMzY5bDk1LjA1My05NC41MzNjNy4xMDEtNy4wNTUsNy4xMDEtMTguNDkyLDAtMjUuNTQ2ICAgYy03LjEtNy4wNTQtMTguNjEzLTcuMDU0LTI1LjcxNCwwTDU4Ljk4OSwxMTEuNjg5Yy0zLjc4NCwzLjc1OS01LjQ4Nyw4Ljc1OS01LjIzOCwxMy42OGMtMC4yNDksNC45MjIsMS40NTQsOS45MjEsNS4yMzgsMTMuNjgxICAgbDEwNi45ODMsMTA2LjM5OGM3LjEwMSw3LjA1NSwxOC42MTMsNy4wNTUsMjUuNzE0LDBjNy4xMDEtNy4wNTQsNy4xMDEtMTguNDkxLDAtMjUuNTQ0TDk2LjYzMywxMjUuMzY5elwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItY29udHJvbC1jb250ZW50XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJvd2wtZHQtY29udHJvbCBvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LWNvbnRyb2wtcGVyaW9kLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJwZXJpb2RCdXR0b25MYWJlbFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVZpZXdzKClcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAgICAgICAgICB7e3BlcmlvZEJ1dHRvblRleHR9fVxuXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tYXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwiJ3JvdGF0ZSgnICsgKGlzTW9udGhWaWV3PyAwIDogMTgwKSArJ2RlZyknXCI+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gPGVkaXRvci1mb2xkIGRlc2M9XCJTVkcgQXJyb3dcIj4gLS0+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCI1MCVcIiBoZWlnaHQ9XCI1MCVcIiB2aWV3Qm94PVwiMCAwIDI5Mi4zNjIgMjkyLjM2MlwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTIuMzYyIDI5Mi4zNjI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yODYuOTM1LDY5LjM3N2MtMy42MTQtMy42MTctNy44OTgtNS40MjQtMTIuODQ4LTUuNDI0SDE4LjI3NGMtNC45NTIsMC05LjIzMywxLjgwNy0xMi44NSw1LjQyNFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMS44MDcsNzIuOTk4LDAsNzcuMjc5LDAsODIuMjI4YzAsNC45NDgsMS44MDcsOS4yMjksNS40MjQsMTIuODQ3bDEyNy45MDcsMTI3LjkwN2MzLjYyMSwzLjYxNyw3LjkwMiw1LjQyOCwxMi44NSw1LjQyOFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3pcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIDwvZWRpdG9yLWZvbGQ+IC0tPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIm93bC1kdC1jb250cm9sIG93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJzaG93Q29udHJvbEFycm93cz8gJ3Zpc2libGUnOiAnaGlkZGVuJ1wiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIW5leHRCdXR0b25FbmFibGVkKClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uTGFiZWxcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5leHRDbGlja2VkKClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1jb250ZW50IG93bC1kdC1jb250cm9sLWJ1dHRvbi1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgPCEtLSA8ZWRpdG9yLWZvbGQgZGVzYz1cIlNWRyBBcnJvdyBSaWdodFwiPiAtLT5cbiAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNTAuNzM4IDI1MC43MzhcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUwLjczOCAyNTAuNzM4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtcIiBkPVwiTTE5MS43NSwxMTEuNjg5TDg0Ljc2Niw1LjI5MWMtNy4xLTcuMDU1LTE4LjYxMy03LjA1NS0yNS43MTMsMFxuICAgICAgICAgICAgICAgICAgICBjLTcuMTAxLDcuMDU0LTcuMTAxLDE4LjQ5LDAsMjUuNTQ0bDk1LjA1Myw5NC41MzRsLTk1LjA1Myw5NC41MzNjLTcuMTAxLDcuMDU0LTcuMTAxLDE4LjQ5MSwwLDI1LjU0NVxuICAgICAgICAgICAgICAgICAgICBjNy4xLDcuMDU0LDE4LjYxMyw3LjA1NCwyNS43MTMsMEwxOTEuNzUsMTM5LjA1YzMuNzg0LTMuNzU5LDUuNDg3LTguNzU5LDUuMjM4LTEzLjY4MVxuICAgICAgICAgICAgICAgICAgICBDMTk3LjIzNywxMjAuNDQ3LDE5NS41MzQsMTE1LjQ0OCwxOTEuNzUsMTExLjY4OXpcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwhLS0gPC9lZGl0b3ItZm9sZD4gLS0+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1tYWluXCIgY2RrTW9uaXRvclN1YnRyZWVGb2N1cyBbbmdTd2l0Y2hdPVwiY3VycmVudFZpZXdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgPG93bC1kYXRlLXRpbWUtbW9udGgtdmlld1xuICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIlxuICAgICAgICAgICAgW3BpY2tlck1vbWVudF09XCJwaWNrZXJNb21lbnRcIlxuICAgICAgICAgICAgW2ZpcnN0RGF5T2ZXZWVrXT1cImZpcnN0RGF5T2ZXZWVrXCJcbiAgICAgICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICBbc2VsZWN0ZWRzXT1cInNlbGVjdGVkc1wiXG4gICAgICAgICAgICBbc2VsZWN0TW9kZV09XCJzZWxlY3RNb2RlXCJcbiAgICAgICAgICAgIFttaW5EYXRlXT1cIm1pbkRhdGVcIlxuICAgICAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICAgICAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcbiAgICAgICAgICAgIFtoaWRlT3RoZXJNb250aHNdPVwiaGlkZU90aGVyTW9udGhzXCJcbiAgICAgICAgICAgIChwaWNrZXJNb21lbnRDaGFuZ2UpPVwiaGFuZGxlUGlja2VyTW9tZW50Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cImRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICh1c2VyU2VsZWN0aW9uKT1cInVzZXJTZWxlY3RlZCgpXCI+PC9vd2wtZGF0ZS10aW1lLW1vbnRoLXZpZXc+XG5cbiAgICA8b3dsLWRhdGUtdGltZS15ZWFyLXZpZXdcbiAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCIneWVhcidcIlxuICAgICAgICAgICAgW3BpY2tlck1vbWVudF09XCJwaWNrZXJNb21lbnRcIlxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIFtzZWxlY3RlZHNdPVwic2VsZWN0ZWRzXCJcbiAgICAgICAgICAgIFtzZWxlY3RNb2RlXT1cInNlbGVjdE1vZGVcIlxuICAgICAgICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgICAgICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICAgICAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgICAgICAgKGtleWJvYXJkRW50ZXIpPVwiZm9jdXNBY3RpdmVDZWxsKClcIlxuICAgICAgICAgICAgKHBpY2tlck1vbWVudENoYW5nZSk9XCJoYW5kbGVQaWNrZXJNb21lbnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAobW9udGhTZWxlY3RlZCk9XCJzZWxlY3RNb250aEluWWVhclZpZXcoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cImdvVG9EYXRlSW5WaWV3KCRldmVudCwgJ21vbnRoJylcIj48L293bC1kYXRlLXRpbWUteWVhci12aWV3PlxuXG4gICAgPG93bC1kYXRlLXRpbWUtbXVsdGkteWVhci12aWV3XG4gICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpLXllYXJzJ1wiXG4gICAgICAgICAgICBbcGlja2VyTW9tZW50XT1cInBpY2tlck1vbWVudFwiXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgW3NlbGVjdGVkc109XCJzZWxlY3RlZHNcIlxuICAgICAgICAgICAgW3NlbGVjdE1vZGVdPVwic2VsZWN0TW9kZVwiXG4gICAgICAgICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICAgICAgICAgIFttYXhEYXRlXT1cIm1heERhdGVcIlxuICAgICAgICAgICAgW2RhdGVGaWx0ZXJdPVwiZGF0ZUZpbHRlclwiXG4gICAgICAgICAgICAoa2V5Ym9hcmRFbnRlcik9XCJmb2N1c0FjdGl2ZUNlbGwoKVwiXG4gICAgICAgICAgICAocGlja2VyTW9tZW50Q2hhbmdlKT1cImhhbmRsZVBpY2tlck1vbWVudENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICh5ZWFyU2VsZWN0ZWQpPVwic2VsZWN0WWVhckluTXVsdGlZZWFyVmlldygkZXZlbnQpXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiZ29Ub0RhdGVJblZpZXcoJGV2ZW50LCAneWVhcicpXCI+PC9vd2wtZGF0ZS10aW1lLW11bHRpLXllYXItdmlldz5cbjwvZGl2PlxuIl19