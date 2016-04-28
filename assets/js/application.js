$(document).ready(function () {

  // false = closed ; true = opened
  var sliderProvidersState = false;

  $('.more-providers-caption').click(function() {

    $('.more-providers').slideToggle("fast");
    sliderProvidersState = !sliderProvidersState;

    $({deg: (sliderProvidersState ? 0 : 180)}).animate({deg: (sliderProvidersState ? 180 : 0)}, {

      duration: 250,
      step: function(now) {

        $('.more-providers-caption > .triangle').each(function() {
          var degrees = ($(this).hasClass('last') ? -now : now);

          $(this).css({
            transform: "rotate(" + degrees + "deg)"
          });
        });
      }
    });
  });

  $('#login-email').click(function() {

    $('.email-provider').slideToggle("fast");
  });
});
