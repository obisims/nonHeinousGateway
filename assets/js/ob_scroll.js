
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
     
            //if overscroll then
           // $("#invoiceHeader, .progressBar_wrapper .progressBar, #headerOrnament .replace_clientName").on('click touchstart',function(){
               /* var elem = '#dueTimer'
                $(elem).attr('slider-lock',true)
                slider_DownElemToggle(elem,false)
                setTimeout(function() {
                    var elem = '#dueTimer'
                    $(elem).attr('slider-lock',false)
                    slider_DownElemToggle(elem,true)
                },2000)
                */
            //});
        
        //stateSettings.status.deadSpace = 'full'
       // console.log('[!GLOBAL SET!][scroll]','deadSpaceShrunk:',deadSpaceShrunk)
    }

});






