/**
 * native-date-time.module
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from './date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';
import * as i0 from "@angular/core";
export class NativeDateTimeModule {
}
NativeDateTimeModule.ɵfac = function NativeDateTimeModule_Factory(t) { return new (t || NativeDateTimeModule)(); };
NativeDateTimeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NativeDateTimeModule });
NativeDateTimeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
    ], imports: [[PlatformModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NativeDateTimeModule, [{
        type: NgModule,
        args: [{
                imports: [PlatformModule],
                providers: [
                    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NativeDateTimeModule, { imports: [PlatformModule] }); })();
export class OwlNativeDateTimeModule {
}
OwlNativeDateTimeModule.ɵfac = function OwlNativeDateTimeModule_Factory(t) { return new (t || OwlNativeDateTimeModule)(); };
OwlNativeDateTimeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: OwlNativeDateTimeModule });
OwlNativeDateTimeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: OWL_NATIVE_DATE_TIME_FORMATS }], imports: [[NativeDateTimeModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlNativeDateTimeModule, [{
        type: NgModule,
        args: [{
                imports: [NativeDateTimeModule],
                providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: OWL_NATIVE_DATE_TIME_FORMATS }],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(OwlNativeDateTimeModule, { imports: [NativeDateTimeModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvYWRhcHRlci9uYXRpdmUtZGF0ZS10aW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFRL0UsTUFBTSxPQUFPLG9CQUFvQjs7d0ZBQXBCLG9CQUFvQjtzRUFBcEIsb0JBQW9COzJFQUpsQjtRQUNQLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUM7S0FDOUQsWUFIUSxDQUFDLGNBQWMsQ0FBQzt1RkFLaEIsb0JBQW9CO2NBTmhDLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRTtvQkFDUCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFDO2lCQUM5RDthQUNKOzt3RkFDWSxvQkFBb0IsY0FMbkIsY0FBYztBQVk1QixNQUFNLE9BQU8sdUJBQXVCOzs4RkFBdkIsdUJBQXVCO3lFQUF2Qix1QkFBdUI7OEVBRnJCLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFDLENBQUMsWUFENUUsQ0FBQyxvQkFBb0IsQ0FBQzt1RkFHdEIsdUJBQXVCO2NBSm5DLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDL0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFDLENBQUM7YUFDeEY7O3dGQUNZLHVCQUF1QixjQVB2QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5hdGl2ZS1kYXRlLXRpbWUubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IE9XTF9OQVRJVkVfREFURV9USU1FX0ZPUk1BVFMgfSBmcm9tICcuL25hdGl2ZS1kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbUGxhdGZvcm1Nb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogRGF0ZVRpbWVBZGFwdGVyLCB1c2VDbGFzczogTmF0aXZlRGF0ZVRpbWVBZGFwdGVyfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVEYXRlVGltZU1vZHVsZSB7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZURhdGVUaW1lTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogT1dMX0RBVEVfVElNRV9GT1JNQVRTLCB1c2VWYWx1ZTogT1dMX05BVElWRV9EQVRFX1RJTUVfRk9STUFUU31dLFxufSlcbmV4cG9ydCBjbGFzcyBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSB7XG59XG4iXX0=