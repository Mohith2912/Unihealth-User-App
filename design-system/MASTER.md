# UniHealth Mobile App — UI/UX Pro Max Healthcare Design System

Architected using the **UI/UX Pro Max React Native skill** guidelines for clinical patient experience, OPD token routing, pharmacy search, emergency response, and telemedicine.

---

## 1. Visual Identity & Foundations

- **Domain**: Comprehensive Patient Healthcare & Clinical Operations App
- **Primary Color**: Clinical Teal (`#0891B2` / Cyan-600)
- **Secondary Colors**: Cyan Light (`#22D3EE`), Deep Cyan (`#0E7490`), Navy Base (`#0F172A`)
- **Semantic Colors**:
  - Success / Active / Ready: Emerald (`#16A34A`), Light (`#DCFCE7`)
  - Warning / Triage Pending: Amber (`#D97706`), Light (`#FEF3C7`)
  - Emergency / Urgent Care: Crimson (`#DC2626`), Light (`#FEE2E2`)
- **Neutral Surfaces**:
  - App Background: Slate-50 (`#F8FAFC`) / Clinical Tint (`#F0FDFA`)
  - Cards & Modals: Pure White (`#FFFFFF`) with subtle cyan border accents
  - Borders: Slate-200 (`#E2E8F0`) / Slate-300 (`#CBD5E1`)
  - Typography: Slate-900 (`#0F172A`) for headings, Slate-500 (`#64748B`) for helper text

---

## 2. Token Architecture (`theme.js`)

```javascript
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY, MIN_TOUCH } from './theme';
```

- **Touch Target Rule**: All touchables have minimum height `44dp` (`MIN_TOUCH = 44`) to guarantee WCAG AAA compliance on all Android and iOS device viewports.
- **Elevation & Shadows**: Multi-layered soft drop shadows (`shadowColor: '#0891B2'`, `shadowOpacity: 0.08`, `elevation: 3`) providing clinical warmth without visual clutter.
- **Rhythm**: Consistent 8px grid (`SPACING.sm = 8`, `md = 12`, `lg = 16`, `xl = 20`, `xxl = 24`, `hero = 40`).

---

## 3. Rebuilt & Refined Mobile Screens

| Screen | Core Enhancements Applied |
| :--- | :--- |
| **`index.js` (Login)** | 2-tone clinical header with linear gradient (`#0891B2` to `#0E7490`), clean elevated card, remember-me credential sync, and eye toggle. |
| **`RegisterScreen.js`** | Step-by-step progress tracker, Aadhar & biometric verification flows, clinical section headers, and accessible inputs. |
| **`PatientHome.js`** | Daily pulse greeting, quick 4-way triage grid, live emergency SOS floating pill, and real-time hospital status integration. |
| **`PharmacySearch.js`** | Medicine catalog cards, category chips, prescription upload modal, and live cart bar. |
| **`AIConsult.js`** | Clinical AI dialogue bubbles, disclaimer banner, and interactive symptoms input. |
| **`BookingScreen.js`** | Doctor specialty avatar, appointment slot selector grid, and live hospital token generation. |
| **`Checkout.js`** | Cold-chain logistics badge, instant vs scheduled delivery selector, itemized bill breakdown, and secure payment. |
| **`HospitalGeneralScreen.js`** | Operational hospital overview, OPD slots, on-duty care specialists list, and direct consultation booking. |
| **`NearbyHospitalsScreen.js`** | Real-time distance calculation, traffic indicators, and priority ranking. |
| **`EmergencyDashboard.js`** | High-urgency crimson styling, SOS trigger, and immediate hospital routing. |
| **`TokenDashboard.js`** | OPD queue tracker, now-serving badge, and live consultation status updates. |
| **`FamilyHub.js`** | Family medical profiles, relation chips, blood group indicators, and cloud records storage. |
| **`LabTestCart.js`** | Diagnostic package cards, test details pills, and one-tap checkout. |
| **`OrderTracking.js`** | Interactive animated motorbike tracking timeline, temperature sensors, and ETA countdown. |
| **`OrderSuccess.js`** | Pharmacist digital signature badge, cold-chain temperature verification, and location tracker action. |

---

## 4. Preservation of Real-time Logic & Data

- 100% preservation of Firebase Realtime Database paths (`Hospitals/...`, `tokens/...`, `orders/...`, `patients/...`).
- 100% preservation of Firebase Authentication session states and Expo SecureStore credential caching.
- Zero breaking changes to existing navigation parameters, callbacks, or business rules.
