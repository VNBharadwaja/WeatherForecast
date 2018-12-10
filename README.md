This Know your city's weather page displays weather forecast for five days in
your city.

You can enter a city name with an optional country code to view the forecast.
Once the city name is entered and search button is clicked, this page will send
an ajax request to openweathermap api. (api.openweathermap.org/data/2.5/forecast?q={city name},{country code})
Then a response is obtained in JSON format, which is displayed in a line graph
using Chart.js library.

Features adapted:

1. Used Bootstrap framework to make the page responsive
2. Enabled AJAX functionality using jQuery
3. Separated CSS Styles, JavaScript from HTML
4. Cleaned user input using regex
5. Rendered weather forecast in a line graph using Chart.js and moment.js libraries
6. Calculated and presented Average pressure on the page
7. Displayed current day's forecast in tabular format
8. Displayed dates on graph in 'MMM DD' format
9. Ensured code was documented
