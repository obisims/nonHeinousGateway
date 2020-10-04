
function dueTimer_kickStart(daysUntilDue,nowDate){
	return dueTimer(moment(nowDate||moment()).add(daysUntilDue||14,'days'))//,time_now
}
//.toLowerCase()
function dueTimer(dueDate,nowTime){
	var response = ''
	var nowDate = nowTime||moment()
	var daysUntilDue = dueDate.diff(nowDate,'days')
	console.log(daysUntilDue)	
	var timer = dueDate.calendar(nowDate,{
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: "dddd [the] Do",//'dddd'
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: "ddd Do [of] MMM 'YY",//ddd Do MMM 'YY ///'dd - MM - YYYY'
	})
	response = timer
	if(daysUntilDue==7){
		response = 'in a Week'
	} else if(daysUntilDue>1&&daysUntilDue<7){
		response = ''+moment(dueDate).format('dddd')//+', in '+daysUntilDue+' days'
	}else if(daysUntilDue>=15){
		response = 'in more than a Fortnight'
	}else if(daysUntilDue>=14){
		response = 'in a Fortnight'
	} else if(daysUntilDue>7&&daysUntilDue<14){
		response = 'next '+moment(dueDate).format('dddd')
	} else if(daysUntilDue>7){
		response = 'in Over a Week'
	}
/*	var daysOff = dueDate.diff(nowDate, 'days')
console.log(daysOff)
	//if over 7 days left
	if(daysOff>=7)response = 'in over a week'// =1
	*/
return response//+ ' | '+daysUntilDue
}


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function copyToClipboard(txt){
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(txt).select();
  document.execCommand("copy");
  $temp.remove();
}


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
/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

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
//////////GET SCREEN HEIGHT INFO
*/////////////////////////////////////////
function getScreenHeights(){
    screenHeight = window.screen.height // 896 <-this one seems to have the piuxels from the adress bar aswell... that should help with the weird scroll calcs
		innerHeight = window.innerHeight //  719 //originally i was using this one
		scroll = document.documentElement.scrollTop || document.body.scrollTop
		//console.log('[scroll] scroll: ',scroll);
		windowHeight = $(window).height() // 719 aswell, seems same as innerHeight
		
		var elemHeights = {/*vh and px vals 0.5 = 50vh */
			shrunkSpacer:{px:50},
			shrinkCompenA:{vh:0.035},
			main:{vh:0.83},//93vh on desktop main intro
			shrinkCompenB:{vh:0.035},
			window:{vh:1,px:windowHeight},
			screen:{vh:screenHeight/windowHeight,px:screenHeight}
		}
		
		/*function vhConvert(vh,converter){
			var screenHeight = screenHeight
		}*/
		elemHeights.shrunkSpacer.vh = elemHeights.shrunkSpacer.px/windowHeight

		elemHeights.shrinkCompenA.px = windowHeight*elemHeights.shrinkCompenA.vh
		elemHeights.main.px = windowHeight*elemHeights.main.vh
		elemHeights.shrinkCompenB.px = windowHeight*elemHeights.shrinkCompenB.vh
		elemHeights.main.px = windowHeight*elemHeights.main.vh

		elemHeights.full = elemHeights['shrunkSpacer'].px+elemHeights['shrinkCompenA'].px+elemHeights['main'].px+elemHeights['shrinkCompenB'].px

		elemHeights.shrunkSpacer.sh = elemHeights.shrunkSpacer.px/screenHeight
		elemHeights.shrinkCompenA.sh = elemHeights.shrinkCompenA.px/screenHeight
		elemHeights.main.sh = elemHeights.main.px/screenHeight
		elemHeights.shrinkCompenB.sh = elemHeights.shrinkCompenB.px/screenHeight
/*		
		elemHeights.shrunkSpacer.sh = screenHeight*elemHeights.shrunkSpacer.vh
		elemHeights.shrinkCompenA.sh = screenHeight*elemHeights.shrinkCompenA.vh
		elemHeights.main.sh = screenHeight*elemHeights.main.vh
		elemHeights.shrinkCompenB.sh = screenHeight*elemHeights.shrinkCompenB.vh
*/

		console.log('[getScreenHeights]',scroll,elemHeights)
		
return elemHeights
}


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
    console.log('[scrollTo]',{element:element,duration:duration})
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
