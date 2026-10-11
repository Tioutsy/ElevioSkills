# Question-Level Topic Mapping v1

## Overview
This document records the question-to-topic mapping for all active assessment questions across ELEVIO SKILLS (EcoLearn) courses.

## Mapping Strategy
Questions are mapped to controlled taxonomy topics defined in `artifacts/api-server/src/lib/ai/skillsTaxonomy.ts`.
Mapping utilizes:
1. Direct keyword matching against question text.
2. Parent course topic association (`mapCourseToTopics`).
3. Domain fallback for general sustainability assessment items.

## Coverage Metrics

| Metric | Value |
|---|---|
| **Total Active Assessment Questions** | 118 |
| **Mapped Questions** | 118 |
| **Unmapped Questions** | 0 |
| **Coverage Percentage** | **100%** |

## Topic Breakdown

- `sustainability_foundations`: 18 questions
- `waste_management`: 15 questions
- `energy_efficiency`: 14 questions
- `biodiversity`: 12 questions
- `climate_risk`: 10 questions
- `water_conservation`: 8 questions
- `green_office`: 9 questions
- `sustainable_procurement`: 8 questions
- `workplace_responsibility`: 7 questions
- `inclusion_awareness`: 5 questions
- `community_engagement`: 4 questions
- `business_ethics`: 4 questions
- `esg_data`: 4 questions
