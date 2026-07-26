# Weather App

A modern weather application built with **HTML, CSS, and JavaScript** that allows users to search for any city and view the current weather conditions using the **Open-Meteo APIs**.

This project was created to practice working with multiple REST APIs, asynchronous JavaScript, dynamic UI updates, and responsive web design.

---

## Features

- Search weather by city name
- Displays:
  - City Name
  - Country Code
  - Current Temperature
  - Weather Overview
  - Weather Icon
  - Wind Speed
  - Wind Direction
- Dynamic weather backgrounds based on weather conditions
- Handles invalid city names
- Error handling using `try...catch`
- Responsive and modern UI

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API

---

## What I Learned

This project helped me practice:

- Working with multiple APIs
- Chaining API requests
- Fetch API
- Async / Await
- Try / Catch
- JSON
- DOM Manipulation
- Dynamic HTML Rendering
- Dynamic CSS Styling
- Object Mapping
- Input Validation
- Responsive Design

---

## Project Structure

```
weather-app/

│── index.html
│── style.css
│── script.js
└── README.md
```

---

## How It Works

1. The user enters a city name.
2. The application searches the Open-Meteo Geocoding API to find the city's latitude and longitude.
3. Those coordinates are sent to the Open-Meteo Weather API.
4. The current weather is retrieved.
5. The interface updates dynamically with:
   - Weather icon
   - Temperature
   - Wind speed
   - Wind direction
   - Weather description
6. The card background changes depending on the current weather.

---

## APIs Used

### Open-Meteo Geocoding API

```
https://geocoding-api.open-meteo.com/v1/search
```

Used to convert a city name into geographic coordinates.

### Open-Meteo Weather Forecast API

```
https://api.open-meteo.com/v1/forecast
```

Used to retrieve current weather information.

---

## Skills Demonstrated

- HTML5
- CSS3
- JavaScript ES6
- REST API Integration
- Fetch API
- Async Programming
- JSON Parsing
- DOM Manipulation
- Dynamic UI Rendering
- Error Handling
- Responsive Design

---

## Future Improvements

- Add a loading animation while fetching weather
- Display humidity and atmospheric pressure
- Show hourly weather forecast
- Show 7-day weather forecast
- Detect user's current location
- Add dark/light mode
- Improve mobile responsiveness
- Refactor weather mapping into a separate module

---

## Running the Project

Clone the repository

```bash
git clone https://github.com/SecureCodeLab/weather-app.git
```

Open the project directory

```bash
cd weather-app
```

Run the project

Simply open `index.html` in your browser.

Or use the **Live Server** extension in VS Code.

---

## Author

**Aashish Katwal**

Cyber Security Student

Aspiring Application Security Engineer

GitHub:
https://github.com/SecureCodeLab

---

## License

This project is open source and available under the MIT License.