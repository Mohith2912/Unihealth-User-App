# UniHealth Patient Mobile App

A React Native (Expo) healthcare companion for patients — featuring hospital bed search, doctor appointment booking, emergency triage, pharmacy ordering, OPD queue tracking, and AI symptom consultation.

## 🚀 Quick Start

### React Native Development
```bash
npm install
npx expo start
```

### Web Simulator (No Expo Required)
```bash
# Open index.html directly in your browser, or:
python -m http.server 5003
# Then visit http://localhost:5003
```

The web simulator provides a responsive phone-frame preview with all core patient flows — home, emergency, doctors, pharmacy, queue, and AI consult.

### Demo Access
- **Direct Link**: `http://localhost:5003/?demo=true`
- **Demo Email**: `patient@unihealth.org`
- **Demo Password**: `Patient@2026`

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo SDK) |
| Database | Firebase Realtime Database |
| Auth | Firebase Authentication + SecureStore |
| Design Tokens | Centralized `theme.js` — COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY |
| Web Simulator | Vanilla HTML5/CSS3/JS with mobile phone frame |

## 📋 Patient Features

- **Home Dashboard** — Active prescriptions, emergency triage, quick service grid
- **Doctor Booking** — Specialist search, real-time OPD slot reservation
- **Emergency Triage** — GPS-based nearest hospital ICU/trauma bed availability
- **Pharmacy** — Medicine search, cart, doorstep delivery tracking
- **Live OPD Queue** — Real-time token status with estimated wait time
- **AI Health Assistant** — Symptom triage chatbot with specialist recommendations
- **Family Hub** — Linked family member health profiles and vitals
- **Medical Records** — Lab reports and prescription history

## 🎨 Design System

Built on the **UniHealth Clinical Teal Design System** (`#0891B2`):
- Centralized tokens in [`theme.js`](theme.js)
- 44dp minimum touch targets for accessibility
- Figtree + Noto Sans typography

See [`design-system/MASTER.md`](design-system/MASTER.md) for full documentation.

## 📄 License

Private — UniHealth Healthcare Platform

