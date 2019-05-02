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
