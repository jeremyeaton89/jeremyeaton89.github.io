$(function() {

  // Nav
  function scroll(top) {
    $('body').animate({ scrollTop: top }, 500);
  }
  $('a#projects_link').click(function()   { scroll(300) });
  $('a#experience_link').click(function() { scroll(500) });
  $('a#blog_link').click(function()       { scroll(700) });

  // Carousel
  $('#project_carousel').owlCarousel({
    singleItem: true,
    autoPlay: 5000,
    paginationSpeed: 500,
  });
})
