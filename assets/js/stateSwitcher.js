/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////

function stateSwitcher(state){
    var heights = organiseHeights()
    
    var states = {
        landing:{
            desktop:'landing_desktop',
            mobile:'landing_mobile'
        },
        invoice:{
            desktop:'invoice_desktop',
            mobile:'invoice_mobile'
        }
    }
    var state_switchTo = states[state] //'invoice_desktop'


    if(state=='invoice'){
        duoToneSwitcher('invoice')
    }else if(state=='landing'){

    }




    switch(state) {
        case 'landing':
          // code block
          break;
        case 'invoice':
          // code block
          break;
        default:
          // code block
      }


    if(!isMobile){
    }
    
}/////////////////////////////////////////
//////////////////////////////////////////





/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////

function duoToneSwitcher(state,mobile){
    var mobile = isMobile || mobile
    switch(state) {
        case 'header':
          // code block
          break;
        case 'invoice':
          // code block
          break;
      }
}
/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////

function switchState(toState){

    //switchVariables
    ////header
    ////invoice
        //iFrame Load
        //Swipe extend up or down
    ////duotone
    ////UI

}/////////////////////////////////////////
//////////////////////////////////////////


/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////


function organiseHeights(){

}/////////////////////////////////////////
//////////////////////////////////////////




/*////////////////////////////////////////
//////////////
*/////////////////////////////////////////

var loadOutEverything_breaks = 70
//var loadOutEverything_time = 0
var loadOutEverything_timeCount = 1 

function loadEverythingIn(){
    $('#landingFooterObi #wrapper_landingFooterObi_mobile').removeClass('animate__animated animate__backOutDown')
    $('#landingFooterObi span a,#landingFooterObi span').fadeIn()
    $('#landingFooterObi').fadeIn()
    $('#paymentOptions li').removeClass('animate__animated animate__backOutDown')
    $('#header').removeClass('animate__animated animate__backOutUp')
    $('#landingScrollDownButton').removeClass('animate__animated animate__backOutUp')
    $('#landingScrollDownButton svg').fadeIn()
    $('#navAndMain').removeClass('animate__animated animate__backOutDown')
}

function loadOutEverythingtoUrl(url,ifNewWindow){
    
    setTimeout(function(){ 
        loadOutEverything_timeCount++
        //load out landing menu buttons
        $('#landingFooterObi #wrapper_landingFooterObi_mobile').addClass('animate__animated animate__backOutDown')// animate__delay-2s
        setTimeout(function(){  
            loadOutEverything_timeCount++
            $('#landingFooterObi span a,#landingFooterObi span').fadeOut()
            setTimeout(function(){  
                loadOutEverything_timeCount++
                $('#landingFooterObi').fadeOut()//.addClass('animate__animated animate__backOutDown')//div
                setTimeout(function(){  
                    loadOutEverything_timeCount++
                    $('#paymentOptions li').addClass('animate__animated animate__backOutDown')
                    setTimeout(function(){  
                        loadOutEverything_timeCount++
                        $('#header').addClass('animate__animated animate__backOutUp')
                        $('#landingScrollDownButton').addClass('animate__animated animate__backOutUp')
                        $('#landingScrollDownButton svg').fadeOut()
                        $('#navAndMain').addClass('animate__animated animate__backOutDown')
                        setTimeout(function(){
                            loadOutEverything_timeCount++
                            if(url&&ifNewWindow==true){
                                window.open(url, '_blank')
                                setTimeout(function(){
                                    loadEverythingIn()
                                },2000)
                            }else if(url){
                                window.open(url)
                            }
                            
                        }, loadOutEverything_breaks*loadOutEverything_timeCount);
                    }, loadOutEverything_breaks*loadOutEverything_timeCount);
                }, loadOutEverything_breaks*loadOutEverything_timeCount);
            }, loadOutEverything_breaks*loadOutEverything_timeCount);
        }, loadOutEverything_breaks*loadOutEverything_timeCount);
    }, loadOutEverything_breaks*loadOutEverything_timeCount);
   

}/////////////////////////////////////////
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
//////////////
*/////////////////////////////////////////


