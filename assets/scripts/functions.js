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
    $.get("https://www.youracclaim.com").then((data) => {
        console.log(data)
    })

});

sloganToggle = () => {
    const currentScrollPos = window.pageYOffset;
      if (this.prevScrollPos >= currentScrollPos) {
        $('.carousel-caption').css('display', 'block');
      } else {
        $('.carousel-caption').css('display', 'none');
      }
  }
