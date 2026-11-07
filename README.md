# UniHealth Patient

The patient app is an Expo foundation for the UniHealth platform. It presents service availability and routes patients into approved care journeys; it does not store credentials, medical records, payments, or AI conversations on-device.

## Start locally

```bash
npm install
npm run start
```

Set `EXPO_PUBLIC_API_URL` to the deployed hospital API for a physical device. On web, leave it blank when the app is served by the same origin as the API.

## Product guardrails

- Patient and clinical data must go only to authenticated server endpoints.
- AI assistance must be server mediated, clinically reviewed, logged safely, and able to escalate emergencies.
- Do not add API keys or database credentials to mobile source files or Expo public variables.
- Payments, prescriptions, and medical records remain unavailable until their respective backend controls are implemented and tested.
