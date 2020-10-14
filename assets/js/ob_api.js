function ob_api(inv){
    //if(inv.split('-')[1]=="THX"){
    //}
    console.log('[ob_api]','inv',inv)
    // v9    // ob_api / obApi_invoices 
    //(urlParams.inv).split('-')[1]
    var invNum = Number(inv)
    console.log('[ob_api]','invNum',invNum)
    
    console.log('[ob_api]','is NaN',Number.isNaN(invNum))
    if(inv&&Number.isNaN(invNum)){
        var newNum = inv.split('-')[1]
        console.log('[ob_api]','newNum',newNum)
        invNum = newNum//inv.split('-')[1]
    }//handle raw num and prefix
    console.log('[ob_api]','invNum',invNum)
    
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)obi_api_apiUrl = obi_api_apiUrl+'?'+'inv='+invNum//get just this inv
    /* GET ALL INVOICES UNLESS INV SPECIFIED */
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)
        obiAPI_params = data[invNum]
        if(!data[invNum]){
             console.log('[ob_api]','no data[invNum] data')
           // updateGlobalParams(obiAPI_params)
           loadState_errorLanding()
        }else{
            console.log('[ob_api]','defined data[invNum] data')
            updateGlobalParams(obiAPI_params)
        }

    })
   
}





