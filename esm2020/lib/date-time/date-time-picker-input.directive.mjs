/**
 * date-time-picker-input.directive
 */
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "./adapter/date-time-adapter.class";
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OwlDateTimeInputDirective),
    multi: true
};
export const OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => OwlDateTimeInputDirective),
    multi: true
};
export class OwlDateTimeInputDirective {
    constructor(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.renderer = renderer;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The picker's select mode
         */
        this._selectMode = 'single';
        /**
         * The character to separate the 'from' and 'to' in input value
         */
        this.rangeSeparator = '~';
        this._values = [];
        /**
         * Callback to invoke when `change` event is fired on this `<input>`
         * */
        this.dateTimeChange = new EventEmitter();
        /**
         * Callback to invoke when an `input` event is fired on this `<input>`.
         * */
        this.dateTimeInput = new EventEmitter();
        this.dtPickerSub = Subscription.EMPTY;
        this.localeSub = Subscription.EMPTY;
        this.lastValueValid = true;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.validatorOnChange = () => { };
        /** The form control validator for whether the input parses. */
        this.parseValidator = () => {
            return this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: this.elmRef.nativeElement.value } };
        };
        /** The form control validator for the min date. */
        this.minValidator = (control) => {
            if (this.isInSingleMode) {
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.min ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: this.min, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: this.min,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        };
        /** The form control validator for the max date. */
        this.maxValidator = (control) => {
            if (this.isInSingleMode) {
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.max ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: this.max, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: this.max,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        };
        /** The form control validator for the date filter. */
        this.filterValidator = (control) => {
            const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
            return !this._dateTimeFilter ||
                !controlValue ||
                this._dateTimeFilter(controlValue)
                ? null
                : { owlDateTimeFilter: true };
        };
        /**
         * The form control validator for the range.
         * Check whether the 'before' value is before the 'to' value
         * */
        this.rangeValidator = (control) => {
            if (this.isInSingleMode || !control.value) {
                return null;
            }
            const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
            const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
                ? null
                : { owlDateTimeRange: true };
        };
        /** The combined form control validator for this input. */
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator,
            this.rangeValidator
        ]);
        /** Emits when the value changes (either due to user input or programmatic change). */
        this.valueChange = new EventEmitter();
        /** Emits when the disabled state has changed */
        this.disabledChange = new EventEmitter();
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(() => {
            this.value = this.value;
        });
    }
    /**
     * The date time picker that this input is associated with.
     * */
    set owlDateTime(value) {
        this.registerDateTimePicker(value);
    }
    /**
     * A function to filter date time
     */
    set owlDateTimeFilter(filter) {
        this._dateTimeFilter = filter;
        this.validatorOnChange();
    }
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    get disabled() {
        return !!this._disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        const element = this.elmRef.nativeElement;
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this.disabledChange.emit(newValue);
        }
        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(mode) {
        if (mode !== 'single' &&
            mode !== 'range' &&
            mode !== 'rangeFrom' &&
            mode !== 'rangeTo') {
            throw Error('OwlDateTime Error: invalid selectMode value!');
        }
        this._selectMode = mode;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
        value = this.getValidDate(value);
        const oldDate = this._value;
        this._value = value;
        // set the input property 'value'
        this.formatNativeInputValue();
        // check if the input value changed
        if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
            this.valueChange.emit(value);
        }
    }
    get values() {
        return this._values;
    }
    set values(values) {
        if (values && values.length > 0) {
            this._values = values.map(v => {
                v = this.dateTimeAdapter.deserialize(v);
                return this.getValidDate(v);
            });
            this.lastValueValid =
                (!this._values[0] ||
                    this.dateTimeAdapter.isValid(this._values[0])) &&
                    (!this._values[1] ||
                        this.dateTimeAdapter.isValid(this._values[1]));
        }
        else {
            this._values = [];
            this.lastValueValid = true;
        }
        // set the input property 'value'
        this.formatNativeInputValue();
        this.valueChange.emit(this._values);
    }
    get elementRef() {
        return this.elmRef;
    }
    get isInSingleMode() {
        return this._selectMode === 'single';
    }
    get isInRangeMode() {
        return (this._selectMode === 'range' ||
            this._selectMode === 'rangeFrom' ||
            this._selectMode === 'rangeTo');
    }
    get owlDateTimeInputAriaHaspopup() {
        return true;
    }
    get owlDateTimeInputAriaOwns() {
        return (this.dtPicker.opened && this.dtPicker.id) || null;
    }
    get minIso8601() {
        return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
    }
    get maxIso8601() {
        return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
    }
    get owlDateTimeInputDisabled() {
        return this.disabled;
    }
    ngOnInit() {
        if (!this.dtPicker) {
            throw Error(`OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component`);
        }
    }
    ngAfterContentInit() {
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((selecteds) => {
            if (Array.isArray(selecteds)) {
                this.values = selecteds;
            }
            else {
                this.value = selecteds;
            }
            this.onModelChange(selecteds);
            this.onModelTouched();
            this.dateTimeChange.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement
            });
            this.dateTimeInput.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement
            });
        });
    }
    ngOnDestroy() {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(c) {
        return this.validator ? this.validator(c) : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     * */
    handleKeydownOnHost(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    }
    handleBlurOnHost(event) {
        this.onModelTouched();
    }
    handleInputOnHost(event) {
        let value = event.target.value;
        if (this._selectMode === 'single') {
            this.changeInputInSingleMode(value);
        }
        else if (this._selectMode === 'range') {
            this.changeInputInRangeMode(value);
        }
        else {
            this.changeInputInRangeFromToMode(value);
        }
    }
    handleChangeOnHost(event) {
        let v;
        if (this.isInSingleMode) {
            v = this.value;
        }
        else if (this.isInRangeMode) {
            v = this.values;
        }
        this.dateTimeChange.emit({
            source: this,
            value: v,
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Set the native input property 'value'
     */
    formatNativeInputValue() {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                const from = this._values[0];
                const to = this._values[1];
                const fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                const toFormatted = to
                    ? this.dateTimeAdapter.format(to, this.dtPicker.formatString)
                    : '';
                if (!fromFormatted && !toFormatted) {
                    this.renderer.setProperty(this.elmRef.nativeElement, 'value', null);
                }
                else {
                    if (this._selectMode === 'range') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted +
                            ' ' +
                            this.rangeSeparator +
                            ' ' +
                            toFormatted);
                    }
                    else if (this._selectMode === 'rangeFrom') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted);
                    }
                    else if (this._selectMode === 'rangeTo') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', toFormatted);
                    }
                }
            }
            else {
                this.renderer.setProperty(this.elmRef.nativeElement, 'value', '');
            }
        }
        return;
    }
    /**
     * Register the relationship between this input and its picker component
     */
    registerDateTimePicker(picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    }
    /**
     * Convert a given obj to a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     */
    convertTimeStringToDateTimeString(timeString, dateTime) {
        if (timeString) {
            const v = dateTime || this.dateTimeAdapter.now();
            const dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    }
    /**
     * Handle input change in single mode
     */
    changeInputInSingleMode(inputValue) {
        let value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        let result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        // result equals to null means there is input event, but the input value is invalid
        if (!this.isSameValue(result, this._value) || result === null) {
            this._value = result;
            this.valueChange.emit(result);
            this.onModelChange(result);
            this.dateTimeInput.emit({
                source: this,
                value: result,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Handle input change in rangeFrom or rangeTo mode
     */
    changeInputInRangeFromToMode(inputValue) {
        let originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        let result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if ((this._selectMode === 'rangeFrom' &&
            this.isSameValue(result, this._values[0]) &&
            result) ||
            (this._selectMode === 'rangeTo' &&
                this.isSameValue(result, this._values[1]) &&
                result)) {
            return;
        }
        this._values =
            this._selectMode === 'rangeFrom'
                ? [result, this._values[1]]
                : [this._values[0], result];
        this.valueChange.emit(this._values);
        this.onModelChange(this._values);
        this.dateTimeInput.emit({
            source: this,
            value: this._values,
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Handle input change in range mode
     */
    changeInputInRangeMode(inputValue) {
        const selecteds = inputValue.split(this.rangeSeparator);
        let fromString = selecteds[0];
        let toString = selecteds[1];
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        let from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        let to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
        this.lastValueValid =
            (!from || this.dateTimeAdapter.isValid(from)) &&
                (!to || this.dateTimeAdapter.isValid(to));
        from = this.getValidDate(from);
        to = this.getValidDate(to);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if (!this.isSameValue(from, this._values[0]) ||
            !this.isSameValue(to, this._values[1]) ||
            (from === null && to === null)) {
            this._values = [from, to];
            this.valueChange.emit(this._values);
            this.onModelChange(this._values);
            this.dateTimeInput.emit({
                source: this,
                value: this._values,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Check if the two value is the same
     */
    isSameValue(first, second) {
        if (first && second) {
            return this.dateTimeAdapter.compare(first, second) === 0;
        }
        return first == second;
    }
}
OwlDateTimeInputDirective.ɵfac = function OwlDateTimeInputDirective_Factory(t) { return new (t || OwlDateTimeInputDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.DateTimeAdapter, 8), i0.ɵɵdirectiveInject(OWL_DATE_TIME_FORMATS, 8)); };
OwlDateTimeInputDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: OwlDateTimeInputDirective, selectors: [["input", "owlDateTime", ""]], hostVars: 5, hostBindings: function OwlDateTimeInputDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown", function OwlDateTimeInputDirective_keydown_HostBindingHandler($event) { return ctx.handleKeydownOnHost($event); })("blur", function OwlDateTimeInputDirective_blur_HostBindingHandler($event) { return ctx.handleBlurOnHost($event); })("input", function OwlDateTimeInputDirective_input_HostBindingHandler($event) { return ctx.handleInputOnHost($event); })("change", function OwlDateTimeInputDirective_change_HostBindingHandler($event) { return ctx.handleChangeOnHost($event); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("disabled", ctx.owlDateTimeInputDisabled);
        i0.ɵɵattribute("aria-haspopup", ctx.owlDateTimeInputAriaHaspopup)("aria-owns", ctx.owlDateTimeInputAriaOwns)("min", ctx.minIso8601)("max", ctx.maxIso8601);
    } }, inputs: { owlDateTime: "owlDateTime", owlDateTimeFilter: "owlDateTimeFilter", _disabled: "_disabled", min: "min", max: "max", selectMode: "selectMode", rangeSeparator: "rangeSeparator", value: "value", values: "values" }, outputs: { dateTimeChange: "dateTimeChange", dateTimeInput: "dateTimeInput" }, exportAs: ["owlDateTimeInput"], features: [i0.ɵɵProvidersFeature([
            OWL_DATETIME_VALUE_ACCESSOR,
            OWL_DATETIME_VALIDATORS,
        ])] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDateTimeInputDirective, [{
        type: Directive,
        args: [{
                selector: 'input[owlDateTime]',
                exportAs: 'owlDateTimeInput',
                host: {
                    '(keydown)': 'handleKeydownOnHost($event)',
                    '(blur)': 'handleBlurOnHost($event)',
                    '(input)': 'handleInputOnHost($event)',
                    '(change)': 'handleChangeOnHost($event)',
                    '[attr.aria-haspopup]': 'owlDateTimeInputAriaHaspopup',
                    '[attr.aria-owns]': 'owlDateTimeInputAriaOwns',
                    '[attr.min]': 'minIso8601',
                    '[attr.max]': 'maxIso8601',
                    '[disabled]': 'owlDateTimeInputDisabled'
                },
                providers: [
                    OWL_DATETIME_VALUE_ACCESSOR,
                    OWL_DATETIME_VALIDATORS,
                ],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DateTimeAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [OWL_DATE_TIME_FORMATS]
            }] }]; }, { owlDateTime: [{
            type: Input
        }], owlDateTimeFilter: [{
            type: Input
        }], _disabled: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], selectMode: [{
            type: Input
        }], rangeSeparator: [{
            type: Input
        }], value: [{
            type: Input
        }], values: [{
            type: Input
        }], dateTimeChange: [{
            type: Output
        }], dateTimeInput: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDYixpQkFBaUIsRUFJakIsVUFBVSxFQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBRTlELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFRO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBUTtJQUN4QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixD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ZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxJREFUT1JTOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFtvd2xEYXRlVGltZV0nLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd25Pbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICcoYmx1ciknOiAnaGFuZGxlQmx1ck9uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXRPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICcoY2hhbmdlKSc6ICdoYW5kbGVDaGFuZ2VPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdvd2xEYXRlVGltZUlucHV0QXJpYUhhc3BvcHVwJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtb3duc10nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zJyxcbiAgICAgICAgJ1thdHRyLm1pbl0nOiAnbWluSXNvODYwMScsXG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heElzbzg2MDEnLFxuICAgICAgICAnW2Rpc2FibGVkXSc6ICdvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICBPV0xfREFURVRJTUVfVkFMSURBVE9SUyxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+XG4gICAgaW1wbGVtZW50c1xuICAgICAgICBPbkluaXQsXG4gICAgICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgICAgIE9uRGVzdHJveSxcbiAgICAgICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFZhbGlkYXRvciB7XG4gICAgLyoqXG4gICAgICogVGhlIGRhdGUgdGltZSBwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG93bERhdGVUaW1lKHZhbHVlOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGF0ZVRpbWVQaWNrZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdG8gZmlsdGVyIGRhdGUgdGltZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG93bERhdGVUaW1lRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2RhdGVUaW1lRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0ZVRpbWVGaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbjtcbiAgICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlVGltZUZpbHRlcjtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSB0aW1lIHBpY2tlcidzIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGJsdXJgIG1ldGhvZCwgYmVjYXVzZSBpdCdzIHVuZGVmaW5lZCBkdXJpbmcgU1NSLlxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgZWxlbWVudC5ibHVyKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgbmF0aXZlIGlucHV0IGVsZW1lbnRzIGF1dG9tYXRpY2FsbHkgYmx1ciBpZiB0aGV5IHR1cm4gZGlzYWJsZWQuIFRoaXMgYmVoYXZpb3JcbiAgICAgICAgICAgIC8vIGlzIHByb2JsZW1hdGljLCBiZWNhdXNlIGl0IHdvdWxkIG1lYW4gdGhhdCBpdCB0cmlnZ2VycyBhbm90aGVyIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIGNhdXNlcyBhIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvciBpZiB0aGUgaW5wdXQgZWxlbWVudCB3YXMgZm9jdXNlZCBiZWZvcmUuXG4gICAgICAgICAgICBlbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbjogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWF4OiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHNldCBtYXgodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGlja2VyJ3Mgc2VsZWN0IG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0TW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdE1vZGUobW9kZTogU2VsZWN0TW9kZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBtb2RlICE9PSAnc2luZ2xlJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlRnJvbScgJiZcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZVRvJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdPd2xEYXRlVGltZSBFcnJvcjogaW52YWxpZCBzZWxlY3RNb2RlIHZhbHVlIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IG1vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGNoYXJhY3RlciB0byBzZXBhcmF0ZSB0aGUgJ2Zyb20nIGFuZCAndG8nIGluIGlucHV0IHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByYW5nZVNlcGFyYXRvciA9ICd+JztcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhdmFsdWUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICAgIHRoaXMuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VkXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNFcXVhbChvbGREYXRlLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZXM6IFRbXSA9IFtdO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcbiAgICB9XG5cbiAgICBzZXQgdmFsdWVzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XG4gICAgICAgICAgICAgICAgKCF0aGlzLl92YWx1ZXNbMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMF0pKSAmJlxuICAgICAgICAgICAgICAgICghdGhpcy5fdmFsdWVzWzFdIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodGhpcy5fdmFsdWVzWzFdKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICAgIHRoaXMuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICBkYXRlVGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC5cbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGRhdGVUaW1lSW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5lbG1SZWY7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBkYXRlLXRpbWUtcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgcHVibGljIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcblxuICAgIHByaXZhdGUgZHRQaWNrZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IHRydWU7XG5cbiAgICBwcml2YXRlIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgcHJpdmF0ZSBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBwcml2YXRlIHZhbGlkYXRvck9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0VmFsdWVWYWxpZFxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVQYXJzZTogeyB0ZXh0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfTtcbiAgICB9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlRnJvbSB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZUZyb20pIDw9IDBcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBvd2xEYXRlVGltZU1pbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IFtjb250cm9sVmFsdWVGcm9tLCBjb250cm9sVmFsdWVUb11cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZU1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZUZyb20gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWF4LCBjb250cm9sVmFsdWVUbykgPj0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIG93bERhdGVUaW1lTWF4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gICAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9kYXRlVGltZUZpbHRlciB8fFxuICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5fZGF0ZVRpbWVGaWx0ZXIoY29udHJvbFZhbHVlKVxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVGaWx0ZXI6IHRydWUgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSByYW5nZS5cbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSAnYmVmb3JlJyB2YWx1ZSBpcyBiZWZvcmUgdGhlICd0bycgdmFsdWVcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlIHx8ICFjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiAhY29udHJvbFZhbHVlRnJvbSB8fFxuICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGNvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvKSA8PSAwXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVJhbmdlOiB0cnVlIH07XG4gICAgfTtcblxuICAgIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgdGhpcy5wYXJzZVZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXG4gICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgICAgICB0aGlzLmZpbHRlclZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRvclxuICAgIF0pO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cbiAgICBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXSB8IFQgfCBudWxsPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkICovXG4gICAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhSGFzcG9wdXAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0QXJpYU93bnMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmR0UGlja2VyLm9wZW5lZCAmJiB0aGlzLmR0UGlja2VyLmlkKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldCBtaW5Jc284NjAxKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbiA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1pbikgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBtYXhJc284NjAxKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heCA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1heCkgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUykgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0cyApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVQaWNrZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmR0UGlja2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IHRoZSBwaWNrZXIgaW5wdXQgZG9lc24ndCBoYXZlIGFueSBhc3NvY2lhdGVkIG93bC1kYXRlLXRpbWUgY29tcG9uZW50YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHRQaWNrZXJTdWIgPSB0aGlzLmR0UGlja2VyLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoc2VsZWN0ZWRzOiBUW10gfCBUKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHNlbGVjdGVkcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmR0UGlja2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMubG9jYWxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoYykgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgd2hlbiB1c2VyIGhvbGQgYWx0ICsgRE9XTl9BUlJPV1xuICAgICAqICovXG4gICAgcHVibGljIGhhbmRsZUtleWRvd25Pbkhvc3QoIGV2ZW50OiBLZXlib2FyZEV2ZW50ICk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVCbHVyT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRPbkhvc3QoIGV2ZW50OiBhbnkgKTogdm9pZCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5TaW5nbGVNb2RlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5SYW5nZU1vZGUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDaGFuZ2VPbkhvc3QoIGV2ZW50OiBhbnkgKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IHY7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbmF0aXZlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzICYmIHRoaXMudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy5fdmFsdWVzWzFdO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbUZvcm1hdHRlZCA9IGZyb21cbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvRm9ybWF0dGVkID0gdG9cbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcblxuICAgICAgICAgICAgICAgIGlmICghZnJvbUZvcm1hdHRlZCAmJiAhdG9Gb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRm9ybWF0dGVkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5nZVNlcGFyYXRvciArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRm9ybWF0dGVkXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRm9ybWF0dGVkXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Gb3JtYXR0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdGhpcyBpbnB1dCBhbmQgaXRzIHBpY2tlciBjb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZ2lzdGVyRGF0ZVRpbWVQaWNrZXIocGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xuICAgICAgICBpZiAocGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyID0gcGlja2VyO1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIGdpdmVuIG9iaiB0byBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIHRpbWUgc3RyaW5nIHRvIGEgZGF0ZS10aW1lIHN0cmluZ1xuICAgICAqIFdoZW4gcGlja2VyVHlwZSBpcyAndGltZXInLCB0aGUgdmFsdWUgaW4gdGhlIHBpY2tlcidzIGlucHV0IGlzIGEgdGltZSBzdHJpbmcuXG4gICAgICogVGhlIGRhdGVUaW1lQWRhcHRlciBwYXJzZSBmbiBjb3VsZCBub3QgcGFyc2UgYSB0aW1lIHN0cmluZyB0byBhIERhdGUgT2JqZWN0LlxuICAgICAqIFRoZXJlZm9yZSB3ZSBuZWVkIHRoaXMgZm4gdG8gY29udmVydCBhIHRpbWUgc3RyaW5nIHRvIGEgZGF0ZS10aW1lIHN0cmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcbiAgICAgICAgdGltZVN0cmluZzogc3RyaW5nLFxuICAgICAgICBkYXRlVGltZTogVFxuICAgICk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAodGltZVN0cmluZykge1xuICAgICAgICAgICAgY29uc3QgdiA9IGRhdGVUaW1lIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgICAgICB2LFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRhdGVQaWNrZXJJbnB1dFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlU3RyaW5nICsgJyAnICsgdGltZVN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiBzaW5nbGUgbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlSW5wdXRJblNpbmdsZU1vZGUoaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyLnBpY2tlclR5cGUgPT09ICd0aW1lcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcodmFsdWUsIHRoaXMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhcmVzdWx0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQocmVzdWx0KTtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRWYWxpZERhdGUocmVzdWx0KTtcblxuICAgICAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgICAgIC8vIHJlc3VsdCBlcXVhbHMgdG8gbnVsbCBtZWFucyB0aGVyZSBpcyBpbnB1dCBldmVudCwgYnV0IHRoZSBpbnB1dCB2YWx1ZSBpcyBpbnZhbGlkXG4gICAgICAgIGlmICghdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlKSB8fCByZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gcmVzdWx0O1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHJhbmdlRnJvbSBvciByYW5nZVRvIG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUlucHV0SW5SYW5nZUZyb21Ub01vZGUoaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBvcmlnaW5hbFZhbHVlID1cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXG4gICAgICAgICAgICAgICAgPyB0aGlzLl92YWx1ZXNbMF1cbiAgICAgICAgICAgICAgICA6IHRoaXMuX3ZhbHVlc1sxXTtcblxuICAgICAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XG4gICAgICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlSW5wdXRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFyZXN1bHQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChyZXN1bHQpO1xuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFZhbGlkRGF0ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBuZXdWYWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgb2xkVmFsdWUsIHdlIGludGVuZCB0byBub3QgZmlyZSB0aGUgdmFsdWVDaGFuZ2UgZXZlbnRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1swXSkgJiZcbiAgICAgICAgICAgICAgICByZXN1bHQpIHx8XG4gICAgICAgICAgICAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1sxXSkgJiZcbiAgICAgICAgICAgICAgICByZXN1bHQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWVzID1cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXG4gICAgICAgICAgICAgICAgPyBbcmVzdWx0LCB0aGlzLl92YWx1ZXNbMV1dXG4gICAgICAgICAgICAgICAgOiBbdGhpcy5fdmFsdWVzWzBdLCByZXN1bHRdO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZXMsXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHJhbmdlIG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUlucHV0SW5SYW5nZU1vZGUoaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IGlucHV0VmFsdWUuc3BsaXQodGhpcy5yYW5nZVNlcGFyYXRvcik7XG4gICAgICAgIGxldCBmcm9tU3RyaW5nID0gc2VsZWN0ZWRzWzBdO1xuICAgICAgICBsZXQgdG9TdHJpbmcgPSBzZWxlY3RlZHNbMV07XG5cbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgZnJvbVN0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0b1N0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIHRvU3RyaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzWzFdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGxldCB0byA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgdG9TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPVxuICAgICAgICAgICAgKCFmcm9tIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZnJvbSkpICYmXG4gICAgICAgICAgICAoIXRvIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodG8pKTtcbiAgICAgICAgZnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKGZyb20pO1xuICAgICAgICB0byA9IHRoaXMuZ2V0VmFsaWREYXRlKHRvKTtcblxuICAgICAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZhbHVlKGZyb20sIHRoaXMuX3ZhbHVlc1swXSkgfHxcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZhbHVlKHRvLCB0aGlzLl92YWx1ZXNbMV0pIHx8XG4gICAgICAgICAgICAoZnJvbSA9PT0gbnVsbCAmJiB0byA9PT0gbnVsbClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbZnJvbSwgdG9dO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlcyxcbiAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgdHdvIHZhbHVlIGlzIHRoZSBzYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1NhbWVWYWx1ZShmaXJzdDogVCB8IG51bGwsIHNlY29uZDogVCB8IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpcnN0ICYmIHNlY29uZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZmlyc3QsIHNlY29uZCkgPT09IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlyc3QgPT0gc2Vjb25kO1xuICAgIH1cbn1cbiJdfQ==