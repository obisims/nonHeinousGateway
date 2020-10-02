/*
index functions

*/

//const { Console } = require("console");

/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////



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






//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////







/*////////////////////////////////////////
/////////JQUERY ON DOCUMENT READY
*/////////////////////////////////////////

/*////////////ON SCROLL///////////////*/
$(document).on( 'scroll', function(){
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
        screen:{vh:screenHeight/windowHeight,px:screenHeight,sh:1}
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
    elemHeights.window.sh = elemHeights.window.px/screenHeight

    if(!isMobile){
        // for desktop
       // vhInPixels_expandAt =  shrinkToHeight - (windowHeight*ExpandStuffAt); // shrinkToHeight -(ShrinkStuffAt*ExpandStuffAt) //(windowHeight * ExpandStuffAt); // 0.65 = 6.5vh
       vhInPixels_expandAt =  shrinkToHeight - (shrinkToHeight*ExpandStuffAt);
    }else{
        // what is padding for mobile?
        //it gets changed from 93 to 83 (-10% of page height)
        //the two shrink comps are 3.5vh
        //so 93 + 3.5 + 3.5 = 100
        // 90? so add in 10vh to expand breakpoint?
        //vhInPixels_expandAt =  (windowHeight*0.1)-(shrinkToHeight - (windowHeight*ExpandStuffAt));
        
        // > > vhInPixels_expandAt =  (shrinkToHeight - (screenHeight*ExpandStuffAt)); 
        
        
        // this is kinda working... weverything is rad when the adress bar is there but it autocloses immiedtaly when the invoice opens...
        //so i need to? what? ad in the extra bar space

        //still buggy, noticed we were using innerHeight(719) when there is screenHeight(896) so lets see
        //breakdown
        //	(windowHeight*0.1) = 10th of minimum screen
        //  shrinkToHeight  = height of the stuff above the viewer.
        //	 - (windowHeight*ExpandStuffAt) = minimum screen height * 0.025 = 2.5% of minScreen
        //  if scroll (50px) is less then x then re-expand the deadspace.
        //	x needs to = the space above the padding (shrinkToSize) - a movement amount

        //fuck... so i was using 15vh as an 'amount of screen gestured to swipe'  thing but sometimes that number sets the shit under 0 so now expand trigger fires...

        // > > if(vhInPixels_expandAt<=0)vhInPixels_expandAt = shrinkToHeight*0.15

        //switch the expandAt height to a percentage of the filler
        //vhInPixels_expandAt = shrinkToHeight*ExpandStuffAt
        //vhInPixels_expandAt = 1
        //vhInPixels_expandAt = 0
        //find out what mobile difference in vh is in sh
        //93<83
        // 
        // (elemHeights.screen.vh*7) add ir somewhere

        ///OH!!! fucking overscroll!, so we can just use minueses?
        vhInPixels_expandAt = -1
        //Fuck, my android doesn't support and it's forcing me to refresh wehen i scroll up
        //i redesigned a bunch of the hight systems and stuff, lets see if that actully fixed what was up here and try my original intuitions.
        //vhInPixels_expandAt =  0 //shrinkToHeight - (shrinkToHeight*ExpandStuffAt);

    }
    //if(vhInPixels_expandAt<=0)vhInPixels_expandAt = shrinkToHeight*0.1
    vhInPixels_shrinkAt = (windowHeight * ShrinkStuffAt);
    
    var elemHeights = {/*vh and px vals 0.5 = 50vh */
        shrunkSpacer:{px:50},
        shrinkCompenA:{vh:0.035},
        main:{vh:0.83},//93vh on desktop main intro
        shrinkCompenB:{vh:0.035},
        window:{vh:1,px:windowHeight},
        screen:{vh:screenHeight/windowHeight,px:screenHeight}
    }
    var elemHeights = getScreenHeights()
    

    var sortingOutHeights = {
        window:elemHeights.window.px,
        screenHeight:elemHeights.screen.px,
        shrinkToHeight:elemHeights.shrunkSpacer.px,
        ExpandStuffAt:gateWaySettings.elements.deadSpace.expandAt,
        ShrinkStuffAt:gateWaySettings.elements.deadSpace.shrinkAt,
        expandAt:vhInPixels_expandAt,
        shrinkAt:(windowHeight * ShrinkStuffAt)
    }

    var scrollThresholds = {
        ExpandStuffAt:gateWaySettings.elements.deadSpace.expandAt,
        ShrinkStuffAt:gateWaySettings.elements.deadSpace.shrinkAt,
        expandAt:vhInPixels_expandAt,
        shrinkAt:(windowHeight * ShrinkStuffAt)
    }
   
    
    //console.log('[onScroll] sortingOutHeights',sortingOutHeights)
    var scrollster = {
        //scroll:scroll,
    //	shrunk:deadSpaceShrunk,
        shrinkAt:vhInPixels_shrinkAt,//,
        expandAt:vhInPixels_expandAt,
        //shrinkToHeight:shrinkToHeight
    }
   

    console.log('[scroll]',scroll,{stateSettings:stateSettings,scrollster:scrollster,elemHeights:elemHeights})
    
    if(scroll>sortingOutHeights.shrinkAt&&stateSettings.status.deadSpace == 'full'){
        console.log('[scroll] shrinking: ',scroll,{stateSettings:stateSettings,scrollster:scrollster});
        //if space is there // obj{height: 100}
        // and scroll if above shrink threshold (scroll=100, threshold=75) 
        //then shrink the space  // obj{height: 50} // new scrolll is scroll-50
        shrinkDeadSpace(true)
        //deadSpaceShrunk==true
        //stateSettings.status.deadSpace = 'shrunk'
       // console.log('[!GLOBAL SET!][scroll]','deadSpaceShrunk:',deadSpaceShrunk)
        
    } else if(scroll<=sortingOutHeights.expandAt&&stateSettings.status.deadSpace == 'shrunk'){
        console.log('[scroll] expanding: ',scroll,{stateSettings:stateSettings,scrollster:scrollster});
        //if space is NOT there
        // and scroll is BELOW shrink threshold (scroll=50, threshold=75)
        //then shrink the space
        shrinkDeadSpace(false)
        //stateSettings.status.deadSpace = 'full'
       // console.log('[!GLOBAL SET!][scroll]','deadSpaceShrunk:',deadSpaceShrunk)
    }

});








