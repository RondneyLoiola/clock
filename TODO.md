# Alarm Cards Block During Timer Plan

## Steps:
- [x] 1. Add `toggleAlarmCardsDisabled` function and call it in state change functions in `src/js/alarmScript.js`
- [x] 2. Update alarm card click event listeners to respect disabled state in `src/js/alarmScript.js`
- [x] 3. Add `.alarm-card.disabled` CSS styles in `src/css/styles.css`
- [x] 4. Test and complete

**✅ Task completed!**

Alarm cards now:
- Get `disabled` class when alarm timer starts/runs (play/resume)
- Lose `disabled` class when paused/stopped/reset
- Skip click handler + CSS blocks interaction (pointer-events: none, opacity: 0.5)
- Hover disabled during running state
