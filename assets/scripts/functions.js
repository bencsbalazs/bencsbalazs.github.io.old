let urls = []
$(() => {
    $.get("https://picsum.photos/list").then((images) => {
        $.map(texts.slogans, () => {
            urls.push(`https://picsum.photos/900/500?image=${images[Math.floor(Math.random() * images.length)].id}`)
        })
    }).then(() => {
        urls.forEach((index, element)=>{
            $("<div class='carousel-item"+((element == 0) ? ' active' : '')+"'><img src='"+index+"'><div class='carousel-caption' style='display:"+(((window.innerHeight * 0.15) >= window.pageYOffset)?'block':'none')+"'><h3>"+texts.slogans[element].slogan+"</h3><p class='pull-right'>"+texts.slogans[element].author+"</p></div></div>").appendTo(".bgslider > .carousel-inner").eq(0)
        })
    })
    $("#listByDate ul li ul").each((i,e)=>{$(e).hide()});
    $('[data-toggle="popover"]').popover();
    wow = new WOW()
    wow.init()
    $(document).on("click", (e) => {$(e.target).closest('li').children('ul').eq(0).toggle();});
    $(document).on('scroll', () => {$('.bgslider .carousel-caption').css('display', ((window.innerHeight * 0.15) >= window.pageYOffset)?'block':'none');});
    $(window).on('activate.bs.scrollspy', (e) => {
        history.replaceState({}, "", $('.nav-item .active').attr("href"));
    });
});
let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
