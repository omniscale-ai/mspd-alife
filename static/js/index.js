window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {

    // ---------- mobile navbar burger (template behaviour) ----------
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // ---------- bulma-carousel ----------
    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };

    var carousels = bulmaCarousel.attach('.carousel', options);

    // ---------- AUTOPLAY-ON-VIEW for non-carousel videos ----------
    // Each <video preload="none"> outside the carousel autoplays when scrolled
    // into view and pauses when scrolled out. The teaser keeps its own
    // autoplay attribute and is excluded.
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var v = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            // play() returns a promise; swallow rejection (browser autoplay block)
            var p = v.play();
            if (p && typeof p.catch === 'function') p.catch(function() {});
          } else {
            v.pause();
          }
        });
      }, { threshold: [0, 0.35, 0.7, 1] });

      document.querySelectorAll('video').forEach(function(v) {
        if (v.id === 'teaser') return;
        if (v.closest('.carousel')) return;
        observer.observe(v);
      });
    }

    // ---------- AUTOPLAY in the carousel ----------
    // The substrate carousel cycles between items via bulma-carousel. We:
    //   1) pause all videos in the carousel on every slide change,
    //   2) replay whichever items end up DOM-visible inside the carousel
    //      bounding box (with slidesToShow: 3, usually 3 at a time).
    function playVisibleCarouselVideos(carouselEl) {
      if (!carouselEl) return;
      var rootRect = carouselEl.getBoundingClientRect();
      carouselEl.querySelectorAll('video').forEach(function(v) {
        var r = v.getBoundingClientRect();
        var visible = r.right > rootRect.left + 8 && r.left < rootRect.right - 8 && r.width > 8;
        if (visible) {
          var p = v.play();
          if (p && typeof p.catch === 'function') p.catch(function() {});
        }
      });
    }

    function pauseAllCarouselVideos(carouselEl) {
      if (!carouselEl) return;
      carouselEl.querySelectorAll('video').forEach(function(v) { v.pause(); });
    }

    var resultsCarousel = document.querySelector('.results-carousel');

    carousels.forEach(function(c) {
      // bulma-carousel exposes 'before:show' / 'after:show' events
      c.on('before:show', function() {
        pauseAllCarouselVideos(resultsCarousel);
      });
      c.on('after:show', function() {
        // small delay so the slide transform has settled
        setTimeout(function() { playVisibleCarouselVideos(resultsCarousel); }, 80);
      });
    });

    // initial kick-off after carousel layout has settled
    setTimeout(function() { playVisibleCarouselVideos(resultsCarousel); }, 500);

    bulmaSlider.attach();
});
