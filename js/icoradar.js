(function ($) {
                
  $("#storj-countdown")
  .countdown("2017/06/19",function(event) {
  var $this = $(this).html(event.strftime(''
    + '<span>%-w</span> week%!w '
    + '<span>%-d</span> day%!d '
    + '<span>%H</span> hr '
    + '<span>%M</span> min '
    + '<span>%S</span> sec'));
});

    $(".aTimeCircle").TimeCircles(); 
})(jQuery);