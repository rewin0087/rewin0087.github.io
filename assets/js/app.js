$(document).ready(function() {
  var dateNow = new Date();
  var currentYear = dateNow.getFullYear();
  var yearStarted = 2012;
  var totalCareerYears = currentYear - yearStarted;

  $('.exp-year').html(totalCareerYears)
});