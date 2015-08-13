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

  // Proficiency
  var page1widths = [86,85,90,90,70,60];
  var page2widths = [88,85,80,40,60,60];
  var page1       = true;

  function showPage1() {
    $('#experience_labels li.page1').fadeOut(300, function() {
      $('#experience_labels li.page2').fadeIn(800);
    });
    $('#experience_chart li').each(function(i, el) { 
      $(el).delay(500).animate({'width': (page2widths[i] + '%')}, 500);
    });
  }
  function showPage2() {
    $('#experience_labels li.page2').fadeOut(300, function() {
      $('#experience_labels li.page1').fadeIn(800);
    });
    $('#experience_chart li').each(function(i, el) {
      $(el).delay(500).animate({'width': (page1widths[i] + '%')}, 500);
    });
  }
  function handlePaging() {
    if (page1) {
      page1 = false;
      showPage2();
    } else {
      page1 = true;
      showPage1();
    }
  }

  var interval = setInterval(function() {
    handlePaging();
  }, 10000);

  // toggle. stop paging for 20 seconds, then resume. 
  $('#experience_chart').click(function() {
    clearInterval(interval);
    handlePaging();
    setTimeout(function() {
      interval = setInterval(function() {
        handlePaging();
      }, 10000);
    }, 20000)
  })

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

            // Update pagination UI
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

  // Projects
  $('#projects_list li').click(function() {
    var $expandButton = $(this).find('.expand-button');

    if ($expandButton.is(':visible')) {
      $expandButton.fadeOut(200, function() {
        $(this).animate({'max-height': 1000}, 1000);        
      }.bind(this))
    } else {
      $(this).animate({'max-height': 80}, 600, function() {
        $expandButton.fadeIn(200);
      });      
    }
  })
})
