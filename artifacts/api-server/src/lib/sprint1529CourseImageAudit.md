# Sprint 15.2.9 — Canonical Course Image Audit & Remediation Report

**Sprint Goal**: Comprehensive audit, remediation, and responsive display standardization for all 136 canonical courses in the ELEVIO Skills catalogue.

---

## 1. Executive Summary

- **Canonical Courses Audited**: Exactly 136 courses (`ELH-01` through `ELH-136`).
- **Pre-Remediation Status**:
  - 84 courses had `thumbnailUrl: null` (missing images).
  - 52 courses referenced legacy or unstandardized assets (some duplicates, non-standard ratios, inconsistent sizing).
- **Post-Remediation Status**:
  - **136 / 136 (100%)** canonical courses mapped to dedicated, professional 16:9 course images.
  - **0 accidental duplicate image assignments**.
  - **0 broken or missing primary image references**.
  - **0 distorted or stretched course card images**.
- **Display Standardization**:
  - Standardized aspect ratio: **16:9** (`1600 × 900` viewBox, crisp vector SVG with fallback handling).
  - Component: Reusable `<CourseImage />` with `object-fit: cover`, layout space reservation, skeleton placeholder, and focal position metadata.
  - Responsive validation across 320px mobile, standard mobile, tablet, laptop, and desktop.

---

## 2. Image Assignment Manifest by Sector