var ipInfo = new Object();
$(document).ready(function() {
    console.log('[$(document).ready]','')
    $('#surcharge_stripe').html(invoiceSettings.checkouts['Stripe'].surcharge)
$('#surcharge_directDebit').html(invoiceSettings.checkouts['Direct Deposit'].surcharge)
$('#surcharge_coinbase').html(invoiceSettings.checkouts['Coinbase'].surcharge)

    /*slack_invoiceLoad({
          invNum : 'THX-1138',
          chan : "#obisims-invoices",
          project:'some project',
          client:'Doppelgänger Doppelgänger Dudes Pty Ltd'
        })*/
       
       // console.log('[document).ready] ipInfo',ipInfo)
    ///if is mobile chnage base state
    /*
    $('#lastFmWidget').lastfmNowPlaying({
        apiKey: '2aaee86f01b31b5f99409e37844e4038',
        members: ['obi_sims']
    });
    */
   
	innerHeight = window.innerHeight
	
    if(isMobile==true){
        //$(window).height()
        //window.screen.height
        //$('#intro').addClass('isMobile')
        $('#landing').addClass('isMobile')
        //(elemHeights.screen.vh*7)+50
        $('#intro').css('height','83vh')
        $('#shrinkMobileBuffer').css('height',(window.screen.height/$(window).height()*7))
        //window.scrollTo(0,1)
        scrollTo(1, 200);
        //console.log('its Mobile wht height?',innerHeight)
        
        if(innerHeight<=500){
            /* text fix for tiny phones */
            document.body.style.fontSize = '80%'
            /*$('#header').css('padding-top','30%')*/
        } else if(innerHeight<=700){
            /* text fix for tiny phones */
           /* $('#header').css('padding-top','40%')*/
            document.body.style.fontSize = '90%'
        }else{
            /*$('#header').css('padding-top','45%')*/
            document.body.style.fontSize = '95%'
        }
        
    }

/*
    var mc = new Hammer(document.querySelector('#hammerMe'));
    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    // listen to events...
    mc.on("panup pandown", function(ev) {
        console.log('[HAMMER.JS][PAN DETECTED]',ev.type)
        //document.getElementById('myElement').textContent = ev.type +" gesture detected.";
    });
*/


    /////////////////////
    /* MOBILE UI BUTTONS */
    
    $('#mobile_UI_Download').click(function(){
        var downloadURL = 'https://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf'
        /* //window.open('http://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf', 'Download');  
        this one opens the doc in google docs on android
        opens a new page with [df]
        */
        //window.location.href = downloadURL
        window.open(downloadURL, 'Download')
        //http://docs.google.com/document/d/16bWRp0-Sraw9hiaFilyanhpnaVd43UQDcGZVUW9BaMI/export?format=pdf
    })
    $('#mobile_UI_Share').click(function(){
         /* Copy the text inside the text field */
       // document.execCommand("copy");
        copyToClipboard('https://pay.obisims.com/'+invoiceSettings.invoice.NUM)
       
        /* Alert the copied text */
        alert("link shared?");  
    })


    /* button commands */
	$( ".button" ).hover(function() {
		console.log('[hover] button')
		$(this).next().toggleClass('notActive')
	})
	$( "#mobile_scrollToTop_UP" ).click(function() {
		console.log('[clicked] mobile arrowUp')
        shrinkDeadSpace(false)
       // scrollToTop()
        scrollTo(1, 400);
	});
	$( ".arrowUp" ).click(function() {
		console.log('[clicked] arrowUp')
		shrinkDeadSpace(false)
        //scrollToTop()
        scrollTo(1, 400);
		/*
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		*/
	});
	$( ".arrow" ).click(function() {
        console.log('[clicked] arrowDown')
        var nowHeights = getScreenHeights()
        var scrollingTo = nowHeights.shrinkCompenA.px+nowHeights.shrunkSpacer.px// document.body.scrollHeight
        console.log('[clicked] scrolling down to',scrollingTo)
        scrollTo(scrollingTo, 400);
        /*window.scrollTo({
			top: dscrollingTo,
			left: 0,
			behavior: 'smooth'
		});*/
        shrinkDeadSpace(true)
		/*window.scrollTo({
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});*/
		//  window.scrollTo(0,);
    });
    /////////////////////

    /* Load BG at end */
    var loadBackground = loadBackgroundGif(all_backgrounds.lineart)
})
/////////////////////////////////////////
//////////////////////////////////////////










