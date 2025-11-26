# expo-charts-numeric-x-patch

Reproduction repo for the PR **[expo-ui] Add numeric x axis support to Chart component** (expo/expo#41236).  
This app demonstrates using the patched `expo-ui` package to render charts with **numeric x-axis support**, including time-series data.

The goal of this repo is to make it easy for reviewers and contributors to:

- Install the patched `expo-ui` `.tgz` build.
- Run the demo app.
- Switch between categorical and numeric datasets (including a time-series dataset).
- Visually verify that charts and reference lines behave correctly with numeric x-values.

---

## Contents

- [Prerequisites](#prerequisites)  
- [Cloning the Repository](#cloning-the-repository)  
- [Installing Dependencies](#installing-dependencies)  
- [Installing the Patched `expo-ui` Package](#installing-the-patched-expo-ui-package)  
- [Running the App](#running-the-app)  
- [How to Try the Numeric X-Axis Demo](#how-to-try-the-numeric-x-axis-demo)  
- [What This Patch Changes](#what-this-patch-changes)  
- [Screenshots](#screenshots)  
- [Related PR & Issue](#related-pr--issue)

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS, e.g. 18 or later)
- **npm** (comes with Node.js)
- **Expo tooling**  
  You can either:
  - use `npx expo` (recommended), or  
  - install the CLI globally:  
    ```bash
    npm install -g expo-cli
    ```
- At least one of:
  - **iOS Simulator** (Xcode)  
  - **Android Emulator** (Android Studio)  
  - Or a physical device with the **Expo Go** app installed

---

## Cloning the Repository

Clone this reproduction repo and move into it:

```bash
git clone https://github.com/dileepapeiris/expo-charts-numeric-x-patch
cd expo-charts-numeric-x-patch
```
---

## Installing Dependencies

From the project root (`expo-charts-numeric-x-patch`):

```bash
npm install
```

This installs all JavaScript dependencies for the app.

---

## Installing the Patched `expo-ui` Package

The patched `expo-ui` build for this PR is included in the repo root as:

```text
expo-ui-0.2.0-beta.8.tgz
```

Install it manually from the **project root** (`expo-charts-numeric-x-patch`) using one of the following options:

### Option 1 — Direct relative path (recommended)

```bash
npm install ./expo-ui-0.2.0-beta.8.tgz
```

### Option 2 — Absolute path

```bash
npm install /full/path/to/expo-ui-0.2.0-beta.8.tgz
```

Replace `/full/path/to/...` with the actual path on your machine.

### Option 3 — Drag-and-drop into terminal

1. Type in your terminal:

   ```bash
   npm install 
   ```

   (note the space at the end)

2. Drag and drop the `expo-ui-0.2.0-beta.8.tgz` file from your file explorer into the terminal window — this will paste the full path.
3. Press **Enter** to run the command.

After this step, the demo app will use the patched `expo-ui` version that includes **numeric x-axis** support for the `Chart` component.

---

## Running the App

From the project root:

```bash
npx expo run:ios
```
---

## How to Try the Numeric X-Axis Demo

Once the app is running:

1. Open the **UI / Chart** screen.  
   - In the Expo Native Component List, this corresponds to  
     `apps/native-component-list/src/screens/UI/ChartScreen.ios.tsx`.
2. At the top of the screen, use the **Data Set** selector.
3. Select **“Time Series”** (the 4th option in the list).  
   - This dataset uses **numeric x-values** (e.g. timestamps or numeric indices).
4. Explore different chart types:
   - Line chart  
   - Point chart  
   - Bar chart  
   - Area chart  
   - Rectangle chart
5. Observe:
   - The x-axis behaves as a **continuous numeric axis** for the time-series dataset.
   - Legends and labels render correctly for both string and numeric x-values.
   - Reference lines appear at numeric x-values and align with the plotted data.
   - Gridlines, animations, and interactions behave as expected.

You can also switch back to the original categorical datasets (Sales, Temperature, Performance) to verify there are **no regressions** in string-based x-axis behavior.

---

## What This Patch Changes

This reproduction repo is wired to the patched `expo-ui` build that implements the changes described in the PR.

### TypeScript Layer (`packages/expo-ui/src/swift-ui/Chart/index.tsx`)

- `ChartDataPoint` now accepts `x: string | number`.
- A helper `transformDataPoint()` converts the union type into explicit `xString` and `xNumber` fields for the Swift layer.
- Both `data` and `referenceLines` are transformed before being passed into native code.

### Swift Layer (`packages/expo-ui/ios/ChartView.swift`)

- `ChartDataPoint` struct now includes optional `xString` and `xNumber` fields, since `Either<String, Double>` is not supported by the `ExpoModulesCore` `Record` protocol.
- Introduces:
  - `xValue` → string representation (used for legends and categorical axes).
  - `xNumericValue` → numeric representation (used for continuous axes).
- All chart mark creation functions now support both string and numeric x-values:
  - `createBaseBarMark`
  - `createAreaMark`
  - `createLineMark`
  - `createPointMark`
  - `createRectangleMark`
- Reference lines iterate using `id: \.xValue` to ensure stable identity.

### Demo Screen (`apps/native-component-list/src/screens/UI/ChartScreen.ios.tsx`)

- Adds a **`timeSeriesData`** dataset with numeric x-values.
- Adds **“Time Series”** as the 4th option in the dataset selector.
- Adds **numeric reference lines** for the time-series dataset.
- Updates the screen description to mention support for:
  - **Categorical (string)** axes, and  
  - **Numeric** axes (e.g. time series).

---

## Screenshots and Demo Videos

### Official Native Components

| Line Chart | Point Chart | Bar Chart | Area Chart |
|-----------|-------------|-----------|------------|
| <img width="220" src="https://github.com/user-attachments/assets/c0d2deff-a314-487a-a3a6-98d2029d1900" /> | <img width="220" src="https://github.com/user-attachments/assets/e0dd77d5-d198-4500-8506-86bc7cf69024" /> | <img width="220" src="https://github.com/user-attachments/assets/b245a86c-f0b0-41de-94f9-1ef55008fae3" /> | <img width="220" src="https://github.com/user-attachments/assets/b78ea657-7e92-4440-a178-0e750ec3cb1b" /> |

| Pie Chart | Rectangle Chart |
|-----------|-----------------|
| <img width="220" src="https://github.com/user-attachments/assets/ee914e53-f52f-42f5-8a95-1e5446ffc567" /> | <img width="220" src="https://github.com/user-attachments/assets/1bcebb4e-620c-4dc3-bf62-c408bab2bd69" /> |

---

### Extra Examples

<img width="220" alt="image" src="https://github.com/user-attachments/assets/e14320b3-f731-4433-b830-5e46d67b0cd1" />
<img width="220" alt="image" src="https://github.com/user-attachments/assets/c160a566-3bf8-43a2-b7a7-32e07e01d0ac" />

---

### Demo Video

https://github.com/user-attachments/assets/4d75e65a-aeb6-4ad8-b3bc-740f74633d40

---

## Related PR & Issue

- PR: **[expo-ui: Add numeric x axis support to Chart component](https://github.com/expo/expo/pull/41236)**
- Issue resolved: [expo/expo#40942](https://github.com/expo/expo/issues/40942)

This reproduction repo exists to make it straightforward for reviewers to validate the behavior introduced in that PR with a ready-to-run Expo demo.
