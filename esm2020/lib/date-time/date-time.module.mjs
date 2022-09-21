/**
 * date-time.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, OwlDateTimeComponent } from './date-time-picker.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDialogModule } from '../dialog/dialog.module';
import * as i0 from "@angular/core";
export class OwlDateTimeModule {
}
OwlDateTimeModule.ɵfac = function OwlDateTimeModule_Factory(t) { return new (t || OwlDateTimeModule)(); };
OwlDateTimeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: OwlDateTimeModule });
OwlDateTimeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        OwlDateTimeIntl,
        OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
    ], imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDateTimeModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule],
                exports: [
                    OwlCalendarComponent,
                    OwlTimerComponent,
                    OwlDateTimeTriggerDirective,
                    OwlDateTimeInputDirective,
                    OwlDateTimeComponent,
                    OwlDateTimeInlineComponent,
                    OwlMultiYearViewComponent,
                    OwlYearViewComponent,
                    OwlMonthViewComponent,
                ],
                declarations: [
                    OwlDateTimeTriggerDirective,
                    OwlDateTimeInputDirective,
                    OwlDateTimeComponent,
                    OwlDateTimeContainerComponent,
                    OwlMultiYearViewComponent,
                    OwlYearViewComponent,
                    OwlMonthViewComponent,
                    OwlTimerComponent,
                    OwlTimerBoxComponent,
                    OwlCalendarComponent,
                    OwlCalendarBodyComponent,
                    NumberFixedLenPipe,
                    OwlDateTimeInlineComponent,
                ],
                providers: [
                    OwlDateTimeIntl,
                    OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(OwlDateTimeModule, { declarations: [OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeContainerComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent,
        OwlTimerComponent,
        OwlTimerBoxComponent,
        OwlCalendarComponent,
        OwlCalendarBodyComponent,
        NumberFixedLenPipe,
        OwlDateTimeInlineComponent], imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule], exports: [OwlCalendarComponent,
        OwlTimerComponent,
        OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeInlineComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN2RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQW1DMUQsTUFBTSxPQUFPLGlCQUFpQjs7a0ZBQWpCLGlCQUFpQjttRUFBakIsaUJBQWlCO3dFQUxmO1FBQ1AsZUFBZTtRQUNmLHFDQUFxQztLQUN4QyxZQTlCUyxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVO3VGQWdDekQsaUJBQWlCO2NBakM3QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO2dCQUNuRSxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLDBCQUEwQjtvQkFDMUIseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtpQkFDeEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLDZCQUE2QjtvQkFDN0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YscUNBQXFDO2lCQUN4QzthQUNKOzt3RkFDWSxpQkFBaUIsbUJBbkJ0QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQiw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsd0JBQXdCO1FBQ3hCLGtCQUFrQjtRQUNsQiwwQkFBMEIsYUF6QnBCLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVUsYUFFOUQsb0JBQW9CO1FBQ3BCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsIE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bE11bHRpWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJCb3hDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOdW1iZXJGaXhlZExlblBpcGUgfSBmcm9tICcuL251bWJlcmVkRml4TGVuLnBpcGUnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE93bERpYWxvZ01vZHVsZSwgQTExeU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBPd2xDYWxlbmRhckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJCb3hDb21wb25lbnQsXG4gICAgICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgICAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gICAgICAgIE51bWJlckZpeGVkTGVuUGlwZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnRsLFxuICAgICAgICBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVNb2R1bGUge1xufVxuIl19