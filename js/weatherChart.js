var API_KEY = '72db9fe26813c31b';
var url = 'http://api.wunderground.com/api/72db9fe26813c31b/hourly/q/NY/New_York.json';

$(function() {
  makeAjaxRequest(url, onSuccess);
});

function getFarenheits(data) {
  return data["hourly_forecast"].map(function(forecast) {
    return forecast["temp"]["english"];
  });
}

function getHours(data) {
  return data["hourly_forecast"].map(function(forecast) {
    return forecast["FCTTIME"]["hour"];
  });
}

function generateDataSet(labels, data) {
  var datasetProperties = {
    label: "Hourly Weather for New York",
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: data
  };
  return {
    labels: labels,
    datasets: [datasetProperties]
  }
}

function makeAjaxRequest(url, callback) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function onSuccess(parsedJSON) {
  var farenheits = getFarenheits(parsedJSON);
  var hours = getHours(parsedJSON);
  var data = generateDataSet(hours, farenheits);
  var ctx = document.getElementById("NYCWeatherChart").getContext("2d");
  var chart = new Chart(ctx).Line(data);
}
