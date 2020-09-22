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
function new__shrinkDeadSpace(toShrink){
    if(toShrink==true){
        $('#landing').addClass('shrunk')//98vh
        $('.shrinkCompen').addClass('unshrunk')
        var $intro = $('#intro')
        $intro.addClass('invoiceOpen')
        //$('#navAndMain').removeClass('whiteBG')
        $('#pdfViewer').addClass('invoiceOpen')

        /*ANIMATE BACKTO TOP ARROWS */
        setTimeout(function(){
            console.log('[fadsingArrowIn] deadSpaceShrunk',deadSpaceShrunk) 
            if(deadSpaceShrunk==true&&isMobile){
                $('.mobileNavButton').addClass('show')
                animateCSS('.mobileNavButton', 'fadeInLeft').then((message) => {
                    // Do something after the animation
                    console.log('mobile Navbar faded in')
                    //$('.mobileNavButton').show()
                })
            }else if(deadSpaceShrunk==true){
                $('.arrowUp').addClass('invoiceOpen')
                animateCSS('.arrowUp', 'fadeInUp').then((message) => {
                    // Do something after the animation
                    console.log('desktop arrowUp faded in')
                    //$('.mobileNavButton').show()
                })
            }
        }, 5000);

        //deadSpaceShrunk = true
        $('#duotone').addClass('shrunkMode')
        //$('#button_stripe').removeClass('hidden-load')
        animateCSS('iframe', 'slideInUp').then((message) => {
            // Do something after the animation
            console.log('iframe slideInUp')
        
        })		
        
        console.log('[shrinkDeadSpace] deadSpaceShrunk shrunk',scroll,' >',vhInPixels_expandAt);
    return true
    }else{
        $('#landing').removeClass('shrunk')//98vh
        $('.shrinkCompen').removeClass('unshrunk')
        //$('#navAndMain').addClass('whiteBG')
        
        $('#pdfViewer').removeClass('invoiceOpen')
        $('#intro').removeClass('invoiceOpen')

        
        if(isMobile){
            animateCSS('.mobileNavButton', 'fadeOutLeft').then((message) => {
                // Do something after the animation
                console.log('mobileNav faded out')
                $('.mobileNavButton').removeClass('show')
            })
        }else{
            $('.arrowUp').removeClass('invoiceOpen')
        }
        
         

        //sdeadSpaceShrunk = false
        $('#duotone').removeClass('shrunkMode')
        animateCSS('iframe', 'slideOutDown','fasts').then((message) => {
            // Do something after the animation
            console.log('iframe backOutDown')
            if(isMobile==true&&deadSpaceShrunk==false)window.scrollTo(0,1)
        })		
        console.log('[shrinkDeadSpace] deadSpaceShrunk deshrunk',scroll,' <',vhInPixels_shrinkAt);
    return false
    }
}/////////////////////////////////////////
//////////////////////////////////////////