/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////






//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////










/*////////////////////////////////////////
//////////////MAIN RUNNER
*/////////////////////////////////////////

/* GLOBAL SETTINGS */
var urlParams = getParams(window.location.href);//encodeURI when creating
console.log('[urlParams] grabbing',urlParams)
/*
urlParam input
    inv_num = 'xxx-7696'
    client_name = 'Some Dude'
    project_name = 'some project name'
    stripe_price_id = 'price_1HT15bEB9Gfp1i8QEykc8D5k'
 */
/*var fakeURL = '?inv_num='+encodeURI('THX-1138')+
'&client_name='+encodeURI('Some Dude')+
'&project_name='+encodeURI('some project name')+
'&stripe_price_id='+encodeURI('price_1HT15bEB9Gfp1i8QEykc8D5k')
console.log('fakeurl',fakeURL)*/
 
$.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    // console.log('[GetUserIP] data',data)
     //return data
     var plainTextData = data
     
     var regex_ip = /^ip=(.*)$/img;
     ipInfo.ip = regex_ip.exec(plainTextData)[1]
    // console.log(ipInfo.ip)//;
     var regex_loc = /^loc=(.*)$/img;
     var regex_colo = /^colo=(.*)$/img;
     ipInfo.loc = regex_loc.exec(plainTextData)[1]
    // console.log(ipInfo.loc)//;
     ipInfo.colo = regex_colo.exec(plainTextData)[1];
    // console.log(ipInfo)
    // return arr[1]; 
    invoiceSettings.user.ipInfo = ipInfo
     //ipInfo = data //GetUserIP()
    // console.log('[GetUserIP] data',ipInfo.ip,ipInfo)
     postSlackNotification_gateway_opened(""+stateSettings.status.isMobile+"",ipInfo)
   })

