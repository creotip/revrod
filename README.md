# RevRod [![CI/CD](https://github.com/creotip/revrod/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/creotip/revrod/actions/workflows/ci-cd.yml)

<https://revrod.vercel.app/>

<img width="973" alt="Screenshot 2023-07-02 at 2 09 36" src="https://github.com/creotip/revrod/assets/3135968/4f508f0e-92b5-4205-84cb-5465a157e8c9">

## Tech Stack

The Weather Application is built using the following:


- React-Typescript
- Bundler: Vite
- UI: Chakra UI
- State Management: Jotai
- E2e tests: Playwright
- Unit tests: Vitest
- Git hooks: Husky
- Weather API: <https://openweathermap.org/>
- Vercel as deployment platform

## Prerequisites

Before running the project or tests, ensure that you have installed pnpm:

<https://pnpm.io/installation>

## Getting Started

1. Install deps:

   ```bash
   pnpm install
   ```

2. Running scripts:
   - `dev` run the app locally
   - `build`
   - `lint`
   - `preview`
   - `test` - run the unit tests and watch
   - `test:ui` - run the unit tests, ui and watch
   - `test:run` - run the unit tests without watch
   - `test:e2e` - run the e2e tests with playwright

## Git hooks and tests

1. Before each commit, the `pre-commit` hook will run the `tests`, `lint` and `build` scripts.

   Check in the `.husky/pre-commit` file for more details.

2. On each push a github actions will run the cd-cd.yml pipeline.

   Check in the `.github/workflows/ci-cd.yml` file for more details.
   the pipeline is running also on Vercel servers.

## Structure and flow

- :white_check_mark: The user is able to search for a location by name or zip code. Autocomplete is provided by openweather's Geocoding API

- :white_check_mark: Display the current temperature, weather condition, wind speed, and humidity for the
  selected location

- :white_check_mark: Display a 5-day forecast with the high and low temperatures for each day

- :white_check_mark: Allow the user to toggle between Celsius and Fahrenheit units

- :white_check_mark: Use responsive design to ensure the app looks good on both desktop and mobile
  devices

- :white_check_mark: Use React hooks and functional components instead of class components

- :white_check_mark: Use a state management library like Redux or MobX to manage the app&#39;s state (Jotai is the state manager)

- :white_check_mark: Use a design system like Material UI or Ant Design to ensure consistent styling and UX across the app (Chakra-UI is used as design system and styling tool)

- :white_check_mark: Implement client-side caching to improve performance and reduce API requests

- :white_check_mark: Implement automated testing: Add a requirement to implement automated testing, such
  as end-to-end testing or integration testing, which will require the developer to learn how
  to write and run tests in addition to building the app.

## Edge cases

If (user is offline)

- Show `error` notification that a user is offline

if (user was offline and connected again)

- Show `success` notification that a user is back online

if (on autocomplete api search a user get `404` or `400`)

- Show `error` notification that results "not found"

if (on weather api call a user get `404` or `400`)

- Show `error` notification that results "not found"

if (on weather api call an error occured)

- Show `error` notification that results "Something went wrong"
