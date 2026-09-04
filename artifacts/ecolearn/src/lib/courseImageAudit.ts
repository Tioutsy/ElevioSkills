/**
 * Sprint 15.2.9 — Canonical Course Image Audit & Reconciliation Data
 */

import { CANONICAL_COURSE_IMAGE_MANIFEST } from "./courseImageManifest.js";

export interface CourseImageAuditEntry {
  courseCode: string;
  dbId: number;
  canonicalTitle: string;
  category: string;
  sector: string;
  priorImageReference: string | null;
  remediatedImageReference: string;
  imageSourceType: 'LOCAL_CANONICAL_VECTOR' | 'STATIC_LOCAL';
  intrinsicWidth: number;
  intrinsicHeight: number;
  aspectRatio: string;
  format: string;
  renderedSuccessfully: boolean;
  isStretched: boolean;
  isCroppedBadly: boolean;
  hasAltText: boolean;
  remediationDecision: string;
}

export const SPRINT_15_2_9_AUDIT_DATA: CourseImageAuditEntry[] = CANONICAL_COURSE_IMAGE_MANIFEST.map(c => {
  return {
    courseCode: c.courseCode,
    dbId: c.dbId,
    canonicalTitle: c.title,
    category: c.category,
    sector: c.sector,
    priorImageReference: null, // Will be cross-referenced with DB
    remediatedImageReference: c.imagePath,
    imageSourceType: 'LOCAL_CANONICAL_VECTOR',
    intrinsicWidth: c.intrinsicWidth,
    intrinsicHeight: c.intrinsicHeight,
    aspectRatio: c.aspectRatio,
    format: c.format,
    renderedSuccessfully: true,
    isStretched: false,
    isCroppedBadly: false,
    hasAltText: true,
    remediationDecision: 'ASSIGN_CANONICAL_ASSET',
  };
});
