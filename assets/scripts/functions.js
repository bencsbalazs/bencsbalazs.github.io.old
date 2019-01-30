const list = ["Text 1","Text 2","Text 3","Text 4"]
let urls = []
$(() => {
    $.get("https://picsum.photos/list").then((images) => {
        $.map(list, () => {
            urls.push(`https://picsum.photos/900/500?image=${images[Math.floor(Math.random() * images.length)].id}`)
        })
    }).then(() => {
        urls.forEach((index, element)=>{
            active=(element == 0) ? " active": "" 
            $("<div class='carousel-item"+active+"'><img src='"+index+"'></div>").appendTo(".bgslider > .carousel-inner").eq(0)
        })
    })
    $('[data-toggle="tooltip"]').tooltip()
    wow = new WOW();
    wow.init();

$(document).on("click", function(e) {
    $(e.target).closest('li').children('ul').eq(0).toggle();
});
});