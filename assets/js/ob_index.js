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






var ipInfo = new Object();



$(document).ready(function() {

    console.warn('[$(document).ready]','version 0.3a')

 // Will execute myCallback every 10  seconds /0.5/
 console.warn('[$(document).ready]','spotifyCurrentPlaying','kickstarting')
 const interval = setInterval(function() {
    console.log('[spotifyCurrentPlaying] repeating')
     // method to be executed;
     spotifyCurrentPlaying()
 }, 10000);



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
  // if(isFacebookApp()){
    // your action here if user using Facebook in-app browser
 //  alert('Are you using Facebook Browser? To get better experience, try press [...] and Open the blog in Chrome or Safari. Thank you!');
 //}
 if(isFacebookApp()&&isiOS()){
    // your action here if user using Facebook in-app browser
    $('#confirm_directDebit').html('open in another browser to confirm').prop('disabled', true);
 //alert('Are you using Facebook Browser? To get better experience, try press [...] and Open the blog in Chrome or Safari. Thank you!');
 //$('.enableOnInput')
 //return 
}
   
	innerHeight = window.innerHeight
    $('#wrapper_landingFooterObi_mobile').slideDown()
    
    if(isMobile==true){
        //$(window).height()
        $('#landingFooterObi_mobile .mobile_UI_Share').fadeIn()
        //window.screen.height
        //$('#intro').addClass('isMobile')
        //if(isMobile==true){
        
        //}
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


    
    /* button commands */
    /* pay show button */
 
   // $('.buttonPayFooter').slideUp( "slow", function() {
        // Animation complete.
     // });
   






     /////////
     var dueDate_over = function(){
         console.log('[payButtonHover][hover] over')
         slider_DownElemToggle('#dueTimer',false)//slider_DownElemToggle('#dueTimer',)
    }
    var dueDate_out = function(){
        console.log('[payButtonHover][hover] out')
        slider_DownElemToggle('#dueTimer',true)
    }
    var hoverConfig_showDueDate = {    
        over: dueDate_over, // function = onMouseOver callback (REQUIRED)    
        timeout: 3000, // 500/number = milliseconds delay before onMouseOut    
        interval: 50,//5000 // number = milliseconds delay before trying to call over    
        out: dueDate_out // function = onMouseOut callback (REQUIRED)    
   };
   /* https://briancherne.github.io/jquery-hoverIntent/ */
   //$('#invoiceTitle').hoverIntent( hoverConfig_showDueDate )
   //$('#headerOrnament .replace_clientName').hoverIntent( hoverConfig_showDueDate )
   //$('.progressBar_wrapper .progressBar').hoverIntent( hoverConfig_showDueDate )
   //$('#mainLogo').hoverIntent( hoverConfig_showDueDate )
   $('#invoiceHeader, .progressBar_wrapper .progressBar, #headerOrnament .replace_clientName,#mainLogo').hoverIntent( hoverConfig_showDueDate )
    
 
   $("#invoiceHeader, .progressBar_wrapper .progressBar, #headerOrnament .replace_clientName").on('click touchstart',function(){
        var elem = '#dueTimer'
        $(elem).attr('slider-lock',true)
        slider_DownElemToggle(elem,false)
        setTimeout(function() {
            var elem = '#dueTimer'
            $(elem).attr('slider-lock',false)
            slider_DownElemToggle(elem,true)
        },6000)
    });

    

    var payButton_over = function(){
   
        var buttonSuffix_id = $(this).attr('id')
        console.log('[payButton][hover] over',buttonSuffix_id)
       // alert('payButton over')

       switch($(this).attr('data-payment-mode')) {
        case 'Stripe':
            //showDueDateString()
           // $(this).parent().find('.buttonPayFooter').slideDown()
           $('#landingFooterObi div a.logo_stripe img.socialIconSet').addClass('whiteSvgFilter')
          break;
        case 'Direct Debit':
          //  hideDueDateString()
          if(urlParams.polipay_id){
                $('#landingFooterObi div a.logo_polipay img.socialIconSet').addClass('whiteSvgFilter')
                $('#landingFooterObi div a.logo_auspost img.socialIconSet').addClass('whiteSvgFilter')
            break; 
            }
          $('#landingFooterObi div a.logo_obisims img.socialIconSet').addClass('whiteSvgFilter')
          break;
        case 'Coinbase':
           // hideDueDateString()
           $('#landingFooterObi div a.logo_coinbase img.socialIconSet').addClass('whiteSvgFilter')
            break;
        default:
          // code block
         // console.log('[slidData CLICK] BLOCK slidData',slidData)
      }
        slider_DownElemToggle('#'+buttonSuffix_id+'_footer',false)//slider_DownElemToggle('#dueTimer',)
   }
   var payButton_out = function(){
      
       var buttonSuffix_id = $(this).attr('id')
       console.log('[payButton][hover] out',buttonSuffix_id)
      // alert('payButton over')
      $('#landingFooterObi div a img.socialIconSet').removeClass('whiteSvgFilter')
       slider_DownElemToggle('#'+buttonSuffix_id+'_footer',true)//slider_DownElemToggle($(this),true)
   }
   var hoverConfig_showpayButton = {    
       over: payButton_over, // function = onMouseOver callback (REQUIRED)    
       timeout: 200, // 500/number = milliseconds delay before onMouseOut    
       interval: 100,//5000 // number = milliseconds delay before trying to call over    
       out: payButton_out // function = onMouseOut callback (REQUIRED)    
  };
  $( "button.button.payButton" ).hoverIntent( hoverConfig_showpayButton )
    








/*



     $( ".button" ).hover(function() {
         //var $parent = $(this).parent()
         var $this = $(this)
         var data_LockHover = $this.attr('data-lockhover')
         console.log('[button][hover] data_LockHover',data_LockHover)
       //$parent.find('.buttonPayFooter').slideDown()
       if(data_LockHover!='true'){
           
            $this.parent().find('.buttonPayFooter').slideDown()//.data('lockhover','true') 
            //$pay_Direct
        }//else{}
  
       switch($this.attr('data-payment-mode')) {
        case 'Stripe':
            //showDueDateString()
           // $(this).parent().find('.buttonPayFooter').slideDown()
           $('#landingFooterObi div a.logo_stripe img.socialIconSet').addClass('whiteSvgFilter')
          break;
        case 'Direct Debit':
          //  hideDueDateString()
          $('#landingFooterObi div a.logo_obisims img.socialIconSet').addClass('whiteSvgFilter')
          break;
        case 'Coinbase':
           // hideDueDateString()
           $('#landingFooterObi div a.logo_coinbase img.socialIconSet').addClass('whiteSvgFilter')
            break;
        default:
          // code block
         // console.log('[slidData CLICK] BLOCK slidData',slidData)
      }
        
    }, function() {
       // $(this).data('lockHover', true);
       //setTimeout(function() {
           var $this = $(this)
           var data_LockHover = $this.attr('data-lockhover')
           console.log('[button][hover][off] data_LockHover',data_LockHover,$this)
        if(data_LockHover!='true'){
            $this.parent().find('.buttonPayFooter').slideUp()  
        }
        $('#landingFooterObi div a img.socialIconSet').removeClass('whiteSvgFilter')
      // },600)
      
       
      })
    


*/



	$( ".mobile_scrollToTop_UP" ).click(function() {
		console.log('[clicked] mobile arrowUp')
        shrinkDeadSpace(false)
       // scrollToTop()
        scrollTo(1, 400);
	});
	$( "#landingScrollUpButton" ).click(function() {
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
    
	$( "#landingScrollDownButton" ).click(function() {
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

  
    
  //  clearInterval(interval);
        //Spotify now playingf intergration
    
  
    //var $payButtons = $('.button.payButton');
    //var $payButtons = $('ul#paymentOptions li .button.payButton')//.fadeIn()
    //$payButtons.each(function() {
   // })
  
   setTimeout(function() {
        const buttonTime = 750
        var buttonIndex = 0
        $('#headerSlideInWrapper').fadeTo( "fast" , 1, function() {
            // Animation complete.
           
            setTimeout(function() {
                
                $('ul#paymentOptions li .button.payButton').each(function(index,button){
                    buttonIndex++
                    console.log(button)
                    //$(button).fadeIn()
                    setTimeout(function() {
                        //$(button).fadeIn('slow')
                        $(button).fadeIn( 1500, function() {
                            // Animation complete
                            //loadInFooter()
                            });
                    }, buttonTime*(index+1)) // or just index, depends on your needs
                    
                })
              
                //$('.progressBar').fadeIn()
                var __progress = '.progressBar span.progressBar_progress'
                var $progress = $(__progress)
                
                
                $('.progressBar_wrapper').fadeIn()
                var progressBarSettings = {
                    moment:{
                      creation_date:due_issued,//invoiceSettings.date.ISSUED,
                      record_time:moment(),
                      completion_date:due_date,//invoiceSettings.date.DUE,
                    }
                  };
                  
                 // $('.preLoadLineBreak_removeMe').remove()
                 
                 
                   var progressBar = progressTheProgressBar(__progress,3000,null,progressBarSettings.moment)
                   $('.progressBar_wrapper .progressBar').removeClass('blurred')
                  console.log('[progressBar]',{progressBar:progressBar})
                setTimeout(function() { //for footer
                    
                      //$('#dueTimer').fadeIn()
                      
                      var $dueTimer = $('#dueTimer')
                        $dueTimer.removeClass('initialHide')
                        $dueTimer.data('slider-lock',true)
                        $dueTimer.slideDown()
                        $dueTimer.data('slid','down')
                        setTimeout(function() { 
                            $dueTimer.slideUp()
                            $dueTimer.data('slider-lock',false)
                        },6000)

                      $('#landingFooterObi').fadeIn( 1500, function() {
                        // Animation complete
                        
                        setTimeout(function() {
                            //$('#navAndMain').slideDown(1900)
                            //$('#landing').removeClass('pushInvoiceDown')
                            //slide-up
                           
      
                              
                            $('#landingScrollDownButton').fadeIn(1700)
                            $('#landingFooterObi_mobile').fadeIn(1900)
                            
                        },1*buttonTime) 
                    });
                       
                },(buttonIndex+2)*buttonTime) 
            },buttonTime)
        });
        //$('#headerOrnament').slideDown(1000)
        //$('#invoiceHeader').slideDown(1000)


   },500)
   
  
/*
    var time = 500;
  console.log('[onReady] fade payButtons in')
    $payButtons.each(function() {
        setTimeout( function(){
            console.log('[onReady] fade payButton',$(this))
            //addPositioningClass($(this));
            $(this).fadeIn( "slow", function() {
             // Animation complete
             });
         }, time)
        time += 500;
    });

*/

//var creation_date = invoiceSettings.date.ISSUED



///?? end of doc ready, wtf

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
    //if(urlParams){
    //    if(!urlParams.stripe_checkout){
    //        postSlackNotification_gateway_opened(""+stateSettings.status.isMobile+"",ipInfo)
    //    }
    //}
     
   })
   var obiAPI_params = new Object();
    ob_api(urlParams.inv)
    //OVERRITE URL PARAMS WITH API
  


    console.log('[urlParams] obiAPI_params',obiAPI_params)
  
   if(obiAPI_params['INV NUM']){
    console.log('[ob_api]','obiAPI_params["INV NUM"] present',obiAPI_params)
    /*  DUE: "22-10-2020"
        ISSUED: "08-10-2020"
        NUM: 1167
        contact: {CLIENT: "Test Dudes Pty Ltd", CLIENT ID: 0, ATTENT ID: "Obi S [0] - TestDude", ATTENT EMAIL: "yomoma@gmail.com"}
        docs: {ROW NUMBER: 7, FILE URL: "https://docs.google.com/document/d/19boC4iOwOU_YBl_YXIBe-H7aL-JVV1C6Ej3NpI-8mWA/edit?usp=drivesdk", FILE ID: "19boC4iOwOU_YBl_YXIBe-H7aL-JVV1C6Ej3NpI-8mWA"}
        info: {PROJECT ID: 3, PROJECT: "Test Project", INV UNIQ ID: "f0397447-24af-4672-9e30-db9104392ca7"}
        pay: {TOTAL: 50, STATUS: "TEST", PAID ON: "Invalid date"}
    */
   
    }

var invoiceSettings = {
    DOMAIN:(window.location.origin + window.location.pathname||'https://invoice.obisims.com/'),
    payStatus:{
        STATUS:obiAPI_params['STATUS']||'UNPAID',
        METHOD:obiAPI_params['PAID METHOD'],
        AMOUNT:obiAPI_params['TOTAL'],
        TIME:obiAPI_params['PAID UPDATED'],
        RECEIPT:obiAPI_params['PAID RECEIPT']
    },
    user:{
        ipInfo:''
    },
    invoice:{
        NUM:obiAPI_params['INV NAME']||obiAPI_params['INV PREFIX']+'-'+obiAPI_params['INV NUM']||urlParams.inv,
        TOTAL:obiAPI_params['TOTAL']||urlParams.inv_total||0,
        CLIENT_NAME:obiAPI_params['CLIENT']||urlParams.client_name,
        PROJECT_NAME:obiAPI_params['PROJECT']||urlParams.project_name,
        DRIVE_ID:obiAPI_params['DRIVE ID']||urlParams.drive_id,//'1GNeI5UAfcbLYnmqGsqXACsO5lQ7YyPlYCNmSvDHpkEU',
        DRIVE_IFRAME_URL:'',//'https://docs.google.com/viewer?srcid=1GNeI5UAfcbLYnmqGsqXACsO5lQ7YyPlYCNmSvDHpkEU&pid=explorer&efh=true&a=v&chrome=false&embedded=true&rm=minimal&widget=false'
    },
    date:{
        ISSUED:moment(obiAPI_params['ISSUED'],'DD-MM-YYYY')||moment(urlParams.date_issued,'DDMMYYYY'),
        DUE:moment(obiAPI_params['DUE'],'DD-MM-YYYY')||moment(urlParams.date_due,'DDMMYYYY'),
        PROGRESS:0,
    },
    extensions:{
        spotify:{
            listeningTo:{
                id:'66cbc0d7e5264f54bc4309341a27c095',
            }
        },
        spotifyCurrentPlaying:{
            url:'https://script.google.com/macros/s/AKfycbx80aaVAqsIlN3SB6641ggfWurbVNX2X1zvCQJUDOXen4KtOok/exec'
        },
        ob_api:{
            url:'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'//?inv="THX-1138"
        }
    },
    checkouts:{
        'Stripe':{
            price_id:obiAPI_params['STRIPE CHECKOUT ID']||urlParams.stripe_price_id,
            price:obiAPI_params['STRIPE PRICE']||'',
            //  api:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            PUBLISHABLE_KEY:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            surcharge:'1.75% + $0.30 surch'
        },
        'Coinbase':{
            price_id:'PRICE_ID needs to be grabbed',
            gateway:'https://commerce.coinbase.com/charges/',
            url:obiAPI_params['CRYPTO CHECKOUT']||"https://crypto.obisims.com/" + (urlParams.inv||'THX-1184'),
            surcharge:'0% surcharge'
           // url:"https://crypto.obisims.com/"+INVNUM
        },
        'Direct Debit':{
            price_id:uuidv4(),
            price:obiAPI_params['TOTAL']||'',
            id:obiAPI_params['POLIPAY ID']||'',
            api:'https://poliapi.apac.paywithpoli.com/api',
            surcharge:'0% surcharge',
            url:"https://poli.to/"+obiAPI_params['POLIPAY ID']||"https://poli.to/"+urlParams.polipay_id||'',
            apikey:'UzYxMDUyMzQ6NXIhQVBeOHQ5aSQ=',//poli
            data:{
                /*Docs: http://www.polipaymentdeveloper.com/doku.php
                Merchant Url: https://consoles.apac.paywithpoli.com */
                  'Merchant Name':'OBI SIMS',
                  'Merchant Code':'S6105234',
                  'Authentication Code':'5r!AP^8t9i$',
                  'Currency Code':'AUD',
                  'Country Code':'AU'
                  },
        }
    }
}
//invoiceSettings.checkouts['Direct Debit'].apikey = make_base_auth(invoiceSettings.checkouts['Direct Debit'].data['Merchant Code'], invoiceSettings.checkouts['Direct Debit'].data['Authentication Code'])

if(urlParams.stripe_price)invoiceSettings.checkouts['Stripe'].price = urlParams.stripe_price
if(urlParams.inv_total){
    invoiceSettings.checkouts['Direct Debit'].price = urlParams.inv_total
    invoiceSettings.checkouts['Coinbase'].price = urlParams.inv_total
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
if(!urlParams.polipay_id){
    $('.logo_auspost').remove()
    $('.logo_polipay').remove()
   // urlParams.polipay_id
    $('.ifNoPoliPay').remove()
}else{
    $('#pay_Direct.payButton span').html(`Pay with <span class="logo_auspost">
    <img class="whiteSvgFilter" src="images/paymentIcons/masterLogos_platform_auspost.svg" onerror="this.onerror=null; this.src='images/paymentIcons/fallbacks/masterLogos_platform_auspost.png'">
</span>
<span class="logo_polipay">
    <img class="whiteSvgFilter" src="images/paymentIcons/masterLogos_platform_polipay.svg" onerror="this.onerror=null; this.src='images/paymentIcons/fallbacks/masterLogos_platform_polipay.png'">
</span>`)
    //style="font-weight:700;"
}


/////////////////////////////////////////






//////////////////////////////////////////



//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////





if(urlParams.date_due){
    var due_date = moment(urlParams.date_due,'DDMMYYYY')//DD-MM-YY
    invoiceSettings.date.DUE = due_date
    var due_issued = moment(urlParams.date_issued,'DDMMYYYY')//DD-MM-YY
    invoiceSettings.date.ISSUED = due_issued
    var timer = dueTimer(due_date)
    $('#dueTimer').text(timer) //urlParams.date_due //invoiceSettings.invoice.CLIENT_NAME
    //$('#mobileInvoiceHeader').attr('data-before', urlParams.date_due);

    /* IF DUE DATE IS PRESENT */

}else{
    $('#dueTimer').text("No due date set")//Doppelgänger Doppelgänger Dudes Pty Ltd
    //$('#dueTimer').remove()
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
    $('.removeOnMobile').remove()
    $('.pay_instructions_left p.footnote').html($('.pay_instructions_left p.footnote sup'))
}else{
    $('.removeOnDesktop:not(.ifNoPoliPay)').remove()
    
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




/////////////////////////////////////////
//////////////////////////////////////////