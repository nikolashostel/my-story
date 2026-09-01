# AGENTS.md — Development Rules for «Моя история»

## ROLE

OpenCode is the AI coder for this project.

OpenCode implements tasks but does not make product decisions independently.

If an existing requirement is ambiguous or contradicts a new request, stop and ask the user for a decision.

## SOURCE OF TRUTH

Priority order:

1. Explicit current decision from the user.
2. `PRD.md` — product requirements.
3. `VISUAL-DESIGN.md` — visual requirements.
4. `COMPONENT-SPEC.md` — component specifications.
5. `AGENTS.md` — development rules.
6. `PROJECT-STATUS.md` — current project state.
7. Code — actual current implementation.
8. Git history — change history.

Important:
- `PROJECT-STATUS.md` describes where the project is now.
- Git describes what changes were actually made.
- Documents must not automatically overwrite each other.
- If documents contradict each other, do not guess the resolution.

## WORKFLOW

Before a significant task:

1. Read `PROJECT-STATUS.md`.
2. Identify related requirements in `PRD.md`.
3. If needed, read `VISUAL-DESIGN.md`.
4. If needed, read `COMPONENT-SPEC.md`.
5. Study the current implementation of related files.
6. Check `git status`.
7. Formulate a minimal change plan.
8. Only then modify code.

## SCOPE CONTROL

- Do not add functionality that is not in the task.
- Do not do unrelated refactoring.
- Do not change architecture without necessity.
- Do not change UX/product decisions without explicit agreement.
- Prefer minimal changes to existing implementation.

## PRODUCT SAFETY

Strictly observe existing project decisions:

- MVP supports only one photo per card.
- No video in MVP.
- No multiple upload.
- No gaming mechanics.
- No XP, badges, medals, or achievement UI.
- Do not turn the product into a SaaS/dashboard/photo archive.
- No AI features without a separate requirement.
- Do not change the approved Warm Editorial / Premium Editorial visual concept.

## MVP HARD CONSTRAINTS

1. One memory card supports exactly **one photo**.
2. No video in MVP.
3. No multiple upload, galleries, or collages.
4. No AI features without a separate requirement.
5. No sharing, PDF export, or social features without a separate requirement.
6. No XP, badges, medals, streaks, or other gaming mechanics.
7. No progress percentages.
8. Do not turn the interface into a dashboard/SaaS.
9. No "Done" button for ordinary editing — changes must save automatically.
10. Do not show aspect ratio choice to the user during crop.
11. Do not replace the large translucent `+` with a standard "Add photo" button.
12. Do not delete a card just because the photo was deleted.

## PRIORITIES

If there is a conflict:
1. Security/correctness.
2. PRD.
3. Visual Design Specification.
4. Component Specification.
5. Existing project architecture.
6. Implementation convenience.

Do not change product decisions independently. If a contradiction between requirements is found, stop and report it to the user.

## UX

The user should feel they are assembling the story of their life, not filling out an application.

The empty state should not look like an error or unfinished task.

Photographs are the primary visual element.

## VISUAL STYLE

Use the `Warm Editorial / Human Memory` direction:
- warm light paper/ivory background;
- calm muted palette;
- high-quality Cyrillic;
- editorial typography;
- soft shadows;
- moderate radii;
- minimal decorative UI;
- ordinary user photos should look natural.

Do not use:
- glassmorphism as the main style;
- neon;
- excessive gradients;
- gaming effects;
- heavy dashboard cards;
- excessive luxury/glamour.

## CODE

Write simple, maintainable code.

Do not create premature complex architecture.

Do not add dependencies without necessity.

Reuse components.

Maintain typing if the chosen stack supports it.

## WORKING WITH CHANGES

Before a major change:
- check existing code;
- find affected components;
- do not rewrite the entire project without necessity.

After a change:
- run available lint/typecheck/test/build commands;
- fix obvious errors;
- check responsive behavior.

## WORKING WITH THE USER

Do not ask the user to write code if the task can be performed by the agent.

If information is missing from the specification, ask a specific question.

Do not claim a function is implemented until it is verified.

## DEFINITION OF DONE

A function is considered complete when:
- it matches the PRD;
- it matches the visual design;
- it matches the component behavior;
- it works on mobile and desktop within the specification;
- there are no obvious console/build/type errors;
- accessibility basics are observed;
- no extra functionality has been added.

## VALIDATION

After a significant change:
1. Check `git diff`.
2. Run `npm run build`.
3. If possible, visually verify the application in the browser.
4. Check for the absence of obvious regressions.
5. Only after successful verification consider the task complete.

## DOCUMENTATION

After a significant functional milestone:
- update `PROJECT-STATUS.md`;
- note what was done;
- note what is currently in progress;
- note the next milestone;
- note important constraints/decisions that must not be violated.

## GIT WORKFLOW

Before starting a change:
- check `git status`;
- do not overwrite others' uncommitted changes;
- if the working tree contains unexpected changes, stop and report.

After a significant completed milestone:
1. `npm run build`
2. `git diff`
3. `git status`
4. `git add` only files related to the task
5. `git commit` with a clear message
6. `git push` to the current working branch

Do not force push.
Do not rewrite history without explicit permission.

## CHECKPOINT PRINCIPLE

Every significant milestone must end with a verifiable Git checkpoint.

If the result is unsatisfactory:
- do not continue to the next feature;
- use git history to return to the last stable checkpoint;
- do not delete Git history.

## AI BEHAVIOR

- Do not invent requirements.
- Do not "improve" the product on your own initiative.
- Do not add placeholder functionality if it is not needed.
- Do not hide errors.
- If the task is unclear — ask first.
- If the task is clear — execute it in the minimal way.
