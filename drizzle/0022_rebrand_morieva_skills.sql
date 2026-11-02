-- Migration 0022: Rebrand ELEVIO Skills / EcoLearnHub active content strings to Morieva Skills
-- Scope: Idempotent, non-destructive text replacement on courses, lessons, quiz_questions,
--        learning_paths, badge_definitions, and blog_posts.
-- Preserves: All primary keys, course codes (ELH-*), slugs, foreign keys, enrollments,
--            attempt histories, and already-issued certificates.

BEGIN;

-- 1. Update learning_paths default and persisted provider_label
ALTER TABLE "learning_paths" ALTER COLUMN "provider_label" SET DEFAULT 'Morieva Skills';

UPDATE "learning_paths"
SET "provider_label" = CASE
      WHEN "provider_label" = 'Elevio Recommended' THEN 'Morieva Skills Recommended'
      WHEN "provider_label" IN ('Elevio', 'ELEVIO', 'Elevio Skills', 'ELEVIO Skills', 'EcoLearnHub') THEN 'Morieva Skills'
      ELSE regexp_replace("provider_label", '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'gi')
    END,
    "updated_at" = NOW()
WHERE "provider_label" ~* '(elevio|ecolearnhub)';

-- 2. Update courses (description, full_description, badge_name, badge_description)
UPDATE "courses"
SET "description" = regexp_replace(
      regexp_replace("description", '\mElevio''s\M', 'Morieva Skills''', 'g'),
      '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g'
    ),
    "full_description" = CASE
      WHEN "full_description" IS NOT NULL THEN regexp_replace(
        regexp_replace("full_description", '\mElevio''s\M', 'Morieva Skills''', 'g'),
        '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g'
      )
      ELSE "full_description"
    END,
    "badge_name" = CASE
      WHEN "badge_name" IS NOT NULL THEN regexp_replace("badge_name", '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g')
      ELSE "badge_name"
    END,
    "badge_description" = CASE
      WHEN "badge_description" IS NOT NULL THEN regexp_replace(
        regexp_replace("badge_description", '\mElevio''s\M', 'Morieva Skills''', 'g'),
        '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g'
      )
      ELSE "badge_description"
    END,
    "updated_at" = NOW()
WHERE "description" ~* '(elevio|ecolearnhub)'
   OR COALESCE("full_description", '') ~* '(elevio|ecolearnhub)'
   OR COALESCE("badge_name", '') ~* '(elevio|ecolearnhub)'
   OR COALESCE("badge_description", '') ~* '(elevio|ecolearnhub)';

-- 3. Update badge_definitions (name, description)
UPDATE "badge_definitions"
SET "name" = regexp_replace("name", '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g'),
    "description" = regexp_replace(
      regexp_replace("description", '\mElevio''s\M', 'Morieva Skills''', 'g'),
      '\m(ELEVIO Skills|Elevio Skills|ELEVIO|Elevio|EcoLearnHub)\M', 'Morieva Skills', 'g'
    )
WHERE "name" ~* '(elevio|ecolearnhub)'
   OR "description" ~* '(elevio|ecolearnhub)';

-- 4. Update lessons (title, content, content_blocks JSONB)
UPDATE "lessons"
SET "title" = replace("title", 'The Elevio Action-Planning Framework', 'The Morieva Action-Planning Framework'),
    "content" = regexp_replace(
      replace("content", 'The Elevio Action-Planning Framework', 'The Morieva Action-Planning Framework'),
      '\mElevio''s\M', 'Morieva Skills''', 'g'
    ),
    "content_blocks" = CASE
      WHEN "content_blocks" IS NOT NULL THEN (
        regexp_replace(
          replace(
            replace(
              replace(
                replace("content_blocks"::text, 'The Elevio Action-Planning Framework', 'The Morieva Action-Planning Framework'),
                'Elevio''s', 'Morieva Skills'''
              ),
              'Elevio Client', 'Morieva Client'
            ),
            'Elevio Core Sustainability Certificate', 'Morieva Skills Core Sustainability Certificate'
          ),
          '\mElevio (curriculum|catalogue|action register)\M', 'Morieva Skills \1', 'g'
        )
      )::jsonb
      ELSE "content_blocks"
    END
WHERE "title" ~* '(elevio|ecolearnhub)'
   OR "content" ~* '(elevio|ecolearnhub)'
   OR COALESCE("content_blocks"::text, '') ~* '(elevio|ecolearnhub)';

-- 5. Update quiz_questions (question, options JSONB, explanation, option_feedback JSONB)
UPDATE "quiz_questions"
SET "question" = replace("question", 'Elevio Action-Planning Framework', 'Morieva Action-Planning Framework'),
    "options" = (
      replace(
        replace("options"::text, 'Elevio catalogue', 'Morieva Skills catalogue'),
        'Elevio''s', 'Morieva Skills'''
      )
    )::jsonb,
    "option_feedback" = CASE
      WHEN "option_feedback" IS NOT NULL THEN (
        replace("option_feedback"::text, 'Elevio catalogue', 'Morieva Skills catalogue')
      )::jsonb
      ELSE "option_feedback"
    END
WHERE "question" ~* '(elevio|ecolearnhub)'
   OR "options"::text ~* '(elevio|ecolearnhub)'
   OR COALESCE("option_feedback"::text, '') ~* '(elevio|ecolearnhub)';

-- 6. Update blog_posts (author_name)
UPDATE "blog_posts"
SET "author_name" = 'Morieva Skills Editorial',
    "updated_at" = NOW()
WHERE "author_name" = 'Elevio Editorial';

COMMIT;

-- ============================================================================
-- ROLLBACK SQL (if needed to restore pre-migration brand text):
-- BEGIN;
-- ALTER TABLE "learning_paths" ALTER COLUMN "provider_label" SET DEFAULT 'Elevio';
-- UPDATE "learning_paths" SET "provider_label" = 'Elevio Recommended' WHERE "provider_label" = 'Morieva Skills Recommended';
-- UPDATE "blog_posts" SET "author_name" = 'Elevio Editorial' WHERE "author_name" = 'Morieva Skills Editorial';
-- COMMIT;
-- ============================================================================
