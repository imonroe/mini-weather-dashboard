# Product Requirements Document (PRD)

## 1. **Overview**

The **Mini Weather Dashboard** is a lightweight, visually engaging web application that allows users to check the current and daily forecast weather for any location by entering a city name or zip code. It uses a Python backend that wraps the free tier of the OpenWeatherMap API and exposes endpoints for a React-based frontend UI. The dashboard features animated weather icons and backgrounds to match weather conditions, all packaged so the full stack (frontend and backend) runs seamlessly inside a single Docker container from a unified codebase.

---

## 2. **Target Users**

**Primary Personas:**

- **Casual Web Users** needing quick, reliable weather info.
- **Travelers/Planners** who want daily forecasts for any location (by city or zip code).
- **Users drawn to fun, beautiful weather displays.**

**User Needs:**

- Accurate current weather and daily forecasts based on city or zip code.
- Responsive, playful, and visually attractive interface.
- Frictionless use—no sign-in, just open, enter location, and browse.

---

## 3. **Key Features and Functionality**

### A. Weather Info Retrieval

- **Location Input**
    - Input box that accepts either **city name** or valid **zip code** (U.S. or international as supported by OpenWeatherMap and the free tier).
- **Current Weather Display**
    - Shows temperature, condition, humidity, wind speed sourced from OpenWeatherMap `/weather` endpoint.
- **Daily Forecast Display**
    - Shows forecast for the next 3–5 days using OpenWeatherMap’s `/forecast/daily` (for free tier, `/forecast` can be used and daily data aggregated).

### B. Visual & UI Experience

- **Animated Weather Icons**
    - SVG/GIF icons that animate to reflect actual weather condition (based on OpenWeatherMap’s conditions).
- **Dynamic Backgrounds**
    - Responsive screen backgrounds or overlays—e.g. animated rain, sun rays, moving clouds, adjusting to match weather.
- **Fun Animations**
    - Small, playful animation touches for visual delight.

### C. React Frontend

- **Responsive Design**
    - Looks and works great on mobile, tablet, and desktop.
- **State Handling**
    - Polished loading, empty, and error states (e.g., invalid ZIP, API usage exceeded).

### D. Python API Backend

- **Endpoints:**
    - `/weather/current?location=XYZ` — Current weather data for city name **or** zip code.
    - `/weather/forecast?location=XYZ` — Daily forecast (3–5 days) for city or zip code.
- **Zip Code & City Parsing:**
    - Backend intelligently parses input to determine if it’s a zip code or city and makes the appropriate requests to OpenWeatherMap.
- **Cache Layer:**
    - Caches recent queries in memory for a short TTL to help offset free-tier API rate limits.
- **Error Handling:**
    - Graceful degradation when free-tier API limit is hit, for bad requests, or unavailable locations.

### E. Unified Repository & Deployment

- **Monorepo**: Both backend (Python API) and frontend (React) live in one repository.
- **Single Docker Container**:
    - Dockerfile builds and serves both frontend static assets and backend API.
    - On container startup, frontend assets are served via the backend or via a minimal web server (e.g., Flask+static, or with a reverse-proxy like Nginx if needed).

---

## 4. **User Flows**

**A. Initial Load**

1. User accesses weather dashboard.
2. Sees welcome background, search box, placeholder icon.

**B. Searching for Location**

1. User enters city name or zip code and submits.
2. Loading indicator appears.
3. Backend parses location input, requests data from OpenWeatherMap.
4. On success:
    - Animated icons and background shift to match weather.
    - Weather details and daily forecast display.
5. On failure:
    - Clear error message (e.g., "Location not found" or "API rate limit exceeded").
    - Option to retry or enter a different location.

**C. Repeat/Rapid Search**

1. User can input a new city or zip at any time.
2. Flow repeats from **B2**.

---

## 5. **Non-Functional Requirements**

- **Performance:**
    - Weather info displayed within 2 seconds for cached locations, 3-5 seconds for new queries.
- **Reliability:**
    - Fallback to cache when OpenWeatherMap API limit reached; user shown clear status.
- **Usability:**
    - Fully keyboard and screen-reader accessible. Icons and backgrounds readable; clear feedback for all states.
- **Security:**
    - API key only in backend, never exposed to frontend. Only necessary ports exposed on Docker container.
- **Scalability:**
    - Suitable for low-moderate user numbers (fits free-tier OpenWeatherMap usage limits).
- **Compliance:**
    - Fully respects OpenWeatherMap terms and usage limits. No user data persisted beyond short-term caching for API responses.

---

## 6. **Success Metrics (KPIs)**

- **Load time:** Median time to weather data <3s (uncached), <2s (cached).
- **API error/overage rate:** Fewer than 8% rate-limit or API errors shown to users.
- **Repeat usage:** >20% of users use multiple times/week.
- **Active users:** Track through frontend analytics or backend logs.
- **User feedback:** Ratings or comments (if later feedback feature is added).

---

## 7. **Optional/Advanced Features**

- **Unit Toggle:** Metric/Imperial switch for temperature, wind, etc.
- **Geolocation:** “Use my location” fetches weather for user’s current coordinates (as supported by browser & API).
- **Favorites/History:** Button to quickly re-select prior locations.
- **Shareable URLs:** Deep links (e.g., `/?location=90210`) reload specific locations.
- **Accessibility Enhancements:** e.g., high-contrast mode, full ARIA roles.
- **Enhanced Animations:** More detailed or whimsical effects (rainbows, thunderstorms, etc.).

---

## 8. **Questions/Assumptions**

**Outstanding Questions:**

1. Should we display any mention of “Powered by OpenWeatherMap” as per their requirements? -- YES, this should be displayed.

**Assumptions:**

- Free tier of OpenWeatherMap limits requests; anticipated user volume will not exceed these limits for MVP.
- Use FastAPI for the python backend framework.
- Only allow US zip codes for simplicity.
- No login/account functionality required.
- All source code (frontend/backend) in a single repo; single Dockerfile at root.
- Daily forecast granularity with 3–5 day range shown, derived from OpenWeatherMap data.
- Only data required to serve weather information is stored in cache; no persistent user data.


**Additional Notes**

- Consult the OpenWeatherMap API documentation to ensure correct usage and syntax.  The current documentation for the OpenWeatherMap API is here: https://openweathermap.org/api/one-call-3
- Since we are going to be using an API key to communicate with the OpenWeatherMap API, ensure that there's an .env file which can hold the key.
- Make sure to correctly use a python virtual environment to ensure any necessary dependencies are included.


