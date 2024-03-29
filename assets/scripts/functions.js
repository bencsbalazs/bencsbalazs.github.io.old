let urls = [];

$(() => {
    $('#listByDate li ul').hide();
    $('#listByDate li').bind('click', function (event) {
        event.stopPropagation();
        $(this).children("ul").first().toggle();
    });


    $("#print").on("click", (e) => {
        e.preventDefault();
        window.print();
    });

    /* Scrollspy handler, to add view position to url. Needed for page refresh */
    $(window).on('activate.bs.scrollspy', (e) => {
        history.replaceState({}, "", $('.nav-item .active').attr("href"));
    });

    /* Initialize the default variable values */
    wow = new WOW();
    wow.init();
    AOS.init();
    const images = $("img.randomimage");

    /* Download random images for the blog post covers */
    $.get("https://picsum.photos/list").then((images) => {
        $.map([0, 1, 2], () => {
            urls.push(`https://picsum.photos/900/500?image=${images[Math.floor(Math.random() * images.length)].id}`)
        })
    }).then(() => {
        urls.forEach((item, index) => {
            images[index].src = item;
        })
    });

    /* Init the certificates gallery modal */
    loadGallery(true, 'a.thumbnail');
});

// Build key actions for the gallery
$(document)
    .keydown(function (e) {
        let modalId = $('#image-gallery');
        switch (e.which) {
            case 37: // left arrow
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                    $('#show-previous-image')
                        .click();
                }
                break;

            case 39: // right arrow
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                    $('#show-next-image')
                        .click();
                }
                break;

            default:
                return;
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

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
        $('#image-gallery-description')
            .text($sel.data('text'));
        disableButtons(counter, $sel.data('image-id'));
    }

    if (setIDs === true) {
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

/* This function disables buttons when needed */
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