function shrinkDeadSpace(toShrink){

    console.log('[shrinkDeadSpace] toShrink:',toShrink)
   
    if(toShrink==true){
    console.log('[shrinkDeadSpace] shrinking...')
        $('#landing').addClass('shrunk')//98vh
        $('.shrinkCompen').addClass('unshrunk')

        //$('.shrinkCompen.shrinkCompen_top.unshrunk').css('height','')

        $('#landingScrollDownButton').fadeOut()
        if(stateSettings.status.iFrameLoaded==true)$('#intro').addClass('invoiceOpen')
        
        //$('#navAndMain').removeClass('whiteBG')
        $('#pdfViewer').addClass('invoiceOpen')
        $('#navAndMain').addClass('invoiceOpen')

        /*ANIMATE BACKTO TOP ARROWS */
        console.log('[shrinkDeadSpace][InvoiceUI]','setTimeout')
        setTimeout(function(){
           //stateSettings.status.deadSpace = 'shrunk' 
            var uiSettings = {
                deadSpace_state_now:stateSettings.status.deadSpace,
                isMobile:stateSettings.status.isMobile
            }
        console.log('[shrinkDeadSpace][InvoiceUI] uiSettings',uiSettings) 
            if(uiSettings.deadSpace_state_now=='shrunk'&&uiSettings.isMobile==true){
            console.log('[shrinkDeadSpace][InvoiceUI] Invoice Mobile UI loading...') 
            
                $('.mobileNavButton').addClass('show')
                animateCSS('.mobileNavButton', 'slideInLeft').then((message) => {
                    // Do something after the animation
                    console.log('[shrinkDeadSpace][InvoiceUI] Invoice Mobile Nav Bar loaded') //$('.mobileNavButton').show()
                })
            }else if(uiSettings.deadSpace_state_now=='shrunk'){
            console.log('[shrinkDeadSpace][InvoiceUI] Invoice Desktop UI loading...') 
                //$('.arrowUp').addClass('invoiceOpen')
                $('.arrowUp').fadeIn(600)
                //animateCSS('.arrowUp', 'fadeInUp').then((message) => {
                    // Do something after the animation
                  //  console.log('[shrinkDeadSpace][InvoiceUI] Invoice Desktop arrowUp loaded')////$('.mobileNavButton').show()
                //})
            }else{
                console.log('[shrinkDeadSpace][InvoiceUI] !No UI loaded',uiSettings)
            }

        }, 1000);
        /////////////////////////////////
        $('#landing_section').fadeOut()
        $('#header').fadeOut()
        
        //deadSpaceShrunk = true
        $('#duotone').addClass('shrunkMode')
        console.log('[shrinkDeadSpace] #duotone addClass','shrunkMode')
        //$('#button_stripe').removeClass('hidden-load')
        //$('.arrowUp').fadOut()
        //$('.arrowUp').removeClass('invoiceOpen')
       
        //* ANIMATE AND LOAD IFRAME*//
        //?? //deadSpaceShrunk==true
        animateCSS('iframe', 'slideInUp').then((message) => {
            /* scroll to bottom right after swipe up */
           // var scrollingElement = (document.scrollingElement);
            //scrollingElement.scrollTop = scrollingElement.scrollHeight;
            scrollTo(document.scrollingElement.scrollHeight,100)
            console.log('[shrinkDeadSpace][iFrame][animation] Slid Up')
            // Do something after the animation
            console.log('[shrinkDeadSpace][iFrame] check if loaded:',stateSettings.status.iFrameLoaded)
            if(stateSettings.status.iFrameLoaded==false){
                var $iframe = $("#pdfIframe");
                var iFrameSrc = $iframe.data("src")
            console.log('[shrinkDeadSpace][iFrame][load] not loaded!, loading...',iFrameSrc)
                $iframe.attr("src",iFrameSrc);
                stateSettings.status.iFrameLoaded = true;
                    var iframe = document.getElementById('pdfIframe')
                    if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
                        iframe.onreadystatechange = function(){
                        if (iframe.readyState == "complete"){
                           //$('#binderCover').remove()
                           $('#pdfIframe').removeClass('unloaded')
                           $('#iFrameLoadSpinner').addClass('shrinkOut')
                           $('#intro').addClass('invoiceOpen')
            
                            setTimeout(function() {
                                //$('.invoiceName').removeClass('hidden-load')
                                $('#binderCover').remove()
                            }, 400)
                           
                        }
                        };
                    } else {
                        iframe.onload = function(){
                           // $('#binderCover').remove()
                           $('#pdfIframe').removeClass('unloaded')
                           $('#iFrameLoadSpinner').addClass('shrinkOut')
                           $('#intro').addClass('invoiceOpen')
                           setTimeout(function() {
                                //$('.invoiceName').removeClass('hidden-load')
                                $('#binderCover').remove()
                            }, 400)
                        };
                    }
                console.log('[shrinkDeadSpace][iFrame][load] iFrame Loaded for first time:',true)
            }else{
                console.log('[shrinkDeadSpace][iFrame][load] iFrame already loaded')
            }
           
        })	
        deadSpaceShrunk==true
        stateSettings.status.deadSpace = 'shrunk'
        console.log('[!GLOBAL SET!][shrinkDeadSpace]','deadSpaceShrunk:',deadSpaceShrunk)
        //console.log('[shrinkDeadSpace] deadSpaceShrunk shrunk',scroll,' >',vhInPixels_expandAt);
        console.log('[shrinkDeadSpace]','FINISHED','SHRUNK',{stateSettings:stateSettings})
       

    return true
    }else{
    console.log('[shrinkDeadSpace] UN-Shrinking')
        $('#landing').removeClass('shrunk')//98vh
        $('.shrinkCompen').removeClass('unshrunk')
        //$('#navAndMain').addClass('whiteBG')
        $('#landingScrollDownButton').fadeIn()
        $('#pdfViewer').removeClass('invoiceOpen')
        $('#intro').removeClass('invoiceOpen')
        $('#navAndMain').removeClass('invoiceOpen')
       
        $('#landing_section').fadeIn()
        $('#header').fadeIn()
        
        
        /* LOAD OUT UI */        
        if(isMobile){
            $('.mobileNavButton').removeClass('show')
            /*animateCSS('.mobileNavButton', 'slideOutLeft').then((message) => {
                //$('.mobileNavButton').removeClass('show')
                // Do something after the animation
                console.log('mobileNav faded out')
              //  $('.mobileNavButton').hide()
            })*/
        }else{
            //$('.arrowUp').removeClass('invoiceOpen')
           
        }
        
        $('#duotone').removeClass('shrunkMode')
        $('.arrowUp').fadeOut(600)
        animateCSS('iframe', 'slideOutDown').then((message) => {
            // Do something after the animation
            console.log('iframe backOutDown')
            if(isMobile==true&&deadSpaceShrunk==false)window.scrollTo(0,1)
        })	
        deadSpaceShrunk==false
        stateSettings.status.deadSpace = 'full'
        console.log('[!GLOBAL SET!][shrinkDeadSpace]','deadSpaceShrunk:',deadSpaceShrunk)	
       // console.log('[shrinkDeadSpace] deadSpaceShrunk deshrunk',scroll,' <',vhInPixels_shrinkAt);
        console.log('[shrinkDeadSpace]','FINISHED','UN-SHRUNK',{stateSettings:stateSettings})
    return false
    }
    
}

/////////////////////////////////////////
//////////////////////////////////////////











