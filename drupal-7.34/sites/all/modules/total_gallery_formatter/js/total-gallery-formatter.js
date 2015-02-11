(function($) {
  Drupal.total_gallery_formatter = Drupal.total_gallery_formatter || {};
  Drupal.total_gallery_formatter.tgfToBoolean = function(number) {
    if (number) {
      return true;
    }
    else {
      return false;
    }
  };
  Drupal.behaviors.totalGalleryFormatter = {
    attach : function(context, settings) {
      var imageStyles = Drupal.settings.totalGalleryFormatter.imageStyles;
      var imageStyleThumb = imageStyles.thumbStyle.name;
      var imageStyleThumbWidth = imageStyles.thumbStyle.width;
      var imageStyleThumbHeight = imageStyles.thumbStyle.height;
      var imageStyleSlide = imageStyles.slideStyle.name;
      var carouselConfiguration = Drupal.settings.totalGalleryFormatter.carouselConfiguration;
      var itemsVisible = carouselConfiguration.itemsVisible;
      var scrollFx = carouselConfiguration.scrollFx;
      var direction = carouselConfiguration.direction;
      var slideDuration = carouselConfiguration.slideDuration;
      var autoplay = carouselConfiguration.autoplay;
      var circular = carouselConfiguration.circular;
      var infinite = carouselConfiguration.infinite;
      var colorbox = carouselConfiguration.colorbox;
      var easing = carouselConfiguration.easing;
      var pagDuration = carouselConfiguration.pagDuration;
      $('body').once('total_gallery_formatter', function() {
        $('.tgf-container', context).each(function(index){
          $this_carousel = $(this);
          $('.tgf-slides', $this_carousel).carouFredSel({
            items : 1,
            direction : direction,
            auto : Drupal.total_gallery_formatter.tgfToBoolean(autoplay),
            scroll : {
              fx : scrollFx,
              duration : parseInt(slideDuration)
            },
            prev : {
              button : $('.tgf-prev-button', $this_carousel),
              key : 'left'
            },
            next : {
              button : $('.tgf-next-button', $this_carousel),
              key : 'right'
            },
            pagination  : {
              container   : $('.tgf-pagination', $this_carousel),
              anchorBuilder : function(nr) {
                var src = $('img', this).attr('src');
                src = src.replace('/' + imageStyleSlide + '/', '/' + imageStyleThumb + '/');
                return '<img src="' + src + '" width="' + imageStyleThumbWidth + '" height="' + imageStyleThumbHeight + '"/>';
              },
            },
          });
          $('.tgf-pagination', $this_carousel).carouFredSel({
            items : parseInt(itemsVisible),
            circular: Drupal.total_gallery_formatter.tgfToBoolean(circular),
            infinite: Drupal.total_gallery_formatter.tgfToBoolean(infinite),
            auto  : false,
            scroll : {
              easing : easing,
              duration : parseInt(pagDuration)
            },
            prev : {
              button : $('.tgf-pag-prev-button', $this_carousel)
            },
            next : {
              button : $('.tgf-pag-next-button', $this_carousel),
            }
          });
        });
        if (!$('.page-admin').length) {
          if (colorbox) {
            $('.tgf-slides a').colorbox({returnFocus:false, maxHeight:'98%', maxWidth:'98%', fixed: true});
          }
        }
      });
    }
  };
})(jQuery);