var invoiceSettings = {
    DOMAIN:(window.location.origin + window.location.pathname||'https://invoice.obisims.com/'),
    payStatus:{
        STATUS:'UNPAID',
        METHOD:'',
        AMOUNT:0,
        TIME:'',
        RECEIPT:''
    },
    user:{
        ipInfo:''
    },
    invoice:{
        NUM:urlParams.inv,
        TOTAL:(urlParams.inv_total||0),
        CLIENT_NAME:urlParams.client_name,
        PROJECT_NAME:urlParams.project_name,
        DRIVE_ID:urlParams.drive_id,//'1GNeI5UAfcbLYnmqGsqXACsO5lQ7YyPlYCNmSvDHpkEU',
        DRIVE_IFRAME_URL:'',//'https://docs.google.com/viewer?srcid=1GNeI5UAfcbLYnmqGsqXACsO5lQ7YyPlYCNmSvDHpkEU&pid=explorer&efh=true&a=v&chrome=false&embedded=true&rm=minimal&widget=false'
    },
    checkouts:{
        'Stripe':{
            price_id:urlParams.stripe_price_id,
            //  api:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            PUBLISHABLE_KEY:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            surcharge:'1.75% + $0.30 surch'
        },
        'Coinbase':{
            price_id:'K7MJAEP3',
            gateway:'https://commerce.coinbase.com/charges/',
            url:"https://crypto.obisims.com/" + (urlParams.inv||'THX-1184'),
            surcharge:'0% surcharge'
           // url:"https://crypto.obisims.com/"+INVNUM
        },
        'Direct Deposit':{
            price_id:uuidv4(),
           // api:'',
            surcharge:'0% surcharge'
        }
    }
}




//if(urlParams.inv)invoiceSettings.invoice.NUM = urlParams.inv
//if(urlParams.inv_total)invoiceSettings.invoice.TOTAL = urlParams.inv_total
//if(urlParams.client_name)invoiceSettings.invoice.CLIENT_NAME = urlParams.client_name
//if(urlParams.project_name)invoiceSettings.invoice.PROJECT_NAME = urlParams.project_name
//if(urlParams.stripe_price_id)invoiceSettings.checkouts['Stripe'].price_id = urlParams.stripe_price_id
//stripe_checkout=paid
if(urlParams.drive_id){
    //set drive iframe in global for push into data-src
    invoiceSettings.invoice.DRIVE_ID = urlParams.drive_id
    invoiceSettings.invoice.DRIVE_IFRAME_URL = 'https://docs.google.com/viewer?srcid='+urlParams.drive_id+'&pid=explorer&efh=true&a=v&chrome=false&embedded=true&rm=minimal&widget=false'
    $('#pdfIframe').data('src', invoiceSettings.invoice.DRIVE_IFRAME_URL);
}
console.log('[invoiceSettings] set',invoiceSettings)

//TEXT REPLACERS
if(urlParams.inv){
    $('.replace_invoiceNum').text(urlParams.inv )//invoiceSettings.invoice.NUM
}else{
    $('.replace_invoiceNum').text('ERR-1138')
}

if(urlParams.client_name){
    $('.replace_clientName').text(urlParams.client_name)//invoiceSettings.invoice.CLIENT_NAME
    $('#mobileInvoiceHeader').attr('data-before', urlParams.client_name);
}else{
    $('.replace_clientName').text("EXAMPLE NAME")//Doppelgänger Doppelgänger Dudes Pty Ltd
}

if(urlParams.inv_total){
    $('.replace_invoiceTotal').text(invoiceSettings.invoice.TOTAL)
}else{
    $('.replace_invoiceTotal').text("0.00")
}

console.log('[invoiceSettings]',invoiceSettings)

