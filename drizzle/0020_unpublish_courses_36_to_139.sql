-- Migration 0020: Unpublish all courses from 36 to 139
-- Sets is_published = false and status = 'draft' for all courses with codes ELH-36 through ELH-139 or IDs 36 to 139.

UPDATE "courses"
SET "is_published" = false,
    "status" = 'draft',
    "updated_at" = NOW()
WHERE ("id" >= 36 AND "id" <= 139)
   OR "course_code" ~* '^ELH-(3[6-9]|[4-9][0-9]|1[0-3][0-9])$'
   OR "course_code" IN (
     'ELH-36', 'ELH-37', 'ELH-38', 'ELH-39', 'ELH-40', 'ELH-41', 'ELH-42', 'ELH-43', 'ELH-44', 'ELH-45',
     'ELH-46', 'ELH-47', 'ELH-48', 'ELH-49', 'ELH-50', 'ELH-51', 'ELH-52', 'ELH-53', 'ELH-54', 'ELH-55',
     'ELH-56', 'ELH-57', 'ELH-58', 'ELH-59', 'ELH-60', 'ELH-61', 'ELH-62', 'ELH-63', 'ELH-64', 'ELH-65',
     'ELH-66', 'ELH-67', 'ELH-68', 'ELH-69', 'ELH-70', 'ELH-71', 'ELH-72', 'ELH-73', 'ELH-74', 'ELH-75',
     'ELH-76', 'ELH-77', 'ELH-78', 'ELH-79', 'ELH-80', 'ELH-81', 'ELH-82', 'ELH-83', 'ELH-84', 'ELH-85',
     'ELH-86', 'ELH-87', 'ELH-88', 'ELH-89', 'ELH-90', 'ELH-91', 'ELH-92', 'ELH-93', 'ELH-94', 'ELH-95',
     'ELH-96', 'ELH-97', 'ELH-98', 'ELH-99', 'ELH-100', 'ELH-101', 'ELH-102', 'ELH-103', 'ELH-104', 'ELH-105',
     'ELH-106', 'ELH-107', 'ELH-108', 'ELH-109', 'ELH-110', 'ELH-111', 'ELH-112', 'ELH-113', 'ELH-114', 'ELH-115',
     'ELH-116', 'ELH-117', 'ELH-118', 'ELH-119', 'ELH-120', 'ELH-121', 'ELH-122', 'ELH-123', 'ELH-124', 'ELH-125',
     'ELH-126', 'ELH-127', 'ELH-128', 'ELH-129', 'ELH-130', 'ELH-131', 'ELH-132', 'ELH-133', 'ELH-134', 'ELH-135',
     'ELH-136', 'ELH-137', 'ELH-138', 'ELH-139'
   )
   OR "id" IN (
     -- Canonical catalogue IDs for ELH-36 through ELH-136
     808, 809, 724, 810, 725, 726, 744, 745, 772, 727, 746, 811,
     711, 712, 728, 729, 747, 773, 774, 713, 748, 714, 715, 730,
     749, 731, 716, 732, 750, 775, 776, 733, 734, 751, 752, 735,
     753, 777, 778, 736, 737, 754, 755, 738, 756, 757, 779, 717,
     739, 718, 740, 761, 762, 780, 781, 763, 782, 764, 783, 741,
     758, 759, 760, 765, 766, 767, 784, 785, 786, 787, 788, 789,
     790, 791, 792, 793, 794, 795, 796, 797, 798, 719, 720, 768,
     799, 721, 722, 769, 800, 801, 802, 803, 723, 804, 805, 742,
     770, 743, 806, 807, 771
   );
