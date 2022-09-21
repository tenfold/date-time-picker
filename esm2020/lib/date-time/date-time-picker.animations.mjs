/**
 * date-time-picker.animations
 */
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
export const owlDateTimePickerAnimations = {
    transformPicker: trigger('transformPicker', [
        state('void', style({ opacity: 0, transform: 'scale(1, 0)' })),
        state('enter', style({ opacity: 1, transform: 'scale(1, 1)' })),
        transition('void => enter', group([
            query('@fadeInPicker', animateChild(), { optional: true }),
            animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('enter => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    fadeInPicker: trigger('fadeInPicker', [
        state('enter', style({ opacity: 1 })),
        state('void', style({ opacity: 0 })),
        transition('void => enter', animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXIuYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFDSCxPQUFPLEVBQUUsWUFBWSxFQUVyQixLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDVixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUdwQztJQUVBLGVBQWUsRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7UUFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQztZQUM5QixLQUFLLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFELE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztTQUNwRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUM1RSxDQUFDO0lBRUYsWUFBWSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDbEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDdkYsQ0FBQztDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXIuYW5pbWF0aW9uc1xuICovXG5pbXBvcnQge1xuICAgIGFuaW1hdGUsIGFuaW1hdGVDaGlsZCxcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gICAgZ3JvdXAsXG4gICAgcXVlcnksXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5leHBvcnQgY29uc3Qgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgdHJhbnNmb3JtUGlja2VyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG4gICAgcmVhZG9ubHkgZmFkZUluUGlja2VyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuXG4gICAgdHJhbnNmb3JtUGlja2VyOiB0cmlnZ2VyKCd0cmFuc2Zvcm1QaWNrZXInLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDApJ30pKSxcbiAgICAgICAgc3RhdGUoJ2VudGVyJywgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDEpJ30pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBlbnRlcicsIGdyb3VwKFtcbiAgICAgICAgICAgIHF1ZXJ5KCdAZmFkZUluUGlja2VyJywgYW5pbWF0ZUNoaWxkKCksIHsgb3B0aW9uYWw6IHRydWUgfSksXG4gICAgICAgICAgICBhbmltYXRlKCc0MDBtcyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKScpXG4gICAgICAgIF0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignZW50ZXIgPT4gdm9pZCcsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKVxuICAgIF0pLFxuXG4gICAgZmFkZUluUGlja2VyOiB0cmlnZ2VyKCdmYWRlSW5QaWNrZXInLCBbXG4gICAgICAgIHN0YXRlKCdlbnRlcicsIHN0eWxlKHtvcGFjaXR5OiAxfSkpLFxuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtvcGFjaXR5OiAwfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgYW5pbWF0ZSgnNDAwbXMgMTAwbXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAsIDAuNTUsIDAuMiknKSksXG4gICAgXSlcbn07XG4iXX0=