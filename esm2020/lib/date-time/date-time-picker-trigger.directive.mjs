/**
 * date-time-picker-trigger.directive
 */
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { merge, of as observableOf, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export class OwlDateTimeTriggerDirective {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    get disabled() {
        return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    get owlDTTriggerDisabledClass() {
        return this.disabled;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    handleClickOnHost(event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    }
    watchStateChanges() {
        this.stateChanges.unsubscribe();
        const inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
            this.dtPicker.dtInput.disabledChange : observableOf();
        const pickerDisabled = this.dtPicker ?
            this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled)
            .subscribe(() => {
            this.changeDetector.markForCheck();
        });
    }
}
OwlDateTimeTriggerDirective.ɵfac = function OwlDateTimeTriggerDirective_Factory(t) { return new (t || OwlDateTimeTriggerDirective)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
OwlDateTimeTriggerDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: OwlDateTimeTriggerDirective, selectors: [["", "owlDateTimeTrigger", ""]], hostVars: 2, hostBindings: function OwlDateTimeTriggerDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function OwlDateTimeTriggerDirective_click_HostBindingHandler($event) { return ctx.handleClickOnHost($event); });
    } if (rf & 2) {
        i0.ɵɵclassProp("owl-dt-trigger-disabled", ctx.owlDTTriggerDisabledClass);
    } }, inputs: { dtPicker: ["owlDateTimeTrigger", "dtPicker"], disabled: "disabled" }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDateTimeTriggerDirective, [{
        type: Directive,
        args: [{
                selector: '[owlDateTimeTrigger]',
                host: {
                    '(click)': 'handleClickOnHost($event)',
                    '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                }
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { dtPicker: [{
            type: Input,
            args: ['owlDateTimeTrigger']
        }], disabled: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBR0gsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUtSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBUy9ELE1BQU0sT0FBTywyQkFBMkI7SUFvQnBDLFlBQXVCLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUZoRCxpQkFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFHMUMsQ0FBQztJQWhCRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVELElBQUksUUFBUSxDQUFFLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBT00sUUFBUTtJQUNmLENBQUM7SUFFTSxXQUFXLENBQUUsT0FBc0I7UUFDdEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVNLGtCQUFrQjtRQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLGlCQUFpQixDQUFFLEtBQVk7UUFDbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFMUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDO2FBQ25ELFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7c0dBNURRLDJCQUEyQjs4RUFBM0IsMkJBQTJCOzhHQUEzQiw2QkFBeUI7Ozs7dUZBQXpCLDJCQUEyQjtjQVB2QyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLGlDQUFpQyxFQUFFLDJCQUEyQjtpQkFDakU7YUFDSjtvRUFHZ0MsUUFBUTtrQkFBcEMsS0FBSzttQkFBQyxvQkFBb0I7WUFJdkIsUUFBUTtrQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlXG4gKi9cblxuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW293bERhdGVUaW1lVHJpZ2dlcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2tPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRyaWdnZXItZGlzYWJsZWRdJzogJ293bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgnb3dsRGF0ZVRpbWVUcmlnZ2VyJykgZHRQaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+O1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5kdFBpY2tlci5kaXNhYmxlZCA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKCB2YWx1ZTogYm9vbGVhbiApIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRUcmlnZ2VyRGlzYWJsZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDbGlja09uSG9zdCggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kdFBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgd2F0Y2hTdGF0ZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgY29uc3QgaW5wdXREaXNhYmxlZCA9IHRoaXMuZHRQaWNrZXIgJiYgdGhpcy5kdFBpY2tlci5kdElucHV0ID9cbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZHRJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIGNvbnN0IHBpY2tlckRpc2FibGVkID0gdGhpcy5kdFBpY2tlciA/XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMgPSBtZXJnZShwaWNrZXJEaXNhYmxlZCwgaW5wdXREaXNhYmxlZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=