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

  // Blog Pagination
  $('#blog_pagination a').click(function() {
    var nextPage = $(this).data('next-page');

    $.ajax({
      url: document.URL + (nextPage === 1 ? '' : '/page' + nextPage),
      success: function(response, status) {
        var htmlList = $.parseHTML(response);

        htmlList.forEach(function(node) {
          var $html = $(node);

          if ($html.is('.page-content')) {
            $('.post-list').html($html.find('.post-list').html());

            var totalPages = $('.post-list').data('total-pages');
            $('#blog_pagination .disabled').removeClass('disabled');
            $('#blog_pagination .active').removeClass('active');

            // Update pagination status'
            $('#blog_pagination a:contains('+nextPage+')').addClass('active');
            if (nextPage === totalPages) {
              $('#next').addClass('disabled')
            } else if (nextPage === 1) {
              $('#prev').addClass('disabled')
            }
            $('#prev').data('next-page', (nextPage - 1))
            $('#next').data('next-page', (nextPage + 1));
          }
        })
      },
      error: function(response, status) {
        console.log('ERROR: ' + response.statusText);
      },
    })
  })
})
