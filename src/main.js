import World from "/src/three-js/world.js"

async function main() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: false,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  
  const container = document.querySelector('#scene-container')
  if (container)
  {
    const world = new World(container)
    await world.init()
    world.start()
  }
}

main().catch((err) => {
  console.error(err);
});

$('.social-links').ready(function(){
    $('a').hover(function(){
        $(this).toggleClass('hovered')
        $(this).siblings().toggleClass('not-hovered')
    })
})

$('#personal-experience').ready(function(){
  $('#personal-experience .card').hover(function(){
      let cardType = $(this).attr('class').split(' ')[1];
      $("#personal-experience .experience-description .cover").removeClass('active');
      $("#personal-experience .experience-description ."+cardType).addClass('active');
  },function() {
      let cardType = $(this).attr('class').split(' ')[1];
      $("#personal-experience .experience-description ."+cardType ).removeClass('active');
      $("#personal-experience .experience-description .cover").addClass('active');
  });
});

$('#job-experience').ready(function(){
  $('#job-experience .card').hover(function(){
      let cardType = $(this).attr('class').split(' ')[1];
      $("#job-experience .experience-description .cover").removeClass('active');
      $("#job-experience .experience-description ."+cardType).addClass('active');
  },function() {
      let cardType = $(this).attr('class').split(' ')[1];
      $("#job-experience .experience-description ."+cardType ).removeClass('active');
      $("#job-experience .experience-description .cover").addClass('active');
  });
});

/*
$('.card-container').bind('mousewheel DOMMouseScroll', function(event) {
  event.preventDefault()
  $(this).scrollLeft($(this).scrollLeft() + event.originalEvent.deltaY)
})

let constrain = 100;
let ex1Layer = document.getElementsByClassName("card");
let time = 0;

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

 function transformElement(el, xyEl) {
  el.style.transform  = transforms.apply(null, xyEl);
  el.style.transition = "0s";
}
let timeOfOut = []
$('.card').bind('mousemove', function(e) {
  const d = new Date()
  let seconds = d.getSeconds()
  if (seconds < time + 1) {
    console.log("returned")
    return
  }
  let xy = [e.clientX, e.clientY];
  let el = $(this).get(0)
  let position = xy.concat([el]);
  transformElement( el, position);
});
$('.card').bind('mouseout', function(e) {
  const d = new Date()
  time = d.getSeconds()
  let el = $(this).get(0)
  el.style.transition = "1s";
  el.style.transform = "perspective(200px) "
  + "   rotateX(0deg) "
  + "   rotateY(0deg) ";
});
$('.card').bind('mousein', function(e) {
  const d = new Date()
  let seconds = d.getSeconds()
  if (seconds > time + 1) {
    console.log("returned")
    return
  }
  let xy = [e.clientX, e.clientY];
  let el = $(this).get(0)
  let position = xy.concat([el]);
  transformElement( el, position);
});*/