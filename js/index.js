$(function() {

  // Nav
  $('a.page-link.blog').click(function() { 
    $('body').animate({ scrollTop: $('#blog').offset().top }, 500);
  });

  // Carousel
  $('#project_carousel').owlCarousel({
    singleItem: true,
    autoPlay: 5000,
    paginationSpeed: 500,
  });

  // Blog Pagination
  $('#blog_pagination a').click(function() {
    if ($(this).is('active')) return;
    var nextPage = $(this).data('next-page');

    $.ajax({
      url: document.URL.split('#')[0] + (nextPage === 1 ? '' : '/page' + nextPage),
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
              $('#next').parent('li').addClass('disabled')
            } else if (nextPage === 1) {
              $('#prev').parent('li').addClass('disabled')
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
