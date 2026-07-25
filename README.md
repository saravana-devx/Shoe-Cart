# 👟 Shoe Mart (shoecart)

A cross-platform (iOS, Android, Web) shoe-store app built with **Expo** and **React Native**. It has two roles — **Admin** and **User** — selected on the home screen. Admins manage the catalog and view orders; users browse shoes, add them to a cart, and place orders.

## Features

- **Role selection** — choose Admin or User on launch.
- **Admin**
  - Browse the shoe catalog
  - Add a new shoe (brand, model, price, sizes, image)
  - View placed orders
- **User**
  - Browse the shoe catalog
  - Add shoes to the cart
  - Place orders and view order history
- Global state managed with **Redux Toolkit** (catalog, cart, orders).

## Tech stack

| Area | Library |
| --- | --- |
| Framework | [Expo](https://docs.expo.dev/versions/v57.0.0/) `~57` / React Native `0.86` / React `19` |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction) (file-based, typed routes) |
| State | [Redux Toolkit](https://redux-toolkit.js.org/) + React Redux |
| Icons | `@expo/vector-icons`, `lucide-react-native` |
| Images | `expo-image`, `expo-image-picker` |
| Language | TypeScript |

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm start
   ```

   Then press `a` (Android), `i` (iOS), or `w` (web) — or scan the QR code with [Expo Go](https://expo.dev/go).

### Other scripts

```bash
npm run android   # build & run on an Android device/emulator
npm run ios       # build & run on an iOS simulator
npm run web       # run in the browser
npm run lint      # lint the project
```

## Project structure

```
src/
├── app/                     # Expo Router routes (file-based)
│   ├── _layout.tsx          # Root layout — wraps app in the Redux Provider
│   ├── index.tsx            # Home — role selection
│   ├── admin/               # Admin screens (catalog, add shoe, orders)
│   └── user/                # User screens (catalog, cart, orders)
├── components/              # Shared UI (RoleSelection, Header)
├── constants/               # Static data & colors (dummyData, colors)
├── redux/
│   ├── store.ts             # Store — shoes, cart, order reducers
│   └── Slice/               # AddtoCartSlice, ShoesSlice, ordersSlice
└── types/                   # Shared TypeScript types (shoes)
```

## State management

The Redux store ([src/redux/store.ts](src/redux/store.ts)) combines three slices:

- **`shoes`** — the catalog; seeded from [src/constants/dummyData.ts](src/constants/dummyData.ts). Actions: `add_Shoes`, `update_Shoes`.
- **`cart`** — items the user has added. Actions: `addToCart`, `emptyCart`.
- **`order`** — placed orders. Action: `updateOrder`.

> Note: state is in-memory only — it resets when the app reloads. Add a persistence layer (e.g. `redux-persist`) if you need it to survive restarts.

## License

Built as an assignment project and shared publicly for review. Feel free to explore the code.
