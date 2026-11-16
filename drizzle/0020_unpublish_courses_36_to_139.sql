-- Migration 0020: Unpublish all courses as from ELH-36 and keep only ELH-01 to ELH-35 published

-- 1. Unpublish any course that is NOT ELH-01 through ELH-35
UPDATE "courses"
SET "is_published" = false,
    "status" = 'draft',
    "updated_at" = NOW()
WHERE ("course_code" NOT IN (
  'ELH-01', 'ELH-02', 'ELH-03', 'ELH-04', 'ELH-05', 'ELH-06', 'ELH-07', 'ELH-08', 'ELH-09', 'ELH-10',
  'ELH-11', 'ELH-12', 'ELH-13', 'ELH-14', 'ELH-15', 'ELH-16', 'ELH-17', 'ELH-18', 'ELH-19', 'ELH-20',
  'ELH-21', 'ELH-22', 'ELH-23', 'ELH-24', 'ELH-25', 'ELH-26', 'ELH-27', 'ELH-28', 'ELH-29', 'ELH-30',
  'ELH-31', 'ELH-32', 'ELH-33', 'ELH-34', 'ELH-35'
) OR "course_code" IS NULL);

-- 2. Ensure all courses ELH-01 through ELH-35 are published
UPDATE "courses"
SET "is_published" = true,
    "status" = 'published',
    "updated_at" = NOW()
WHERE "course_code" IN (
  'ELH-01', 'ELH-02', 'ELH-03', 'ELH-04', 'ELH-05', 'ELH-06', 'ELH-07', 'ELH-08', 'ELH-09', 'ELH-10',
  'ELH-11', 'ELH-12', 'ELH-13', 'ELH-14', 'ELH-15', 'ELH-16', 'ELH-17', 'ELH-18', 'ELH-19', 'ELH-20',
  'ELH-21', 'ELH-22', 'ELH-23', 'ELH-24', 'ELH-25', 'ELH-26', 'ELH-27', 'ELH-28', 'ELH-29', 'ELH-30',
  'ELH-31', 'ELH-32', 'ELH-33', 'ELH-34', 'ELH-35'
);
