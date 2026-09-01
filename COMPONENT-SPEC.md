# «Моя история» — Component Specification

## 1. Общие правила

Компоненты должны быть переиспользуемыми и управляемыми через явные props/state.

Не создавать компонент только ради одной декоративной строки.

Компоненты должны отделять данные от представления.

Автосохранение является поведением продукта, а не отдельной кнопкой.

## 2. AppShell

Назначение: общий responsive layout.

Props:
- `children`
- `level`
- `pageContext`

Behavior:
- mobile-first;
- поддерживает общий фон/атмосферу текущего уровня;
- не содержит dashboard sidebar.

## 3. StoryHeader

Props:
- `title`
- `backAction?`
- `action?`

States:
- default;
- compact;
- withBack;
- withAction.

Behavior: минимальный editorial header.

## 4. StoryTimeline

Props:
- `periods`
- `onPeriodOpen`
- `onAddPeriod`

Behavior:
- показывает только релевантные созданные/доступные периоды;
- не превращает пустые периоды в checklist;
- плавно реагирует на изменения.

## 5. PeriodSection

Props:
- `period`
- `cards`
- `onCardOpen`
- `onAddCard`

States:
- populated;
- partially populated;
- empty/hidden according to page context.

Behavior:
- filled cards before empty cards;
- reorder transition when card state changes;
- responsive grid.

## 6. MemoryCard

Props:
- `id`
- `title`
- `year?`
- `memory?`
- `photo?`
- `isEmpty`
- `onOpen`
- `onAddPhoto`

States:
- empty;
- photoOnly;
- photoYear;
- photoMemory;
- photoYearMemory;
- textOnly;
- loading;
- error;
- deleting;
- disabled only when operation requires it.

Behavior:
- click/tap opens editor for existing card;
- empty photo area responds to tap on `+`;
- photo remains dominant.

## 7. MemoryCardEmpty

Можно реализовать как состояние `MemoryCard`, а не отдельный component, если это упрощает архитектуру.

Ключевое поведение:
- large translucent `+` centered in image area;
- no standard `Добавить фото` button;
- title/year/memory remain editable via card interaction.

## 8. AddMemoryCard

Props:
- `onCreate`

Visual:
- subtle editorial affordance `＋ Добавить своё`;
- не выглядит как primary CTA.

## 9. MemorySheet

Props:
- `open`
- `memory`
- `onClose`
- `onChange`
- `onDeletePhoto`
- `onDelete`

Mobile behavior: bottom sheet.
Desktop behavior: centered modal/panel.

States:
- closed;
- opening;
- open;
- saving;
- deleting;
- error.

Accessibility:
- focus management;
- Escape closes;
- focus trap when modal semantics apply;
- screen-reader labels.

## 10. MemoryEditor

Props:
- `title`
- `year`
- `memory`
- `onChangeTitle`
- `onChangeYear`
- `onChangeMemory`

Constraints:
- title <= 30 chars;
- year <= 4 digits;
- memory <= 150 chars.

No submit button for ordinary edits.

## 11. PhotoPicker

Props:
- `onSelect`
- `accept`
- `disabled?`

Behavior:
- triggers native file/photo selection;
- exactly one file/photo per card;
- no multiple selection;
- validates supported image type/size;
- exposes loading/error state.

## 12. PhotoCropper

Props:
- `image`
- `onSave`
- `onCancel`

Behavior:
- drag/pan;
- zoom;
- fixed visual frame determined by design;
- no aspect-ratio choice exposed to user;
- preserves selected crop;
- save immediately applies crop.

States:
- loading;
- editing;
- saving;
- error.

## 13. YearPicker

Props:
- `value?`
- `onChange`
- `min?`
- `max?`

Visual: native-feeling wheel/picker where platform allows; fallback accessible select/dialog on desktop.

Constraints: four digits maximum.

## 14. PhotoDeleteDialog

Props:
- `open`
- `onKeep`
- `onDeleteAll`
- `onCancel`

Copy:
`Удалить фотографию?`

Actions:
- `Оставить` — photo only;
- `Удалить всё` — photo + year + memory.

Do not delete title automatically.

## 15. RecommendationBlock

Purpose: product suggestions without forcing completion.

Visual: editorial suggestion, not alert/card with task styling.

Examples may suggest a period or card, but user can ignore it.

## 16. WowMoment

Props:
- `visible`
- `onViewStory`
- `onContinue`
- `level`

Visibility condition:
- >= 3 distinct filled blocks;
- each has >= 1 photo.

Copy:
`Похоже, уже начинает складываться твоя история…`

Primary:
`✨ Посмотреть мою историю`

Secondary:
`Продолжить собирать историю`

## 17. StoryLevel

Props:
- `level`

Values: 1–4.

No XP, badges, medals, progress percentages.

Effect only:
- atmosphere;
- background tint;
- subtle decorative treatment.

## 18. StoryViewer

Props:
- `story`
- `level`
- `onEdit`

Behavior:
- renders only created content;
- hides empty cards and periods;
- supports smooth scrolling;
- ends with `Продолжение следует…` and `Твоя история ещё пишется.`

## 19. LandingHero

Props:
- `headline`
- `subheadline?`
- `cta`
- `preview`

Primary CTA: `Создать свою историю`.

Must visually demonstrate the finished artifact.

## 20. Generic UI states

Loading:
- use skeleton/soft placeholder only where useful;
- avoid dashboard-like skeleton grids.

Error:
- human wording;
- explain what happened;
- offer one clear recovery action.

Disabled:
- only when operation truly unavailable;
- do not use disabled controls as placeholders.

Success:
- prefer subtle visual confirmation;
- no toast spam.

Hover:
- enhancement only;
- never required to understand or operate the interface.

Focus:
- visible keyboard focus ring with adequate contrast.

## 21. Responsive component rules

Memory grid:
- 360–430: 2 columns when each card remains usable;
- 768–1024: 2–3 columns;
- 1280+: 3–4 columns, capped content width.

MemorySheet:
- mobile bottom sheet;
- desktop centered modal/panel.

StoryViewer:
- mobile single reading flow;
- desktop wider editorial composition.

## 22. Interaction rules

Tap/click card → open editor.

Tap `+` → native photo picker.

Select photo → cropper.

Save crop → photo immediately appears.

Edit text → auto-save.

Close editor → changes already persisted in client state/storage architecture selected for MVP.

Delete photo → confirmation dialog with keep/delete-all distinction.

Filled card becoming empty photo state → card moves to end of period grid with smooth transition.

## 23. Accessibility requirements

All interactive controls require accessible names.

All images require appropriate alt strategy. Decorative images use empty alt; story photos should have meaningful alt when user-provided caption/memory provides context, otherwise a neutral generated description must not invent facts.

Keyboard:
- Tab order logical;
- Enter/Space activate controls;
- Escape closes dialogs/sheets.

Touch targets should be approximately 44x44 CSS px minimum where practical.

Respect reduced motion.