/*////////////////////////////////////////////////////////////////////
//////////////////////////SLACK GLOBALS
*/////////////////////////////////////////////////////////////////////
//invoiceSettings.payStatus
console.log('[invoiceSettings]',invoiceSettings)
var global_slackPostSettings = {
  message:{
    NOTIFICATION_SUMMARY:invoiceSettings.invoice.NUM+' | '+'VALUE'+' info'
  },
  settings:{
    CHANNEL:"#obisims-invoices",
    USERNAME:'Invoice Gateway',
    AVATAR:':eye:'
  },
  payment:{
    METHOD:'',
    AMOUNT:invoiceSettings.invoice.TOTAL
  },
  invoice:{
    INV_NUM:invoiceSettings.invoice.NUM,
    CLIENT_NAME:invoiceSettings.invoice.CLIENT_NAME,
    PROJECT_NAME:invoiceSettings.invoice.PROJECT_NAME
  }
}

/*////////////////////////////////////////////////////////////////////
//////////////////////////PAY GLOBALS
*/////////////////////////////////////////////////////////////////////

var paySettings = {
    DOMAIN:invoiceSettings.domain,
    stripe:{
        PUBLISHABLE_KEY:invoiceSettings.checkouts['Stripe'].PUBLISHABLE_KEY//||'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB'
    }
}
var stripe = Stripe(invoiceSettings.checkouts['Stripe'].PUBLISHABLE_KEY);










var allHeights = getScreenHeights()
var gateWaySettings = {
        allHeights:allHeights, //new
        scroll:0, // keep
        vhInPixels_expandAt:0,
        vhInPixels_shrinkAt:0,
        deadSpaceShrunk:false,
        ShrinkStuffAt:0.1,
       
        ExpandStuffAt:0.15, // 0.75// percentage of shrinkToHeight 0.25 // vh
        screenHeight:'',
        windowHeight:'',
        innerHeight:'',
        elements:{
            deadSpace:{
                shrinkToHeight:50,
                shrinkAt:0.15,
                expandAt:0.1
            },
            
        }
    }
   // stateSettings.status.deadSpace = 'shrunk' // 'full'
   
var stateSettings={
    status:{
        scroll:0,
        deadSpace:'full', // 'full','shrunk'
        iFrameLoaded:false,
        isMobile:false
    },
    change:{
        expandAt: 0, //vhInPixels_expandAt
        shrinkAt: 0  //vhInPixels_expandAt
    }   
}
var deadSpaceShrunk = false; // default is 
if(stateSettings.status.deadSpace=='shrunk') deadSpaceShrunk = true
console.log('[!GLOBAL SET INIT!]','deadSpaceShrunk:',deadSpaceShrunk)

var vhInPixels_expandAt = stateSettings.change.expandAt || 0
var vhInPixels_shrinkAt = stateSettings.change.shrinkAt || 0
var shrinkToHeight = gateWaySettings.elements.deadSpace.shrinkToHeight // gateWaySettings.shrinkToHeight. || 50
var ShrinkStuffAt = gateWaySettings.elements.deadSpace.shrinkAt // gateWaySettings.ShrinkStuffAt || 0.1 //150
var ExpandStuffAt = gateWaySettings.elements.deadSpace.expandAt // gateWaySettings.ExpandStuffAt||0.15// 0.75// percentage of shrinkToHeight 0.25 // vh

var scroll = stateSettings.status.scroll

/* BLANK GLOBALS */
var screenHeight;
var windowHeight;
var innerHeight;
var iFrameIsLoaded = stateSettings.status.iFrameLoaded || false;
var isMobile = stateSettings.status.isMobile || false; //initiate as false
/* MOBILE SETTINGS */
/*i.... like, really wanna know if it's mobile */
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
    stateSettings.status.isMobile = true
}


/*  */

/*$('.class').each(function(){
    var $this = $(this);
    var h = new Hammer(this);
    h.on("swiperight", function() {
        //code to execute
    }
});*/

/*$(document.body).hammer().on('release', function(ev){
    alert(ev.gesture);
});*/
/////////////////////////////////////////
//////////////////////////////////////////
