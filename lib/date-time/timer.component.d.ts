/**
 * timer.component
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
export declare class OwlTimerComponent<T> implements OnInit {
    private ngZone;
    private elmRef;
    private pickerIntl;
    private cdRef;
    private dateTimeAdapter;
    /** The current picker moment */
    private _pickerMoment;
    pickerMoment: T;
    /** The minimum selectable date time. */
    private _minDateTime;
    minDateTime: T | null;
    /** The maximum selectable date time. */
    private _maxDateTime;
    maxDateTime: T | null;
    private isPM;
    /**
     * Whether to show the second's timer
     */
    showSecondsTimer: boolean;
    /**
     * Whether the timer is in hour12 format
     */
    hour12Timer: boolean;
    /**
     * Hours to change per step
     */
    stepHour: number;
    /**
     * Minutes to change per step
     */
    stepMinute: number;
    /**
     * Seconds to change per step
     */
    stepSecond: number;
    readonly hourValue: number;
    /**
     * The value would be displayed in hourBox.
     * We need this because the value displayed in hourBox it not
     * the same as the hourValue when the timer is in hour12Timer mode.
     * */
    readonly hourBoxValue: number;
    readonly minuteValue: number;
    readonly secondValue: number;
    readonly upHourButtonLabel: string;
    readonly downHourButtonLabel: string;
    readonly upMinuteButtonLabel: string;
    readonly downMinuteButtonLabel: string;
    readonly upSecondButtonLabel: string;
    readonly downSecondButtonLabel: string;
    readonly hour12ButtonLabel: string;
    selectedChange: EventEmitter<T>;
    readonly owlDTTimerClass: boolean;
    readonly owlDTTimeTabIndex: number;
    hourMaxValue: number;
    constructor(ngZone: NgZone, elmRef: ElementRef, pickerIntl: OwlDateTimeIntl, cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>);
    ngOnInit(): void;
    /**
     * Focus to the host element
     * */
    focus(): void;
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * */
    setHourValueViaInput(hours: number): void;
    setHourValue(hours: number): void;
    setMinuteValue(minutes: number): void;
    setSecondValue(seconds: number): void;
    setMeridiem(event: any): void;
    /**
     * Check if the up hour button is enabled
     */
    upHourEnabled(): boolean;
    /**
     * Check if the down hour button is enabled
     */
    downHourEnabled(): boolean;
    /**
     * Check if the up minute button is enabled
     */
    upMinuteEnabled(): boolean;
    /**
     * Check if the down minute button is enabled
     */
    downMinuteEnabled(): boolean;
    /**
     * Check if the up second button is enabled
     */
    upSecondEnabled(): boolean;
    /**
     * Check if the down second button is enabled
     */
    downSecondEnabled(): boolean;
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareHours;
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareMinutes;
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareSeconds;
    /**
     * Get a valid date object
     */
    private getValidDate;
    private initMax;
}
