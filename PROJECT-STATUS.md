# PROJECT STATUS — Моя история

## Current Stage

Visual Foundation — completed.

Current technical stage:
Project workflow and documentation checkpoint.

Next major product stage:
Creation Flow.

## Product State

«Моя история» — mobile-first web product that helps a person turn photographs and short memories into a beautiful digital story of their life.

Core principle:
The user chooses the content; the product offers the structure.

Core feeling:
"I am remembering my life" rather than "I am filling out an application."

Core emotional result:
"Wow. This is my life."

## Implemented

- Landing page
- «Моя история» main screen
- Period screen
- AppShell (responsive layout)
- StoryHeader
- PeriodSection
- MemoryCard (all visual states)
- AddMemoryCard
- mobile-first layout
- responsive grid (2 → 3 → 4 columns)
- Warm Editorial visual style
- photo-dominant cards
- empty cards with translucent `+`
- "Add your own" card
- different card states (empty, photo only, photo+year, photo+memory, photo+year+memory, text only)
- smooth transitions
- prefers-reduced-motion support
- local SVG image placeholders
- mock data (mockStory)

Specific fixes:
- AddMemoryCard geometry bug fixed.
- Aspect ratio 4:5 applied only to the media area.
- All cards have consistent geometry.

## Validation

The existing implementation has been verified at:
- 360 px
- 390 px
- 430 px
- 768 px
- 1280 px
- 1440 px

`npm run build` passes successfully.

## Product Decisions — Do Not Change Without Approval

- One photo per one card.
- User crops the photo themselves inside the future frame.
- No video in MVP.
- Title: max 30 characters.
- Year: max 4 digits.
- Memory: max 150 characters.
- Deleting a photo does not delete the card.
- Bottom sheet on mobile.
- Autosave.
- Approved periods: До меня, Детство, Школа, Юность, Начало взрослой жизни, Взрослая жизнь Сегодня, Продолжение следует…
- Approved thematic blocks: Мои люди, Моё дело, Мои увлечения, Мои путешествия, Мои места, То чем я горжусь, Мои питомцы, Важные события, Мои достижения.
- Wow moment (≥3 filled blocks, each with ≥1 photo).
- Visual levels 1–4 (atmosphere only, no gaming UI).
- No gaming UI, no XP, no badges, no medals, no progress percentages.

## Next Product Stage

Creation Flow

First UX fragment:

Landing
↓
"Создать свою историю"
↓
start of creation
↓
first period
↓
first cards
↓
user begins choosing what to fill in

At this stage, do NOT implement real photo upload and cropper.

Photo upload + cropper is a separate subsequent stage.

## Current Task

Project workflow checkpoint:
- update AGENTS.md;
- create PROJECT-STATUS.md;
- verify documents;
- build;
- Git checkpoint.

## Next Steps

1. Complete documentation/workflow checkpoint.
2. Verify Git checkpoint.
3. Begin UX design of Creation Flow.
4. Implement the first fragment of Creation Flow.
5. Verify UX.
6. Then separately implement photo upload/cropper.

## Technical Stack

- React + TypeScript
- Vite
- CSS (no CSS-in-JS)
- Local state (no backend)
- Mock data

## Key Files

- `src/App.tsx` — routing
- `src/pages/Landing.tsx` — landing page
- `src/pages/StoryScreen.tsx` — main story screen
- `src/pages/PeriodScreen.tsx` — period screen
- `src/components/AppShell.tsx` — responsive layout shell
- `src/components/StoryHeader.tsx` — editorial header
- `src/components/PeriodSection.tsx` — period with card grid
- `src/components/MemoryCard.tsx` — memory card component
- `src/components/AddMemoryCard.tsx` — add custom card
- `src/data/mockStory.ts` — mock data
- `src/types/index.ts` — TypeScript types
