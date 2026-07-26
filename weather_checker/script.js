const from = document.getElementById("form");
const input = document.querySelector("input");

from.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!input.value) {
        alert("Please enter a city name");
        return
    };

    try{
        // get altitudes
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input.value)}&count=1&language=en`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found!");
            input.value = "";
            return
        };

        const result = data.results[0];

        // get weather
        const weather = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result["latitude"]}&longitude=${result["longitude"]}&current_weather=true`)).json();

        const uinits = weather.current_weather_units;
        const value = weather.current_weather;

        // generated info
        const weatherMapping = {
            // --- CLEAR / SUNNY CONDITIONS (Warm Gold Glow) ---
            0: { text: "Clear Sky", icon: "☀️", color: "radial-gradient(circle 200px at 50% 0%, rgba(245, 175, 25, 0.3) 0%, #11131e 100%)" },
            1: { text: "Mainly Clear", icon: "🌤️", color: "radial-gradient(circle 200px at 50% 0%, rgba(255, 188, 0, 0.25) 0%, #11131e 100%)" },

            // --- CLOUDY CONDITIONS (Muted Slate/Blue-Grey Glow) ---
            2: { text: "Partly Cloudy", icon: "⛅", color: "radial-gradient(circle 200px at 50% 0%, rgba(126, 192, 238, 0.25) 0%, #11131e 100%)" },
            3: { text: "Overcast", icon: "☁️", color: "radial-gradient(circle 200px at 50% 0%, rgba(117, 127, 154, 0.25) 0%, #11131e 100%)" },

            // --- FOG CONDITIONS (Ghostly Grey Glow) ---
            45: { text: "Foggy", icon: "🌫️", color: "radial-gradient(circle 200px at 50% 0%, rgba(189, 195, 199, 0.2) 0%, #11131e 100%)" },
            48: { text: "Depositing Rime Fog", icon: "🌫️", color: "radial-gradient(circle 200px at 50% 0%, rgba(149, 165, 166, 0.2) 0%, #11131e 100%)" },

            // --- DRIZZLE & LIGHT RAIN (Soft Aqua/Teal Glow) ---
            51: { text: "Light Drizzle", icon: "🌦️", color: "radial-gradient(circle 200px at 50% 0%, rgba(137, 247, 254, 0.25) 0%, #11131e 100%)" },
            53: { text: "Moderate Drizzle", icon: "🌦️", color: "radial-gradient(circle 200px at 50% 0%, rgba(116, 235, 213, 0.25) 0%, #11131e 100%)" },
            55: { text: "Dense Drizzle", icon: "🌦️", color: "radial-gradient(circle 200px at 50% 0%, rgba(92, 114, 148, 0.25) 0%, #11131e 100%)" },

            // --- SHOWERS & STEADY RAIN (Deep Electric Amber Glow - Matches your image style) ---
            61: { text: "Slight Rain", icon: "🌧️", color: "radial-gradient(circle 200px at 50% 0%, rgba(224, 124, 57, 0.25) 0%, #11131e 100%)" },
            63: { text: "Moderate Rain", icon: "🌧️", color: "radial-gradient(circle 200px at 50% 0%, rgba(224, 124, 57, 0.35) 0%, #11131e 100%)" }, // Exact image match
            65: { text: "Heavy Rain", icon: "🌧️", color: "radial-gradient(circle 200px at 50% 0%, rgba(224, 124, 57, 0.45) 0%, #11131e 100%)" },
            80: { text: "Slight Rain Showers", icon: "🌦️", color: "radial-gradient(circle 200px at 50% 0%, rgba(79, 172, 254, 0.3) 0%, #11131e 100%)" },
            81: { text: "Moderate Rain Showers", icon: "🌦️", color: "radial-gradient(circle 200px at 50% 0%, rgba(82, 229, 231, 0.3) 0%, #11131e 100%)" },

            // --- SNOW CONDITIONS (Bright Frosted White Glow) ---
            71: { text: "Slight Snowfall", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(230, 248, 255, 0.2) 0%, #11131e 100%)" },
            73: { text: "Moderate Snowfall", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(210, 241, 255, 0.25) 0%, #11131e 100%)" },
            75: { text: "Heavy Snowfall", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(191, 232, 255, 0.3) 0%, #11131e 100%)" },
            77: { text: "Snow Grains", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(207, 217, 223, 0.2) 0%, #11131e 100%)" },
            85: { text: "Slight Snow Showers", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(238, 242, 243, 0.2) 0%, #11131e 100%)" },
            86: { text: "Heavy Snow Showers", icon: "🌨️", color: "radial-gradient(circle 200px at 50% 0%, rgba(238, 242, 243, 0.25) 0%, #11131e 100%)" },

            // --- STORMY CONDITIONS (Moody Purple/Deep Red Glow) ---
            82: { text: "Violent Rain Showers", icon: "⛈️", color: "radial-gradient(circle 200px at 50% 0%, rgba(231, 76, 60, 0.25) 0%, #11131e 100%)" },
            95: { text: "Thunderstorm", icon: "⛈️", color: "radial-gradient(circle 200px at 50% 0%, rgba(155, 89, 182, 0.3) 0%, #11131e 100%)" },
            96: { text: "Thunderstorm with Slight Hail", icon: "⛈️", color: "radial-gradient(circle 200px at 50% 0%, rgba(155, 89, 182, 0.35) 0%, #11131e 100%)" },
            99: { text: "Thunderstorm with Heavy Hail", icon: "⛈️", color: "radial-gradient(circle 200px at 50% 0%, rgba(231, 76, 60, 0.35) 0%, #11131e 100%)" }
        };



        const currentWeatherInfo = weatherMapping[value.weathercode] || { text: "Unknown Conditions", icon: "🌡️" };

        // place into ui
        const ui = document.getElementById("ui");

        document.querySelector(".card").style.backgroundImage = currentWeatherInfo.color;

        ui.innerHTML =
            `<h3>${result["name"]}<sup><small>${result["country_code"]}</small></sup></h3>
        <div class="temp-box">
            <p class="icon-bubble">${currentWeatherInfo.icon}</p>
            <h2>${value.temperature}<sup><small>${uinits.temperature}</small></sup></h2>
            <div class="wind">
                <div class="winddirection" style="display:flex">
                    <p class="icon-bubble">🧭</p>
                    <p>Wind Direction: ${value.winddirection}<sup>${uinits.winddirection}</sup></p>
                </div>

                <div class="windspeed" style="display:flex">
                    <p class="icon-bubble">💨</p>
                    <p>Wind Spped: ${value.windspeed}<sup>${uinits.windspeed}</sup></p>
                </div>
            </div>
        </div>
        <p style="text-transform: uppercase;">Overview: ${currentWeatherInfo.text}</p>`;
    }catch(error) {
        alert("Error occured")
    }
    

    // reset input
    input.value = "";

})