function refreshVariables(){

    console.log('[refreshVariables] refreshing...',obiAPI_params)
   
    $('#surcharge_stripe').html(invoiceSettings.checkouts['Stripe'].surcharge)
$('#surcharge_directDebit').html(invoiceSettings.checkouts['Direct Debit'].surcharge)
$('#surcharge_coinbase').html(invoiceSettings.checkouts['Coinbase'].surcharge)

var progressBar = progressTheProgressBar('.progressBar span.progressBar_progress',1900,0)
console.log('[progressBar]',{'progressBar':progressBar})


    if(obiAPI_params['DRIVE ID']){
        //set drive iframe in global for push into data-src
        invoiceSettings.invoice.DRIVE_ID = obiAPI_params['DRIVE ID']||urlParams.drive_id
        invoiceSettings.invoice.DRIVE_IFRAME_URL = 'https://docs.google.com/viewer?srcid='+obiAPI_params['DRIVE ID']+'&pid=explorer&efh=true&a=v&chrome=false&embedded=true&rm=minimal&widget=false'
        $('#pdfIframe').data('src', invoiceSettings.invoice.DRIVE_IFRAME_URL);
    }
    if(obiAPI_params['INV NAME']){
        $('.replace_invoiceNum').text(obiAPI_params['INV NAME'])//invoiceSettings.invoice.NUM
    }else{
        $('.replace_invoiceNum').text('ERR-1138')
    }
if(obiAPI_params['CLIENT']){
    $('.replace_clientName').text(obiAPI_params['CLIENT'])//invoiceSettings.invoice.CLIENT_NAME
    $('#mobileInvoiceHeader').attr('data-before', obiAPI_params['CLIENT']);    
}else{
    $('.replace_clientName').text("What are ya?")//Doppelgänger Doppelgänger Dudes Pty Ltd
}
    //CONDITIONAL VARIABLES
    if(!obiAPI_params['POLIPAY ID']||obiAPI_params['POLIPAY ID']==''){
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



    if(obiAPI_params['DUE']){
        var due_date = moment(obiAPI_params['DUE'],'DD-MM-YYYY')//DD-MM-YY
        invoiceSettings.date.DUE = due_date
        var due_issued = moment(obiAPI_params['ISSUED'],'DD-MM-YYYY')//DD-MM-YY
        invoiceSettings.date.ISSUED = due_issued
        var timer = dueTimer(due_date)
        $('#dueTimer').text(timer) //urlParams.date_due //invoiceSettings.invoice.CLIENT_NAME
        //$('#mobileInvoiceHeader').attr('data-before', urlParams.date_due);
        
        /* IF DUE DATE IS PRESENT */
    
    }else{
        $('#dueTimer').text("No due date")//Doppelgänger Doppelgänger Dudes Pty Ltd
        //$('#dueTimer').remove()
    }
    

    if(obiAPI_params['TOTAL']){
        $('.replace_invoiceTotal').text(obiAPI_params['TOTAL'])//invoiceSettings.invoice.TOTAL
    }else{
        $('.replace_invoiceTotal').text("0.00")
    }






/* VARIABLE DEFINED BUTTONS AND SHIT */


/////////////////////
    /* MOBILE UI BUTTONS */
    
    $('.mobile_UI_Share').click(function(){
        var downloadURL = 'https://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf'
        /* //window.open('http://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf', 'Download');  
        this one opens the doc in google docs on android
        opens a new page with [df]
        */
       $('meta[property=og\\:image]').attr('content', 'https://source.unsplash.com/1200x630/?money&obVersion='+Math.floor(Math.random() * 1000).toFixed(0)+'');
   var fbxhr = new XMLHttpRequest ();
fbxhr.open ("POST", "https://graph.facebook.com", true);
fbxhr.setRequestHeader ("Content-type", "application / x-www-form-urlencoded");
fbxhr.send ("id = "+"https:"+"&scrape=true");
        //window.location.href = downloadURL
        //window.open(downloadURL, 'Download')
        var googlePdfViewerUrl = 'https://drive.google.com/file/d/'+invoiceSettings.invoice.DRIVE_ID+'/view'
        //http://docs.google.com/document/d/16bWRp0-Sraw9hiaFilyanhpnaVd43UQDcGZVUW9BaMI/export?format=pdf
        var payUrl = 'https://pay.obisims.com/'+invoiceSettings.invoice.NUM
       // var pdfUrl = 'https://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf'
       if(navigator.share){
           /// if share available then share pay.obi url
            navigator.share({
                title: invoiceSettings.invoice.NUM,
                url: payUrl,
               // text:invoiceSettings.invoice.NUM
            })
            .then(() => console.log('Share was successful.'))
            .catch(function(error){
            console.log('Sharing failed', error)
                ///THIS IS HAPPENING ON IOS AFTER ANY SHARE

            /// if error show pdfviewer url in new window (don't think this one actually runs)
           // if(error)window.open(googlePdfViewerUrl, '_blank');//downloadURL
            //alert('no share available')
            });
       }else{
           /// if no share then
           
           window.open(googlePdfViewerUrl, '_blank');//downloadURL
           
       }
       //postSlackNotification_gateway_share()
       postSlackNotification_gateway_share(""+stateSettings.status.isMobile+"",ipInfo)
       /*if (navigator.canShare) {
         navigator.share({
           //files: filesArray,
           url:payUrl,
         //  title: invoiceSettings.invoice.NUM,
           //text: 'obi sims invoice gateway.',
         })
         .then(() => console.log('Share was successful.'))
         .catch(function(error){
             console.log('Sharing failed', error)
             if(error)window.open(downloadURL, '_blank');
             
            });
       } else {
         window.open(downloadURL, '_blank');
         //alert(`Your system doesn't support sharing files.`);
       }
       */
    })
    $('.mobile_UI_Download').click(function(){
        var downloadURL = 'https://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf'
        /* //window.open('http://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf', 'Download');  
        this one opens the doc in google docs on android
        opens a new page with [df]
        */
        //window.location.href = downloadURL
        //window.open(downloadURL, 'Download')
        var googlePdfViewerUrl = 'https://drive.google.com/file/d/'+invoiceSettings.invoice.DRIVE_ID+'/view'
        //http://docs.google.com/document/d/16bWRp0-Sraw9hiaFilyanhpnaVd43UQDcGZVUW9BaMI/export?format=pdf
        var payUrl = 'https://pay.obisims.com/'+invoiceSettings.invoice.NUM
       // var pdfUrl = 'https://docs.google.com/document/d/'+invoiceSettings.invoice.DRIVE_ID+'/export?format=pdf'
       
       ///if fake mobile then download .pdf file
       //if ios then open pdf in new tab, hit the ios share button to do stuff with file // 
       //android (if logged into gsuite/have gdocs) open gDocs
       window.open(downloadURL, '_blank')

       postSlackNotification_gateway_download(""+stateSettings.status.isMobile+"",ipInfo)
       /*if(navigator.share){
            navigator.share({title: invoiceSettings.invoice.NUM, file: downloadURL})
            .then(() => console.log('Share was successful.'))
            .catch(function(error){
            console.log('Sharing failed', error)
            if(error)window.open(downloadURL, '_blank');//downloadURL
            
            });
       }else{
           //if fake desktop or old mobile?
           window.open(downloadURL, '_blank');//downloadURL
           
       }*/
       
        
    })
    









 //   if(urlParams){
        if(!urlParams.stripe_checkout){
            postSlackNotification_gateway_opened(""+stateSettings.status.isMobile+"",ipInfo)
        }
 //   }

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

/// END OF THE THING

}

/* API GLOBALS */
var global_slackPostSettings = global_slackPostSettings || new Object(); 
var paySettings = paySettings || new Object();
var stripe = stripe || new Object();
var invoiceSettings = invoiceSettings||new Object(); // SHOULD UPDATE HERE ASWELL //
function updateGlobalParams(obiAPI_params){
     /* UPDATE urlPram & invoiceSettings */
    console.log('[updateGlobalParams] updating',obiAPI_params,urlParams)
    if(obiAPI_params['INV PREFIX']&&obiAPI_params['INV NUM'])obiAPI_params['INV NAME'] = obiAPI_params['INV PREFIX']+'-'+obiAPI_params['INV NUM']
    if(obiAPI_params['INV NUM'])urlParams.inv=obiAPI_params['INV NAME']
    if(obiAPI_params['TOTAL'])urlParams.inv_total=obiAPI_params['TOTAL']
    if(obiAPI_params['CLIENT'])urlParams.client_name=obiAPI_params['CLIENT']
    if(obiAPI_params['PROJECT'])urlParams.project_name=obiAPI_params['PROJECT']
    if(obiAPI_params['STRIPE PRICE'])urlParams.stripe_price=obiAPI_params['STRIPE PRICE']
    if(obiAPI_params['STRIPE CHECKOUT ID'])urlParams.stripe_price_id=obiAPI_params['STRIPE CHECKOUT ID']
    if(obiAPI_params['DRIVE ID'])urlParams.drive_id=obiAPI_params['DRIVE ID']
    if(obiAPI_params['ISSUED'])urlParams.date_issued=moment(obiAPI_params['ISSUED'],'DD-MM-YYYY').format('DDMMYYY')
    if(obiAPI_params['DUE'])urlParams.date_due=moment(obiAPI_params['DUE'],'DD-MM-YYYY').format('DDMMYYY')
    console.log('[updateGlobalParams] UPDATED',obiAPI_params,urlParams)

   
    if(obiAPI_params['STATUS']){
        invoiceSettings.payStatus.STATUS = obiAPI_params['STATUS']
        invoiceSettings.payStatus={
            STATUS:obiAPI_params['STATUS']||'UNPAID',
            METHOD:obiAPI_params['PAID METHOD'],
            AMOUNT:obiAPI_params['TOTAL'],
            TIME:obiAPI_params['PAID UPDATED'],
            RECEIPT:obiAPI_params['PAID RECEIPT']
        }
    }
    invoiceSettings.invoice.NUM = obiAPI_params['INV NAME']
    invoiceSettings.invoice.TOTAL = obiAPI_params['TOTAL']
    invoiceSettings.invoice.CLIENT_NAME = obiAPI_params['CLIENT']
    invoiceSettings.invoice.PROJECT_NAME = obiAPI_params['PROJECT']
    invoiceSettings.invoice.DRIVE_ID = obiAPI_params['DRIVE ID']
    //this is why>//
    invoiceSettings.invoice.DRIVE_IFRAME_URL = 'https://docs.google.com/viewer?srcid='+obiAPI_params['DRIVE ID']+'&pid=explorer&efh=true&a=v&chrome=false&embedded=true&rm=minimal&widget=false'
    $('#pdfIframe').data('src', invoiceSettings.invoice.DRIVE_IFRAME_URL);

    invoiceSettings.date = {
        ISSUED:moment(obiAPI_params['ISSUED'],'DD-MM-YYYY'),
        DUE:moment(obiAPI_params['DUE'],'DD-MM-YYYY'),
        PROGRESS:0,
    }

    invoiceSettings.checkouts={
        'Stripe':{
            price_id:obiAPI_params['STRIPE CHECKOUT ID'],
            price:obiAPI_params['STRIPE PRICE']||'',
            //  api:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            PUBLISHABLE_KEY:'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB',
            surcharge:'1.75% + $0.30 surch'
        },
        'Coinbase':{
            price_id:'PRICE_ID needs to be grabbed',
            price:obiAPI_params['TOTAL'],
            gateway:'https://commerce.coinbase.com/charges/',
            url:obiAPI_params['CRYPTO CHECKOUT'],
            surcharge:'0% surcharge'
           // url:"https://crypto.obisims.com/"+INVNUM
        },
        'Direct Debit':{
            price_id:uuidv4(),
            price:obiAPI_params['TOTAL']||'',
            id:obiAPI_params['POLIPAY ID']||'',
            api:'https://poliapi.apac.paywithpoli.com/api',
            surcharge:'0% surcharge',
            url:"https://poli.to/"+obiAPI_params['POLIPAY ID'],
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


    /* SLACK GLOBAL UPDATES */
    global_slackPostSettings = {
        message:{
          NOTIFICATION_SUMMARY:invoiceSettings.invoice.NUM+' | '+'VALUE'+' info'
        },
        settings:{
          CHANNEL:"#obisims-invoices",
          USERNAME:'Invoice Gateway',
          AVATAR:':eye:'
        },
        payment:{
          METHOD:obiAPI_params['PAID METHOD']||'',
          AMOUNT:obiAPI_params['TOTAL']||invoiceSettings.invoice.TOTAL||''
        },
        invoice:{
          INV_NUM:obiAPI_params['INV NAME']||obiAPI_params['INV PREFIX']+'-'+obiAPI_params['INV NUM']||invoiceSettings.invoice.NUM,
          CLIENT_NAME:obiAPI_params['CLIENT']||invoiceSettings.invoice.CLIENT_NAME,
          PROJECT_NAME:obiAPI_params['PROJECT']||invoiceSettings.invoice.PROJECT_NAME
        }
      }
    /* PAY GLOBAL UPDATES */
    paySettings = {
        DOMAIN:invoiceSettings.domain,
        stripe:{
            PUBLISHABLE_KEY:invoiceSettings.checkouts['Stripe'].PUBLISHABLE_KEY//||'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB'
        }
    }
    stripe = Stripe(invoiceSettings.checkouts['Stripe'].PUBLISHABLE_KEY);
    refreshVariables()
}



function loadState_errorLanding(){
    console.log('[ob_api][loadState_errorLanding]','loading error state')



    setTimeout(function() {
        const buttonTime = 750
        var buttonIndex = 0
        $('#headerSlideInWrapper').fadeTo( "fast" , 1, function() {
            // Animation complete.
        $('.replace_invoiceNum').text('BI SIMS')//ERR-1138
        //$('.replace_invoiceNum').css('letter-spacing','5px')
        
        $('.replace_clientName').text('Sans-Bogus Digital Invoice')//invoiceSettings.invoice.CLIENT_NAME
        $('#mobileInvoiceHeader').attr('data-before', "Sans-Bogus Digital Invoice");  
       
        //$('.progressBar_wrapper').html('<span><input style="width:100%" type="number"></input></span>')
        $('.progressBar_wrapper').fadeOut() //.fadeIn()
        $('#dueTimer').fadeOut()
        $( "#landing_section" ).prepend( `<form action="javascript:console.log( '[form] action!' );" id="enterInvNum" method="post" action="#">
        <section class="main errorFormWrapper">
        <div class="row gtr-uniform">
        <div class="col-2 col-12-xsmall"> </div>
            <!--<div class="col-4 col-12-xsmall">
                <input type="text" name="callInvoice-name" id="callInvoice-name" value="THX" style="text-align:right;background-color: rgba(255, 255, 255, 0.015);border-color: rgba(255, 255, 255, 0.25);" placeholder="THX">
            </div>-->
            <div id="callInvoice-number-wrapper" class="col-8 col-12-xsmall">
            <label for="callInvoice-number">enter invoice num</label><input type="text" name="callInvoice-number" id="callInvoice-number" value="THX-" placeholder="1138">
            </div>
            <div class="col-12">
													<ul class="actions stacked">
														<li><input type="submit" value="Open Invoice" class="primary"></li>
                                                        <!--<li><input type="reset" value="Reset"></li>-->
                                                        
                                                    </ul>
                                                    
												</div>
            <!--<div class="col-12">
                <select name="callInvoice-category" id="callInvoice-category">
                    <option value="">- Category -</option>
                    <option value="1">Manufacturing</option>
                    <option value="1">Shipping</option>
                    <option value="1">Administration</option>
                    <option value="1">Human Resources</option>
                </select>
            </div>-->
         <div class="col-2 col-12-xsmall"> </div>
        </div>
        </section>
    </form>` );
    $("#enterInvNum").submit(function(data){
         // get all the inputs into an array.
            var $inputs = $('#enterInvNum :input');

            // not sure if you wanted this, but I thought I'd add it.
            // get an associative array of just the values.
            var values = {};
            $inputs.each(function() {
                values[this.name] = $(this).val();
            });
            //console.log('form data',values)
            var invoiceInput = values['callInvoice-number']
            console.log('form data',invoiceInput)
           // alert('submitted')
            ob_api(invoiceInput)
            $('.progressBar_wrapper').fadeIn() //.fadeIn()
            $('#dueTimer').fadeIn()
            $('#enterInvNum').remove()
      });
            setTimeout(function() {
                /* Commented out for error state
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
                    
                })*/
            /* commented out for error state
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
                */
                setTimeout(function() { //for footer
                    
                    //$('#dueTimer').fadeIn()
                    /*commented out for error state
                    var $dueTimer = $('#dueTimer')
                        $dueTimer.removeClass('initialHide')
                        $dueTimer.data('slider-lock',true)
                        $dueTimer.slideDown()
                        $dueTimer.data('slid','down')
                        setTimeout(function() { 
                            $dueTimer.slideUp()
                            $dueTimer.data('slider-lock',false)
                        },6000)
                    */
                    $('#landingFooterObi').fadeIn( 1500, function() {
                        // Animation complete
                        
                        setTimeout(function() {
                            //$('#navAndMain').slideDown(1900)
                            //$('#landing').removeClass('pushInvoiceDown')
                            //slide-up
                        
    
                            
                            $('#landingScrollDownButton').fadeIn(1700)
                            //$('#landingFooterObi_mobile').fadeIn(1900)
                            
                        },1*buttonTime) 
                    });
                    
                },(buttonIndex+2)*buttonTime) 
            },buttonTime)
        });
        //$('#headerOrnament').slideDown(1000)
        //$('#invoiceHeader').slideDown(1000)


    },500)

}





