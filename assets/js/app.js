const careerYears = function() {
  var dateNow = new Date();
  var currentYear = dateNow.getFullYear();
  var yearStarted = 2012;
  var totalCareerYears = currentYear - yearStarted;

  $('.exp-year').html(totalCareerYears);
}

$(document).ready(function() {
  careerYears();

  $(document).on('scroll', function() {
    const nowScrollTop = $(this).scrollTop();

    if (nowScrollTop > 700){
      $('.header-content .navbar').addClass('full');
    } else {
      $('.header-content .navbar').removeClass('full');
    }
  });

  $('.scroll-to').on('click', function(e) {
    e.preventDefault();
    const body = $('body');
    const target = $($(this).attr('href'));
    var position = target.offset().top - body.offset().top + body.scrollTop();

    $('#bdNavbar').offcanvas('hide')
    $('body, html').animate({ scrollTop: position });

    return false;
  });
});