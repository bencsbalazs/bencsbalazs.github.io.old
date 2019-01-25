const list = ["","","",""]
let urls = []
$(() => {
    $.get("https://picsum.photos/list").then((images) => {
        $.map(list, () => {
            urls.push(`https://picsum.photos/900/500?image=${images[Math.floor(Math.random() * images.length)].id}`)
        })
    }).then(() => {
        urls.forEach((index, element)=>{
            active=(element == 0) ? " active": "" 
            $("<div class='carousel-item"+active+"'><img src='"+index+"'></div>").appendTo(".carousel-inner").eq(0)
        })
    })
    $('[data-toggle="tooltip"]').tooltip()
    wow = new WOW();
    wow.init();
});