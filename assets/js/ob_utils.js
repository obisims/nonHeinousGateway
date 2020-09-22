
function scrollToTop(){
	window.scrollTo({
			top: -10,
			left: 0,
			behavior: 'smooth'
		});
}/*
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
*/


/*////////////////////////////////////////
//////////////ANIMATION UTILS
*/////////////////////////////////////////
var animationEnd = 'webkitAnimationEnd mozAnimationEnd oanimationend animationend';

const animateCSS = (element, animation,speed, addExtraClass,removeExtraClass,prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        //const node = document.querySelector(element);
        const $elem = $(element)
        // $($elem).removeClass('hidden-load')
        //node.classList.add(`${prefix}animated`, animationName);
        var classConstructor = `${prefix}animated ${animationName}`
        if(addExtraClass)classConstructor+=` ${addExtraClass}`
        if(speed)classConstructor+=` ${prefix}${speed}`
        //$(this).removeClass(addExtraClass)
        
        $elem.addClass(classConstructor).one(animationEnd, function() {
            if(removeExtraClass)classConstructor+=` ${removeExtraClass}`
            $(this).removeClass(classConstructor)
            resolve('Animation ended');
        })
        
        // When the animation ends, we clean the classes and resolve the Promise

        /*
        function handleAnimationEnd() {
          node.classList.remove(`${prefix}animated`, animationName);
          resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
        */
    });


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////

// Element to move, time in ms to animate
function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
      var t = e.scrollTop;
      ++e.scrollTop;
      e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
  }
  
  // Element to move, element or px from, element or px to, time in ms to animate
  function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;
  
    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
  }
  
  function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
      element.scrollTop = xTo;
      return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;
  
    setTimeout(function() {
      scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
  }
  
  function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
  }
/////////////////////////////////////////
//////////////////////////////////////////