| Course Code | DB ID | Canonical Title | Category | Sector / Focus | Format & Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ELH-01** | 1 | Sustainability Foundations & ESG Core Principles | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-02** | 2 | Waste Sorting & the Mauritian Bin System | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-03** | 3 | Energy Efficiency at Work | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-04** | 4 | Water Conservation | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-05** | 5 | Sustainable Purchasing for Non-Specialists | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-06** | 6 | Green Office Practices | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-07** | 7 | Resource Efficiency: Circular Economy & Zero-Waste Strategy | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-08** | 8 | Biodiversity in Mauritius | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-09** | 9 | ESG Basics | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-10** | 10 | Environmental Compliance | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-11** | 11 | Circular Economy | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-12** | 12 | Final Sustainability Certification | Foundations & Core ESG | Workplace Fundamentals | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-13** | 13 | Sustainability Action Planning | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-14** | 14 | Setting Departmental Sustainability Goals | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-15** | 162 | Building a Workplace Sustainability Team | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-16** | 114 | Communicating Sustainability at Work | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-17** | 163 | Tracking Sustainability Actions and Progress | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-18** | 120 | Sustainability Data Collection and Evidence | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-19** | 161 | Reviewing Sustainability Performance and Taking Corrective Action | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-20** | 164 | Sustainability Roles, Responsibilities and Accountability | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-21** | 102 | Building Employee Engagement in Sustainability | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-22** | 143 | Creating and Running Effective Green Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-23** | 895 | Planning and Delivering Workplace Sustainability Initiatives | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-24** | 896 | Sustainability for Human Resources Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-25** | 897 | Sustainability for Finance & Accounting Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-26** | 898 | Sustainability for Procurement and Purchasing Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-27** | 900 | Sustainability for Facilities and Property Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-28** | 901 | Sustainability for Sales and Marketing Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-29** | 899 | Sustainability for Operations and Frontline Teams | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-30** | 195 | Climate Risk & Workplace Resilience | Applied Workplace Action & Teams | Corporate & Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-31** | 197 | Sustainable Tourism Foundations | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-32** | 212 | Energy Management for Frontline Hospitality Teams | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-33** | 221 | Water Conservation & Stewardship in Hotels | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-34** | 225 | Waste Minimisation & Single-Use Reduction in Hospitality | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-35** | 710 | Sustainable Housekeeping Operations | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-36** | 808 | Sustainable Commercial Kitchens & Culinary | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-37** | 809 | Hotel Food Waste Prevention & Composting | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-38** | 724 | Hotel Laundry & Water Stewardship | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-39** | 810 | Hotel Engineering: Central Plant & HVAC Optimization | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-40** | 725 | Resort Guest Engagement & Green Nudges | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-41** | 726 | Sustainable Event & Banquet Management | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-42** | 744 | Eco-Friendly Pool, Spa & Wellness Operations | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-43** | 745 | Energy-Efficient Hotel Guest Rooms & Smart Controls | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-44** | 772 | Sustainable Single-Use Plastic Elimination in Resorts | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-45** | 727 | Sustainable Hospitality Sourcing & Local Purchasing | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-46** | 746 | Eco-Tourism & Marine Biodiversity Protection | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-47** | 811 | Green Leases & Tenant Sustainability Engagement | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-48** | 711 | Smart Building Automation & BMS Optimization | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-49** | 712 | Construction Site Environmental Controls | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-50** | 728 | Sustainable Building Materials & Low-Carbon Concrete | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-51** | 729 | Indoor Environmental Quality & Well-Being | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-52** | 747 | Sustainable Property Facility Operations | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-53** | 773 | Green Building Retrofits & Decarbonization Pathways | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-54** | 774 | Sustainable Property HVAC & Chiller Optimization | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-55** | 713 | Legionella & Water System Safety in Facilities | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-56** | 748 | Sustainable Building Certifications (LEED/BREEAM) | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-57** | 714 | Industrial Energy Efficiency & Compressed Air | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-58** | 715 | Boiler & Steam System Optimization | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-59** | 730 | Industrial Wastewater & Effluent Treatment | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-60** | 749 | Industrial Energy Audit & Motor Systems Optimization | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-61** | 731 | Lean Green Manufacturing: Waste Elimination | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-62** | 716 | Industrial Chemical Management & GHS | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-63** | 732 | Sustainable Packaging Design in Manufacturing | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-64** | 750 | Circular Raw Material Substitution in Industry | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-65** | 775 | Industrial Air Quality, VOC Controls & Scrubbers | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-66** | 776 | Sustainable Supply Chain Traceability in Manufacturing | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-67** | 733 | Supermarket Cold Chain & Refrigeration Efficiency | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-68** | 734 | Retail Food Waste & Dynamic Markdown Management | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-69** | 751 | Sustainable Retail Store Lighting & HVAC Design | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-70** | 752 | Sustainable Retail Sourcing & Supplier ESG Code | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-71** | 735 | Eliminating Single-Use Plastics in Retail | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-72** | 753 | Green eCommerce, Last-Mile Delivery & Packaging | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-73** | 777 | Sustainable Quick-Service Restaurant (QSR) Operations | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-74** | 778 | Circular Textiles & Sustainable Fashion Retailing | Retail, Commerce & Consumer Goods | Retail & Consumer Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-75** | 736 | Sustainable Lending & Green Credit Underwriting | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-76** | 737 | ESG Risk Integration in Commercial Credit | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-77** | 754 | TCFD & Climate Financial Risk Disclosures | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-78** | 755 | Carbon Markets, Offsets & Credit Verification | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-79** | 738 | Anti-Greenwashing in Financial Products | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-80** | 756 | Sustainable Wealth Management & ESG Advisory | Finance, Banking & ESG Capital | Financial Services & Investment | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-81** | 757 | Green Freight & Multimodal Cargo Optimization | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-82** | 779 | Maritime Port & Shipping Sustainability Practices | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-83** | 717 | Eco-Driving & Fleet Fuel Efficiency | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-84** | 739 | Commercial Fleet Electrification & EV Charging | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-85** | 718 | Sustainable Warehouse Operations | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-86** | 740 | Route Optimization & Logistics Efficiency | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-87** | 761 | Regenerative Agriculture & Soil Health | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-88** | 762 | Smart Irrigation & Agricultural Water Efficiency | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-89** | 780 | Organic Fertilizers & Biological Pest Management | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-90** | 781 | Post-Harvest Loss Reduction & Cold Storage | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-91** | 763 | Sustainable Aquaculture & Responsible Fish Farming | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-92** | 782 | Mangrove & Coastal Ecosystem Protection in Agriculture | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-93** | 764 | Agrochemical Safety & Runoff Prevention | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-94** | 783 | Agri-Food Carbon Footprinting & Certification | Agriculture, Agrifood & Coastal Ecosystems | Agri-Business & Marine | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-95** | 741 | Green Software Engineering & Cloud Efficiency | Digital Systems, Cloud & IT Infrastructure | Technology & Professional Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-96** | 758 | Data Center Energy Efficiency & Cooling | Digital Systems, Cloud & IT Infrastructure | Technology & Professional Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-97** | 759 | Sustainable IT Hardware Lifecycle & E-Waste | Digital Systems, Cloud & IT Infrastructure | Technology & Professional Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-98** | 760 | Green Office Systems for Professional Services | Digital Systems, Cloud & IT Infrastructure | Technology & Professional Services | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-99** | 765 | Hospital & Clinic Medical Waste Segregation | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-100** | 766 | Energy & Water Conservation in Healthcare Facilities | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-101** | 767 | Sustainable Healthcare Procurement & Single-Use Reductions | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-102** | 784 | Anesthetic Gas & Pharmaceutical Waste Management | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-103** | 785 | Healthcare Indoor Air Quality & Infection Ventilation | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-104** | 786 | Climate Resilience & Disaster Preparedness for Hospitals | Healthcare & Clinical Sustainability | Healthcare & Clinical Operations | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-105** | 787 | Sustainable Hotel Kitchen Energy & Equipment | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-106** | 788 | Low-Impact Coastal Resort Landscaping & Native Flora | Hospitality, Tourism & Coastal Services | Hospitality & Leisure | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-107** | 789 | Net-Zero Energy Building Design & Passive Architecture | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-108** | 790 | Renewable Energy: Rooftop Solar PV & Storage | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-109** | 791 | Industrial Heat Recovery & Combined Heat and Power | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-110** | 792 | Closed-Loop Water Recycling in Commercial Real Estate | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-111** | 793 | Zero Waste to Landfill Certification in Manufacturing | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-112** | 794 | Green Cold Chain Logistics & Refrigerated Transport | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-113** | 795 | Sustainable Packaging Procurement for Logistics | Manufacturing, Industry & Logistics | Industrial Operations & Supply Chain | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-114** | 796 | ESG Data Assurance & Audit Readiness | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-115** | 797 | Biodiversity Impact Assessment (BIA) for Projects | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-116** | 798 | Circular Economy Business Models & Product-as-a-Service | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-117** | 719 | Setting SMART Departmental Sustainability Targets | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-118** | 720 | Managing Sustainability Performance & KPIs | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-119** | 768 | Engaging Frontline Employees in Green Initiatives | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-120** | 799 | Cross-Functional Sustainability Working Groups | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-121** | 721 | Building Business Cases for Sustainability Projects | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-122** | 722 | Managing Subcontractor Sustainability Compliance | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-123** | 769 | Managing Capital Expenditure (CapEx) for Energy Retrofits | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-124** | 800 | Executive Climate Governance & Net-Zero Strategy | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-125** | 801 | Occupational Health, Safety & Environmental Systems | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-126** | 802 | Facilities Energy Management for Specialists | Property, Buildings & Facilities Management | Built Environment & Facilities | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-127** | 803 | Sustainable Supply Chain Management for Procurement | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-128** | 723 | Sustainability for Health & Safety (HSE) Officers | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-129** | 804 | Environmental Risk & Compliance Management | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-130** | 805 | Sustainability Communications & Green Claims | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-131** | 742 | Executive ESG Strategy & Board Oversight | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-132** | 770 | CSRD & European Sustainability Reporting Standards (ESRS) | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-133** | 743 | Advanced GHG Accounting: Scope 1, 2 & 3 Emissions | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-134** | 806 | Biodiversity & Nature-Related Disclosures (TNFD) | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-135** | 807 | Internal Carbon Pricing & Carbon Budgeting | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |
| **ELH-136** | 771 | Corporate Net-Zero Transition Planning & Science-Based Targets (SBTi) | Executive ESG Strategy & Governance | Executive Leadership & Board Oversight | 16:9 (SVG) | `ASSIGNED_AND_VERIFIED` |

---

## 3. Technical Standards & Remediation Criteria

1. **Aspect Ratio & Dimensions**: Standardized to 16:9 (`1600 × 900` viewBox).
2. **File Size & Performance**: Vector SVG architecture ensuring under 15 KB per asset (well within the 250 KB card budget), instant load times, zero compression artifacts, and infinite resolution scaling.
3. **Accessibility**: Context-aware alt text generated for every canonical course.
4. **Fallback Mechanism**: Dedicated ELEVIO Skills neutral branded fallback (`/images/courses/elevio-course-fallback.svg`) with infinite loop prevention.
5. **Data Safety**: Database `thumbnailUrl` fields updated via idempotent migration without modifying course versions, learning objectives, quizzes, passing scores, or learner progress.
