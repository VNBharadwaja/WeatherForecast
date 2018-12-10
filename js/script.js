/**
* @author Anil Tirumalakanduri
* @version 1.0
*/

$(document).ready(function () {
    var appid = "82c62dc3fab47cc539ff761196f376fd";  // API KEY for openweathermap api

    $("form").on("submit", function (e) {
        e.preventDefault();

        var city = $("#cityName").val().replace(/[^a-z0-9,]/gi, '');  // clean user input by removing non alphanumeric(except comma(,))

        // Prompt the user to enter a city name if it is empty
        if (!city) {
            $.alert({
                title: "Error",
                content: "Please enter a city name"
            });
            return;
        }

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&APPID=" + appid + "&units=metric",
            type: "GET",
            dataType: "JSONP",
            success: function (data) {
                // calculate average pressure for the week (5 days)
                var arr2 = [];
                var averagePressure = (function () {
                    data.list.forEach(function (vl) {
                        arr2.push(vl.main.pressure);
                    });
                    var sum = 0;
                    for (var i = 0; i < arr2.length; i++) {
                        sum += arr2[i];
                    }
                    sum /= arr2.length;
                    return Math.ceil(sum);
                })();

                // fill bootstrap table with values from "data", the response from API
                $("#averagePressureValue").text(averagePressure);
                $("#cityInTable").text(data.city.name);
                $("#countryInTable").text(data.city.country);
                $("#minTemp").text((data.list[0].main.temp_min) + String.fromCharCode(8451));
                $("#maxTemp").text((data.list[0].main.temp_max) + String.fromCharCode(8451));
                $("#windSpeed").text(parseInt(data.list[0].wind.speed) * 3.6 + "km/h");
                $("#pressureText").text("Average pressure in " + data.city.name + ", " + data.city.country);
                $(".forecastToday").text("Forecast for today, " + (data.list[0].dt_txt).toString().substring(0, 11));

                // get temperature values for plotting chart
                var arr = [];
                var tempValues = (function () {
                    data.list.forEach(function (value) {
                        arr.push(value.main.temp);
                    });
                    return arr;
                })();

                // get dates for labels
                var arr1 = [];
                var dateValues = (function () {
                    data.list.forEach(function (val) {
                        arr1.push(val.dt_txt);
                    });
                    return arr1;
                })();

                // show the hidden canvasDiv now..
                $(".canvasDiv").removeClass("hiddenCanvasDiv");

                var ctx = document.getElementById('chartCanvas').getContext('2d');

                // create line graph using Chart.js library
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dateValues,
                        datasets: [{
                            label: 'Temperature',
                            data: tempValues,
                            borderColor: '#0073E6',
                            borderWidth: 2,
                            fill: true,
                            pointBackgroundColor: '#0073E6',
                            lineTension: 0.5,
                            pointRadius: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: true,
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Temperatures for next five days',
                            fontSize: 20,
                            fontColor: '#303030',
                            fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
                        },
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    unitStepSize: 1,
                                    displayFormats: {
                                        day: 'MMM DD'
                                    }
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    stepSize: 1,
                                    fontSize: 15
                                }
                            }]
                        }
                    }
                });
            },
            error: function () {
                $.alert({
                    title: 'Error!',
                    content: 'Please try again with a valid city name'
                });
            }
        });
    });
});
