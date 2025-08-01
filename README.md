# Pi Calculator App (React Native + Expo)

A production-grade, type-safe React Native app built with Expo. This app connects to a backend service that calculates the value of π (Pi) and showcases how to build scalable, maintainable mobile architecture with first-class TypeScript support.

## Features

This project isn't just a demo, it's **production ready and extensible**.

### Developer Experience & Architecture

- **Custom navigation layer** for improved DX (better than file-based routing)
- **Zustand** for state management, with **MMKV persistence wrapper**
- **Separation of concerns**: API client, endpoints, models, providers, and repositories — like a real backend SDK
- **Premade common components** — all extended from `react-native` for consistency and reusability
- **Internationalization & Localization**, built-in
  - **Type-safe** i18n using TypeScript “black magic” (auto-detect keys, prevent typos)
- **Full theming system**:
  - Light/Dark modes (read from system)
  - Centralized spacing & color tokens
  - Theme available everywhere via context
- **Error Boundary** with friendly UI and reset option
- **Type-safe from top to bottom**


## Production-Ready Toolkit

| Tool/Area         | Details                                                                 |
|------------------|-------------------------------------------------------------------------|
| 🛠 Config         | Separate `env` loaders for dev & prod builds                            |
| 📦 Local Storage  | Fully configured MMKV storage + Zustand integration                     |
| 🕓 Date Utils     | Built-in formatter using standard lib / custom helpers                  |
| ⚓️ Common Hooks   | `useSafeArea`, `useIsMounted` and more                                 |
| 📚 Component Lib  | All UI built with shared design system + constants                      |
| 📱 Navigation     | Custom-built router for intuitive, DX-friendly screen management        |
| 🔌 API Layer      | Decoupled layers: `client` → `endpoints` → `models` → `repo` → `hooks`  |


## App Functionality

* **Calculate Pi with increasing accuracy**

  * Server continuously computes Pi to greater precision
  * Supports **Pause**, **Resume**, and **Reset** of the calculation

* **Solar System Circumference Calculator**

  * Dynamically calculates the **Sun**, **Earth**, and **Mars** circumferences
  * Precision updates in real-time based on current Pi value
  * Toggle units between **kilometers** and **miles**

* **Reactive Shared State**

  * State is shared and synchronized across all screens
  * Any update to Pi or units reflects instantly across relevant views


## 📦 Stack

- [Expo SDK](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [MMKV](https://github.com/mrousavy/react-native-mmkv)


## ▶️ Running the App

* Use `npm install` to install dependencies
* Start the app with `npx expo run:android`
* If using the **provided APK**, it’s already linked to a hosted production backend — no setup required.


### 🛠️ Custom Backend (optional)

To use your own local backend server:

* Create a `.env` file
* Set `API_BASE_URL` to your backend endpoint, e.g.:

```env
API_BASE_URL=http://192.168.0.X:4000
```


## Structure Overview

```
app/
├── components/     # Premade extended RN components (type-safe, styled, i18n-ready)
├── config/         # environment configs, dev/prod switches
├── i18n/           # Fully type-safe internationalization setup
├── navigators/     # Custom navigation system with enhanced DX
├── screens/        # Screen-level views (Pi Calculator, Solar System, etc.)
├── services/       # API clients, endpoints, repositories
├── theme/          # Light & dark mode tokens, spacing, context access
├── utils/          # Formatters, hooks, helpers (e.g. `useSafeArea`, `useIsMounted`)
└── app.tsx         # App root — wires providers, theme, navigation
```

### Caveats

* Due to backend design constraints, **all Pi calculation state is shared globally**.
  That means:

  > “One person resets = everyone’s calculation resets.”
  > This will be addressed in future iterations.


## License

MIT — but really this is more a template than a product.


## Author

Built by [Posei](https://github.com/posei) — made to demonstrate production-grade mobile architecture, not just build an app.

