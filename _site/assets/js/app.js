const careerYears = function() {
  var dateNow = new Date();
  var currentYear = dateNow.getFullYear();

  $('.exp-year, .skill-years').each(function() {
    var startYear = parseInt($(this).data('start-year'), 10) || 2012;
    var totalCareerYears = currentYear - startYear;
    if ($(this).hasClass('skill-years') && $(this).data('start-year') != undefined) {
      var label = totalCareerYears === 1 ? ' year' : ' years';
      $(this).html(totalCareerYears + label);
    } else if ($(this).hasClass('exp-year')) {
      $(this).html(totalCareerYears);
    }
  });
}

window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("on-scroll-progress").style.width = scrolled + "%";
}

$(document).ready(function() {
  careerYears();

  $('.current-year').text(new Date().getFullYear());

  var navLinks = $('.scroll-to');
  var sectionTargets = navLinks.map(function() {
    var href = $(this).attr('href');
    if (href && href.startsWith('#')) {
      return $(href);
    }
    return null;
  });

  var setActiveLink = function(targetId) {
    navLinks.removeAttr('aria-current');
    navLinks.filter('[href="' + targetId + '"]').attr('aria-current', 'true');
  };

  var parallaxSections = $('[data-parallax-speed]');
  var parallaxTicking = false;

  var updateParallax = function() {
    if (window.matchMedia('(max-width: 800px)').matches) {
      parallaxSections.css('background-position', 'center 0');
      parallaxTicking = false;
      return;
    }

    parallaxSections.each(function() {
      var section = $(this);
      var speed = parseFloat(section.data('parallax-speed')) || 0.2;
      var offset = $(window).scrollTop() - section.offset().top;
      var yPos = Math.round(offset * speed);
      section.css('background-position', 'center ' + yPos + 'px');
    });

    parallaxTicking = false;
  };

  var requestParallax = function() {
    if (parallaxTicking) {
      return;
    }
    parallaxTicking = true;
    window.requestAnimationFrame(updateParallax);
  };

  $(document).on('scroll', function() {
    const nowScrollTop = $(this).scrollTop();

    if (nowScrollTop > 700){
      $('.header-content .navbar').addClass('full');
    } else {
      $('.header-content .navbar').removeClass('full');
    }

    var scrollPosition = nowScrollTop + 160;
    var activeId = null;

    sectionTargets.each(function() {
      if (!this.length) {
        return;
      }
      if (this.offset().top <= scrollPosition) {
        activeId = '#' + this.attr('id');
      }
    });

    if (activeId) {
      setActiveLink(activeId);
    }

    requestParallax();
  });

  $('.scroll-to').on('click', function(e) {
    e.preventDefault();
    const body = $('body');
    const target = $($(this).attr('href'));
    var position = target.offset().top - body.offset().top + body.scrollTop();

    setActiveLink($(this).attr('href'));

    $('#bdNavbar').offcanvas('hide')
    $('body, html').animate({ scrollTop: position });

    return false;
  });

  updateParallax();
  $(window).on('resize', updateParallax);

  $('.flag-slider').each(function() {
    var slider = $(this);
    var track = slider.find('.flag-slider-track');
    var slides = slider.find('.flag-slide');
    var dots = slider.find('.flag-slider-dot');
    var prevBtn = slider.find('.flag-slider-prev');
    var nextBtn = slider.find('.flag-slider-next');
    var index = 0;
    var total = slides.length;

    var updateSlider = function() {
      var offset = index * 100;
      track.css('transform', 'translateX(-' + offset + '%)');
      dots.removeClass('is-active').attr('aria-pressed', 'false');
      dots.filter('[data-slide="' + index + '"]').addClass('is-active').attr('aria-pressed', 'true');
      prevBtn.prop('disabled', index === 0);
      nextBtn.prop('disabled', index === total - 1);
    };

    prevBtn.on('click', function() {
      if (index > 0) {
        index -= 1;
        updateSlider();
      }
    });

    nextBtn.on('click', function() {
      if (index < total - 1) {
        index += 1;
        updateSlider();
      }
    });

    dots.on('click', function() {
      var target = parseInt($(this).data('slide'), 10);
      if (!isNaN(target)) {
        index = target;
        updateSlider();
      }
    });

    updateSlider();
  });
});