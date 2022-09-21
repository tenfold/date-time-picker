/**
 * dialog.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from './dialog.service';
import { OwlDialogContainerComponent } from './dialog-container.component';
import * as i0 from "@angular/core";
export class OwlDialogModule {
}
OwlDialogModule.ɵfac = function OwlDialogModule_Factory(t) { return new (t || OwlDialogModule)(); };
OwlDialogModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: OwlDialogModule });
OwlDialogModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
        OwlDialogService,
    ], imports: [CommonModule, A11yModule, OverlayModule, PortalModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwlDialogModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, A11yModule, OverlayModule, PortalModule],
                exports: [],
                declarations: [
                    OwlDialogContainerComponent,
                ],
                providers: [
                    OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    OwlDialogService,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(OwlDialogModule, { declarations: [OwlDialogContainerComponent], imports: [CommonModule, A11yModule, OverlayModule, PortalModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBYTNFLE1BQU0sT0FBTyxlQUFlOzs4RUFBZixlQUFlO2lFQUFmLGVBQWU7c0VBTGI7UUFDUCxtQ0FBbUM7UUFDbkMsZ0JBQWdCO0tBQ25CLFlBUlMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWTt1RkFVdEQsZUFBZTtjQVgzQixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUNoRSxPQUFPLEVBQUUsRUFBRTtnQkFDWCxZQUFZLEVBQUU7b0JBQ1YsMkJBQTJCO2lCQUM5QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsbUNBQW1DO29CQUNuQyxnQkFBZ0I7aUJBQ25CO2FBQ0o7O3dGQUNZLGVBQWUsbUJBUHBCLDJCQUEyQixhQUhyQixZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkaWFsb2cubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsIE93bERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEExMXlNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZV0sXG4gICAgZXhwb3J0czogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUixcbiAgICAgICAgT3dsRGlhbG9nU2VydmljZSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ01vZHVsZSB7XG59XG4iXX0=