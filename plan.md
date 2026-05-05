# Plan - LEO-26: Change Model to a Family

We are shifting the core "experts" from individual professionals to a specific family living in Cambridge: Andy (Dad, IT), Teresa (Mom, Doctor), and their three boys Alex (10), Max (7), and Leo (4).

## 1. Schema Changes
The `Expert` model currently represents individuals. While we could create separate `Expert` records for Andy and Teresa, the request implies a shift in *direction* to "core contributor, a family". 
- I will keep the `Expert` model but update the seed data and existing records to reflect the families' identities.
- I will add a `familyMember` or `bio` update to specify which family member is the primary author of a guide.

## 2. Seed Data Update (`prisma/seed.ts`)
- Remove or deprioritize old generic experts (Amelia, Priya, Oliver, etc.).
- Add the family:
    - **Andy** (Father, IT Professional)
    - **Teresa** (Mother, Doctor)
    - **Alex** (10)
    - **Max** (7)
    - **Leo** (4)
- Assign existing and new guides to Andy and Teresa.

## 3. Frontend Updates
- **Homepage (`src/app/page.tsx`)**: Update the "Meet the experts" section to highlight the family rather than a collection of different professionals.
- **Expert Profiles**: Update slugs and display names.

## 4. Content Migration
- Existing guides attributed to Amelia, Priya, etc., will be reassigned to Andy or Teresa where the topic fits (e.g., Teresa for healthcare/schools, Andy for tech/cycling).
- Add new guides or placeholders that fit the family perspective (e.g., "Best playgrounds in Cambridge" by Max).

## Next Actions
1. Update `prisma/seed.ts` with the new family members and reassign guides.
2. Run `npm run seed` (or equivalent) to update the database.
3. Update `src/app/page.tsx` and other UI components to reflect the "Family" focus.
