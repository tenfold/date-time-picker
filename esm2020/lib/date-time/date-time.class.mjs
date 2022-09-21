/**
 * date-time.class
 */
import { Inject, Input, Optional, Directive } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import * as i0 from "@angular/core";
import * as i1 from "./adapter/date-time-adapter.class";
let nextUniqueId = 0;
export class OwlDateTime {
    constructor(dateTimeAdapter, dateTimeFormats) {
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to show the second's timer
         */
        this._showSecondsTimer = false;
        /**
         * Whether the timer is in hour12 format
         */
        this._hour12Timer = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Hours to change per step
         */
        this._stepHour = 1;
        /**
         * Minutes to change per step
         */
        this._stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this._stepSecond = 1;
        /**
         * Set the first day of week
         */
        this._firstDayOfWeek = 0;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this._hideOtherMonths = false;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         */
        this.dateTimeChecker = (dateTime) => {
            return (!!dateTime &&
                (!this.dateTimeFilter || this.dateTimeFilter(dateTime)) &&
                (!this.minDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.minDateTime) >=
                        0) &&
                (!this.maxDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.maxDateTime) <= 0));
        };
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this._id = `owl-dt-picker-${nextUniqueId++}`;
    }
    get showSecondsTimer() {
        return this._showSecondsTimer;
    }
    set showSecondsTimer(val) {
        this._showSecondsTimer = coerceBooleanProperty(val);
    }
    get hour12Timer() {
        return this._hour12Timer;
    }
    set hour12Timer(val) {
        this._hour12Timer = coerceBooleanProperty(val);
    }
    get stepHour() {
        return this._stepHour;
    }
    set stepHour(val) {
        this._stepHour = coerceNumberProperty(val, 1);
    }
    get stepMinute() {
        return this._stepMinute;
    }
    set stepMinute(val) {
        this._stepMinute = coerceNumberProperty(val, 1);
    }
    get stepSecond() {
        return this._stepSecond;
    }
    set stepSecond(val) {
        this._stepSecond = coerceNumberProperty(val, 1);
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(value) {
        value = coerceNumberProperty(value, 0);
        if (value > 6 || value < 0) {
            this._firstDayOfWeek = 0;
        }
        else {
            this._firstDayOfWeek = value;
        }
    }
    get hideOtherMonths() {
        return this._hideOtherMonths;
    }
    set hideOtherMonths(val) {
        this._hideOtherMonths = coerceBooleanProperty(val);
    }
    get id() {
        return this._id;
    }
    get formatString() {
        return this.pickerType === 'both'
            ? this.dateTimeFormats.fullPickerInput
            : this.pickerType === 'calendar'
                ? this.dateTimeFormats.datePickerInput
                : this.dateTimeFormats.timePickerInput;
    }
    get disabled() {
        return false;
    }
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
OwlDateTime.ɵfac = function OwlDateTime_Factory(t) { return new (t || OwlDateTime)(i0.ɵɵdirectiveInject(i1.DateTimeAdapter, 8), i0.ɵɵdirectiveInject(OWL_DATE_TIME_FORMATS, 8)); };
OwlDateTime.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: OwlDateTime, inputs: { showSecondsTimer: "showSecondsTimer", hour12Timer: "hour12Timer", startView: "startView", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", firstDayOfWeek: "firstDayOfWeek", hideOtherMonths: "hideOtherMonths" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDateTime, [{
        type: Directive
    }], function () { return [{ type: i1.DateTimeAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [OWL_DATE_TIME_FORMATS]
            }] }]; }, { showSecondsTimer: [{
            type: Input
        }], hour12Timer: [{
            type: Input
        }], startView: [{
            type: Input
        }], stepHour: [{
            type: Input
        }], stepMinute: [{
            type: Input
        }], stepSecond: [{
            type: Input
        }], firstDayOfWeek: [{
            type: Input
        }], hideOtherMonths: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2RhdGUtdGltZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFBZ0IsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3ZCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBRTFDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQVNyQixNQUFNLE9BQWdCLFdBQVc7SUF5SzdCLFlBQzBCLGVBQW1DLEVBRy9DLGVBQW1DO1FBSHZCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUcvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUE1S2pEOztXQUVHO1FBQ0ssc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBVWxDOztXQUVHO1FBQ0ssaUJBQVksR0FBRyxLQUFLLENBQUM7UUFVN0I7O1dBRUc7UUFFSCxjQUFTLEdBQXFDLE9BQU8sQ0FBQztRQUV0RDs7V0FFRztRQUNLLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFVdEI7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQVV4Qjs7V0FFRztRQUNLLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBVXhCOztXQUVHO1FBQ0ssb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFlNUI7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUF5RGpDOztXQUVHO1FBQ0ksb0JBQWUsR0FBRyxDQUFDLFFBQVcsRUFBRSxFQUFFO1lBQ3JDLE9BQU8s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QyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxJQUFJLEVBQUU7UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQW9DRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTTtZQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVU7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWU7Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztJQUNuRCxDQUFDO0lBaUJELElBQUksUUFBUTtRQUNSLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUEyQlMsWUFBWSxDQUFDLEdBQVE7UUFDM0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNmLENBQUM7O3NFQXZNaUIsV0FBVyxvRUE0S2pCLHFCQUFxQjs4REE1S2YsV0FBVzt1RkFBWCxXQUFXO2NBRGhDLFNBQVM7O3NCQTJLRCxRQUFROztzQkFDUixRQUFROztzQkFDUixNQUFNO3VCQUFDLHFCQUFxQjt3QkF0SzdCLGdCQUFnQjtrQkFEbkIsS0FBSztZQWNGLFdBQVc7a0JBRGQsS0FBSztZQWFOLFNBQVM7a0JBRFIsS0FBSztZQVFGLFFBQVE7a0JBRFgsS0FBSztZQWNGLFVBQVU7a0JBRGIsS0FBSztZQWNGLFVBQVU7a0JBRGIsS0FBSztZQWNGLGNBQWM7a0JBRGpCLEtBQUs7WUFtQkYsZUFBZTtrQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLmNsYXNzXG4gKi9cbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gICAgY29lcmNlTnVtYmVyUHJvcGVydHlcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IHR5cGUgUGlja2VyVHlwZSA9ICdib3RoJyB8ICdjYWxlbmRhcicgfCAndGltZXInO1xuXG5leHBvcnQgdHlwZSBQaWNrZXJNb2RlID0gJ3BvcHVwJyB8ICdkaWFsb2cnIHwgJ2lubGluZSc7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdE1vZGUgPSAnc2luZ2xlJyB8ICdyYW5nZScgfCAncmFuZ2VGcm9tJyB8ICdyYW5nZVRvJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3dsRGF0ZVRpbWU8VD4ge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaG93U2Vjb25kc1RpbWVyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd1NlY29uZHNUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dTZWNvbmRzVGltZXI7XG4gICAgfVxuXG4gICAgc2V0IHNob3dTZWNvbmRzVGltZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dTZWNvbmRzVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgZm9ybWF0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfaG91cjEyVGltZXIgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBob3VyMTJUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvdXIxMlRpbWVyO1xuICAgIH1cblxuICAgIHNldCBob3VyMTJUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faG91cjEyVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnID0gJ21vbnRoJztcblxuICAgIC8qKlxuICAgICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBIb3VyID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwSG91cigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcEhvdXI7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBIb3VyKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBIb3VyID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBNaW51dGUgPSAxO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXBNaW51dGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBNaW51dGU7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBNaW51dGUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcE1pbnV0ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Vjb25kcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdGVwU2Vjb25kID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwU2Vjb25kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwU2Vjb25kO1xuICAgIH1cblxuICAgIHNldCBzdGVwU2Vjb25kKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBTZWNvbmQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAgICAgKi9cbiAgICBwcml2YXRlIF9maXJzdERheU9mV2VlayA9IDA7XG4gICAgQElucHV0KClcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBzZXQgZmlyc3REYXlPZldlZWsodmFsdWU6IG51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCAwKTtcbiAgICAgICAgaWYgKHZhbHVlID4gNiB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGlkZU90aGVyTW9udGhzID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgaGlkZU90aGVyTW9udGhzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZU90aGVyTW9udGhzO1xuICAgIH1cblxuICAgIHNldCBoaWRlT3RoZXJNb250aHModmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hpZGVPdGhlck1vbnRocyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBzdGFydEF0KCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG9wZW5lZCgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGU7XG5cbiAgICBhYnN0cmFjdCBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBzZWxlY3QoZGF0ZTogVCB8IFRbXSk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZDtcblxuICAgIGdldCBmb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyVHlwZSA9PT0gJ2JvdGgnXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmZ1bGxQaWNrZXJJbnB1dFxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcidcbiAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRhdGVQaWNrZXJJbnB1dFxuICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUZvcm1hdHMudGltZVBpY2tlcklucHV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERhdGUgVGltZSBDaGVja2VyIHRvIGNoZWNrIGlmIHRoZSBnaXZlIGRhdGVUaW1lIGlzIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0ZVRpbWVDaGVja2VyID0gKGRhdGVUaW1lOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWRhdGVUaW1lICYmXG4gICAgICAgICAgICAoIXRoaXMuZGF0ZVRpbWVGaWx0ZXIgfHwgdGhpcy5kYXRlVGltZUZpbHRlcihkYXRlVGltZSkpICYmXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGVUaW1lLCB0aGlzLm1pbkRhdGVUaW1lKSA+PVxuICAgICAgICAgICAgICAgICAgICAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlVGltZSwgdGhpcy5tYXhEYXRlVGltZSkgPD0gMClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlVGltZUFkYXB0ZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lkID0gYG93bC1kdC1waWNrZXItJHtuZXh0VW5pcXVlSWQrK31gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIl19