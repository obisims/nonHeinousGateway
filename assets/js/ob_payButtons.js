//const { geteuid } = require("process");



// Handle any errors from Checkout
var handleResult = function(result) {
    console.log('[stripe] handleResult',result);
   /* if (result.error) {
        console.log('[stripe] checkout error',result);
        alert('[stripe] checkout error',result);
       // var displayError = document.getElementById('error-message');
       // displayError.textContent = result.error.message;
    }*/
};




/*
id="pay_Direct"
class="button payButton"
data-payment-mode="directDeposit" 
data-checkout="payment"
*/
$(document).ready(function() {
   

     $('.payButton').click(function(){
         handleCheckout(this)
     })
    // $('#confirm_directDebit').click(function(){
      //  handleCheckout(this)
    //})
/*
    if(urlParams['stripe_checkout']=='paid'){
        postSlackNotification_purchase_complete('Stripe')
    }else if(urlParams['stripe_checkout']=='canceled'){
        postSlackNotification_purchase_cancelled('Stripe')
    }
*/
/* REAL END! check for callback */
var urlParams = getParams(window.location.href);//encodeURI when creating

//* check for stripe callback */
console.log('[checking params for callback]',{urlParams:urlParams})
if(urlParams.stripe_checkout){
    if(urlParams.stripe_checkout=='paid'){
        console.log('[checking params for callback] STRIPE','PAID')
        handleCheckout(null,'Stripe')
        
    }else if(urlParams.stripe_checkout=='canceled'){
        console.log('[checking params for callback] STRIPE','CANCELED')
    /// stripe cancelled
    ///am i already checking this somewhere?
    //i was
   postSlackNotification_purchase_cancelled('Stripe')
    }
   
}
//* check for coinbase callback */
console.log('[checking params for callback]',{urlParams:urlParams})
if(urlParams.coinbase_checkout){
    if(urlParams.coinbase_checkout=='paid'){
        console.log('[checking params for callback] COINBASE','PAID')
        handleCheckout(null,'Coinbase')
        
    }else if(urlParams.coinbase_checkout=='canceled'){
        console.log('[checking params for callback] COINBASE','CANCELED')
    /// stripe cancelled
    ///am i already checking this somewhere?
    //i was
   postSlackNotification_purchase_cancelled('Coinbase')
    }
    
}

/*


      // pay commands 
    var directDebitOpened = false
    var directDebitOpened_cancelled = false
    $("#pay_Direct.payButton").click(function(){
        
        $('#header').toggleClass('directDebitShrink')
        $("#pay_instructions").slideToggle( "slow", function() {
            // Animation complete.
          });
          $("#pay_Crypto.payButton").slideToggle();
          $("#pay_Stripe.payButton").slideToggle();
         $('#paymentOptions').toggleClass('hidePadding');
         //slack_postMSG()
         
         if(directDebitOpened==false){
           // postSlackNotification_purchase_initiated('Direct Debit')
            //slack_openedPayment('THX-1138','Direct Debit')
            //directDebitOpened = true
            //directDebitOpened_transaction = true
         }else if(directDebitOpened_cancelled==false){
            //slack_cancelPayment('THX-1138','Direct Debit','Doppelgänger Dudes Pty Ltd')
          //  postSlackNotification_purchase_cancelled('Direct Debit')
            //directDebitOpened_cancelled = true
        }
         
         if(innerHeight<=500){
            // text fix for tiny phones 
           // $('#header').css('padding-top','15%')
        } else if(innerHeight<=700){
            // text fix for tiny phones 
        }else{
        }
          
    }); 
    $('#confirm_directDebit').click(function(){
        postSlackNotification_purchase_initiated('Direct Debit')
        if (window.confirm("Are you sure you want to confirm you have paid?")) { 
            //slack_confirmPayment('THX-1138',666.666,'Direct Debit','Doppelgänger Dudes Pty Ltd','some project name')
            postSlackNotification_purchase_complete('Direct Debit')
             alert("payment confirmed");
        
          }else{
            //slack_cancelPayment('THX-1138','Direct Debit','Doppelgänger Dudes Pty Ltd')
            postSlackNotification_purchase_cancelled('Direct Debit')
            //directDebitOpened_cancelled = true
          }
       
    }); 

    
    $("#pay_Crypto.payButton").click(function(){
       // slack_openedPayment('THX-1138','Coinbase')
        postSlackNotification_purchase_initiated('Coinbase')
        alert("pay crypto");
        //slack_confirmPayment('THX-1138',666.666,'Crypto','Doppelgänger Dudes Pty Ltd')
    }); 
    $("#pay_Stripe.payButton").click(function(){
        //slack_openedPayment('THX-1138','Stripe')
        postSlackNotification_purchase_initiated('Stripe')
        alert("pay credit card");
        //slack_confirmPayment('THX-1138',666.666,'Credit Card','Doppelgänger Dudes Pty Ltd')
    }); 



*/




 })


 function showApproved_state(tempInvoiceSettings){
     //if(!tempInvoiceSettings)
     invoiceSettings = tempInvoiceSettings||invoiceSettings
    $('#confirm_directDebit').remove()
    $('.pay_instructions_right').html(
        '<b>Payment Method</b> <span>'+invoiceSettings.payStatus.METHOD+'</span><br>'+
        '<b>Project</b> <span>'+invoiceSettings.invoice.PROJECT_NAME+'</span><br>'+
        '<b>Amount</b> <span>$'+invoiceSettings.payStatus.AMOUNT+'</span><br>'
    )

    $('#pay_instructions_footer').addClass('receipt')
    $('#pay_instructions_footer').html(
        '<b>Receipt Num</b> <span id="receiptNum">'+tempInvoiceSettings.payStatus.RECEIPT+'</span><br>'+//uuidv4()
        '<b>Confirmed at</b> <span>'+new Date(invoiceSettings.payStatus.TIME).toLocaleTimeString('en-AU')+'</span>'
       // '<b>Confirmed at</b> <span>'+confirmDate.toLocaleTimeString('en-AU')+'</span>'
    )

    $('#payInstructions').html(
        '<b>Payment Confirmed<br></b>'+
        '<span>Thank you very much,<br>a notification has been sent to obi.</span>'
    )
    //$('#pay_Direct').remove()
    $('#paymentOptions').remove()
    
 }

 function handleCheckout(thisButton,override){
  //  var thisButton = button
  
  
  


  var buttonProps = new Object()
  if(override){
      console.log('[handleCheckout] override',override)
    buttonProps.id = invoiceSettings.checkouts[override].price_id
    buttonProps.paymentMode = override
    buttonProps.checkout = 'confirm'
  }else{
    console.log('[handleCheckout] thisButton',thisButton)
    console.log('[$payButton click] click this',thisButton)
    // var checkoutMode = $thisButton.dataset.checkoutMode
    // var paymentMode = $thisButton.dataset.paymentMode
     //var id = $thisButton.id
     //var $thisButton = $(thisButton)
     console.log('[$payButton click] $thisButton',thisButton)
    
    buttonProps.id = thisButton.id
    buttonProps.paymentMode = thisButton.dataset.paymentMode
    buttonProps.checkout = thisButton.dataset.checkout
    console.log('[$payButton click] buttonProps',buttonProps)
  }
    
    handleCheckoutButtons(buttonProps,override)
}

 function handleCheckoutButtons(thisButton,override) {
    /*thisButton  {
        id: $thisButton.id,
        paymentMode: $thisButton.dataset.paymentMode,
        checkout: $thisButton.dataset.checkoutMode
    }*/
    var paymentMethod = override||thisButton.paymentMode
    console.log('[handleCheckoutButtons] buttonData',thisButton.checkout,thisButton)
    //which checkout stage?
    if(thisButton.checkout=='confirm'||override){
        postSlackNotification_purchase_initiated(paymentMethod)
        switch(paymentMethod) {
            case 'Direct Debit':
                // stripe confirmation through callback // toggleDepositInstructions()
                console.log('[button clicked] invoiceSettings',invoiceSettings)
                if (confirm("Have you already processed your payment for $"+urlParams.inv_total+" via "+paymentMethod+"?")) { 
                    var confirmDate = new Date()
                  //  console.log('[button clicked] invoiceSettings',invoiceSettings)
                    invoiceSettings.payStatus = {
                        STATUS:'PAID',
                        METHOD:paymentMethod,
                        AMOUNT:new Number(invoiceSettings.invoice.TOTAL).toFixed(2),
                        TIME:confirmDate,
                        RECEIPT: uuidv4() //invoiceSettings.checkouts[paymentMethod].price_id
                    }
                    
                    postSlackNotification_purchase_complete(paymentMethod) //  alert("Payment confirmed");
                    showApproved_state(invoiceSettings)
                }else{
                    postSlackNotification_purchase_cancelled(paymentMethod) //directDebitOpened_cancelled = true
                }
                break;
            case 'Stripe':
                // stripe confirmation through callback // toggleDepositInstructions()
                var confirmDate = new Date()
                   console.log('[button clicked] invoiceSettings',invoiceSettings)
                    invoiceSettings.payStatus = {
                        STATUS:'PAID',
                        METHOD:'Stripe',
                        AMOUNT:new Number(urlParams.stripe_price).toFixed(2),
                        TIME:confirmDate,
                        RECEIPT: uuidv4() //invoiceSettings.checkouts['Stripe'].price_id
                    }
                    //if(urlParams.stripe_checkout=='paid'){
                        //stripe_checkout='paid' 
                    //}
                    postSlackNotification_purchase_complete('Stripe') //  alert("Payment confirmed");
                    showApproved_state(invoiceSettings)
                    
                    toggleDepositInstructions()


                break;
            case 'Coinbase':
                // coinbase confirmation through callback  //  toggleDepositInstructions()
                var confirmDate = new Date()
                  //  console.log('[button clicked] invoiceSettings',invoiceSettings)
                    invoiceSettings.payStatus = {
                        STATUS:'PAID',
                        METHOD:'Coinbase',
                        AMOUNT:new Number(invoiceSettings.invoice.TOTAL).toFixed(2),
                        TIME:confirmDate,
                        RECEIPT: uuidv4()// invoiceSettings.checkouts['Coinbase'].price_id
                    }
                    
                    postSlackNotification_purchase_complete('Coinbase') //  alert("Payment confirmed");
                    showApproved_state(invoiceSettings)
                break;
            //   default:
                // code block
        }
    }else if(thisButton.checkout=='open'){
        switch(thisButton.paymentMode) {
            //what happens if they chose that payment option
            case 'Direct Debit':
                //opens direct debit instructions
                
                if(!urlParams.polipay_id){
                    toggleDepositInstructions()
                }else{
                    //poliPay intergration
                    postSlackNotification_purchase_initiated(thisButton.paymentMode)
                    window.open(invoiceSettings.checkouts['Direct Debit'].url , '_blank');//poliPay_workflow()//window.open();//window.open(invoiceSettings.checkouts['Direct Debit'].url , '_blank');
                }
                break;
            case 'Stripe':
                //opens stripe checkout // toggleDepositInstructions()
                postSlackNotification_purchase_initiated(thisButton.paymentMode)
                 // Make the call to Stripe.js to redirect to the checkout page
                // with the sku or plan ID.
                var items = [{
                    price: invoiceSettings.checkouts['Stripe'].price_id,
                    quantity: 1
                }];


                var paramsToPass = 'inv='+encodeURI(urlParams.inv)+
                '&inv_total='+encodeURI(urlParams.inv_total)+
                '&client_name='+encodeURI(urlParams.client_name)+
                '&project_name='+encodeURI(urlParams.project_name)+
                '&stripe_price='+encodeURI(urlParams.stripe_price)+
                '&stripe_price_id='+encodeURI(urlParams.stripe_price_id)+
                '&drive_id='+encodeURI(urlParams.drive_id)+
                '&date_due='+encodeURI(urlParams.date_due)+
                '&polipay_id='+encodeURI(urlParams.polipay_id)
                
               // console.log('fakeurl',fakeURL)

                stripe.redirectToCheckout({
                    mode: 'payment',
                    lineItems: items,
                    successUrl: invoiceSettings.DOMAIN + /*success.html*/'?stripe_checkout=paid' + '&' + paramsToPass, // window.location.search.substring(1),//session_id={CHECKOUT_SESSION_ID}&
                    cancelUrl: invoiceSettings.DOMAIN + /*canceled.html*/'?stripe_checkout=canceled' + '&' + paramsToPass, //window.location.search.substring(1), // session_id={CHECKOUT_SESSION_ID}
                }).catch(function(rejected) {
                    console.log('[stripe] rejected',rejected);
                }).then(handleResult);

                break;
            case 'Coinbase':
                //opens coinbase checkout toggleDepositInstructions()
                postSlackNotification_purchase_initiated(thisButton.paymentMode)
                //window.location.href = invoiceSettings.checkouts['Coinbase'].url //"https://crypto.obisims.com/" + invoiceSettings.invoice.NUM;
                window.open(invoiceSettings.checkouts['Coinbase'].url , '_blank');
                //https://commerce.coinbase.com/charges/K7MJAEP3
                break;
            //   default:
                // code block
        }
    }

}




var directDebitOpened = false
var directDebitOpened_cancelled = false


var payDirectOriginalHtml;// = $pay_Direct.html()
function toggleDepositInstructions(){
    var $pay_Direct =  $('#pay_Direct')
        if(!payDirectOriginalHtml)payDirectOriginalHtml=$pay_Direct.html()
        $('#header').toggleClass('directDebitShrink')
        //$("#pay_instructions").data
        //$('#pay_instructions img').data('block', 'something');
        //$('#pay_instructions img').attr('src', 'something.jpg');
        //$(this).data('lockHover', true);
        
        $('#landingFooterObi_mobile').slideToggle( "slow", function() { /* Animation complete.*/});
        var buttonLockdown = $pay_Direct.attr('data-lockhover')
        if(buttonLockdown=="false"){
           $pay_Direct.attr('data-lockhover','true')
            $pay_Direct.html('<b>Back</b>')
           $('#paymentOptions li #pay_Direct_footer.buttonPayFooter').slideDown()
        }else{
            if(stateSettings.status.isMobile==true){
                $('#paymentOptions li .buttonPayFooter').hide()
            } else{
                $('#paymentOptions li .buttonPayFooter').slideUp()
            }
           $pay_Direct.html(payDirectOriginalHtml)
          $pay_Direct.attr('data-lockhover','false')
         //  $pay_Direct.attr('data-lockhover','false')
        }
       // $pay_Direct.attr('data-lockhover', buttonLockdown == 'true' ? 'false' : 'true')
        

       $("#pay_instructions").slideToggle( "slow", function() { /* Animation complete.*/});
        var $payInstruction = $("#pay_instructions")
        
        var $payCrypto = $('#pay_Crypto.payButton')
        var $payStripe = $('#pay_Stripe.payButton')
       
        $payCrypto.parent().animate({
            width: "toggle"
        });//slideToggle();
        $payStripe.parent().animate({
            width: "toggle"
        });//slideToggle();


        $('#paymentOptions').toggleClass('hidePadding');
            if(directDebitOpened==false){
               // postSlackNotification_purchase_initiated('Direct Debit')
                //slack_openedPayment('THX-1138','Direct Debit')
                //directDebitOpened = true
                //directDebitOpened_transaction = true
            }else if(directDebitOpened_cancelled==false){
                //slack_cancelPayment('THX-1138','Direct Debit','Doppelgänger Dudes Pty Ltd')
              //  postSlackNotification_purchase_cancelled('Direct Debit')
                //directDebitOpened_cancelled = true
            }            
             if(innerHeight<=500){
                // text fix for tiny phones 
               // $('#header').css('padding-top','15%')
            } else if(innerHeight<=700){
                // text fix for tiny phones 
            }else{
            }
              
      //  }); 
}









































/* PoliPay Intergration */


function poliPay_workflow(settings){
    settings = settings || {
      NUM:invoiceSettings.invoice.NUM,
      CLIENT_NAME:invoiceSettings.invoice.CLIENT_NAME,
      AMOUNT:urlParams.inv_total,//invoiceSettings.payStatus.AMOUNT,
    }
    
    console.log('[poliPay_workflow] initiated',settings)
    var poliPay = poliPay_initiateTransaction(settings)
     /*{
          "Success": true,
          "NavigateURL": "https://txn.apac.paywithpoli.com/?Token=GU9Uwhr3alXaY0z3aGbY8jKTvVllsK0%2f",
          "ErrorCode": 0,
          "ErrorMessage": null,
          "TransactionRefNo": "996182419382"
      }*/
  //  var poliPay_url = poliPay.NavigateURL
  // var poliPay_url_params = poliPay_url.split('.com/?')[1]
  // var poliPay_url_token = poliPay_url_params.split('Token=')[1]
  // var poliPay_success = poliPay.Success
  // var poliPay_TransactionRefNo = poliPay.TransactionRefNo
    
  //  INVOICE_DATA.payment = INVOICE_DATA.payment || new Object()
   // INVOICE_DATA.payment['PoliPay'] = {
   //   id:poliPay_TransactionRefNo,
   //   url:poliPay_url,
   //   data:poliPay
   // }
    
  //  console.log('[poliLink] generated',poliPay_url)
    
    // return poliPay_url
    }




function poliPay_initiateTransaction(settings){
    /*https://obisims.postman.co/build/workspace/My-Workspace~b3ef1536-ac6f-4459-84e8-a50ba37b8207/request/12631611-bf80817d-7daf-4586-b3ba-558627ec0f5e*/
    var auth = settings // || global_payDeets('PoliPay')
    /*https://www.polipayments.com/CreatePOLiLink*/
    var paramsToPass = '&inv='+encodeURI(urlParams.inv)+
                '&inv_total='+encodeURI(urlParams.inv_total)+
                '&client_name='+encodeURI(urlParams.client_name)+
                '&project_name='+encodeURI(urlParams.project_name)+
                '&stripe_price='+encodeURI(urlParams.stripe_price)+
                '&stripe_price_id='+encodeURI(urlParams.stripe_price_id)+
                '&drive_id='+encodeURI(urlParams.drive_id)+
                '&date_due='+encodeURI(urlParams.date_due)+
                '&polipay_id='+encodeURI(urlParams.polipay_id)
                

    var poliPayOptions = 
    {
      "Amount":settings.AMOUNT,
      "CurrencyCode":"AUD",
      "MerchantReference":settings.NUM,
      "MerchantHomepageURL":"https://obisims.com",
      "SuccessURL":"https://invoice.obisims.com/"+settings.NUM+"?response=Success"+paramsToPass,
      "FailureURL":"https://invoice.obisims.com/"+settings.NUM+"?response=Error"+paramsToPass,
      "CancellationURL":"https://invoice.obisims.com/"+settings.NUM+"?response=Cancel"+paramsToPass,
      "NotificationURL":"https://invoice.obisims.com/"
    }
    /*var poliPayOptions = {
      // mandatory
      "LinkType":"0",//0 = Simple 1 = Variable 2 = Discounted
      "Amount":""+INVOICE_DATA.items.TOTAL.toFixed(2)+"",// * "1.2" string dollar decimals
      "RecipientName":""+INVOICE_DATA.client.NAME+"",// * // "false" // The display name of the customer receiving the POLiLink email
      "RecipientEmail":"false",// * // my.customer@customers.com
      "ConfirmationEmail":"true",
      "CurrencyCode":"AUD",
      "MerchantData":""+INVOICE_DATA.NUM+"",//Merchant Reff THX-1234 Client Name
      "MerchantReference":""+INVOICE_DATA.NUM+"",// * //
      "AllowCustomerReference":"false",
      "MultiPayment":"false",
      //"DueDate":moment(INVOICE_DATA.date.ISSUED).format('YYYY-MM-DD'),//2014-05-24
      "AllowPartialPayment":"false",
      //"AllowOverPayment":"true",
      //"Schedule":"",
      "ViaEmail":"false",
      "LinkExpiry":moment(INVOICE_DATA.date.ISSUED).format('YYYY-MM-DD hh:mm:ss[+10]')//"2020-10-24 16:00:00+11",//Must be a date later than today's date. Format is as: “2020-10-24 16:00:00+11”
    }*/
      
     // var payload = poliPayOptions //new Object()
      //if(productOptions)payload.name = productOptions.name
      /*
     var params = {
        method: "POST",
        muteHttpExceptions: true,
        headers: {
          Authorization: "Basic " + auth.apiKey,
          'Content-Type': "application/json",
        },
        payload: JSON.stringify(poliPayOptions) //{name: "My SaaS Platform", type: "service"}
      };
      */
     //var authKey = 
      $.ajax({
            type: 'POST',
            url: invoiceSettings.checkouts['Direct Debit'].api+'/v2/Transaction/Initiate',
            dataType: 'json',
            crossDomain: true,
            //whatever you need
            data:JSON.stringify(poliPayOptions),
            headers: {
                "Authorization": make_base_auth(invoiceSettings.checkouts['Direct Debit'].data['Merchant Code'], invoiceSettings.checkouts['Direct Debit'].data['Authentication Code'])
            },
            success: function (data){
                var responseBody = JSON.parse(data)
                console.log('[poliPay_initiateTransaction] data',responseBody)
                window.open(responseBody.NavigateURL)
            },
            error: function(message,message2){
                console.log("[poliPay_initiateTransaction] data failed",message.getAllResponseHeaders(),message,message2);
            },
        });
 
    
     // var response = UrlFetchApp.fetch(auth.api+'/v2/Transaction/Initiate', params)
     // var responseCode = response.getResponseCode()
      
      
      //var responseBody = JSON.parse(response.getContentText())
      /*{
          "Success": true,
          "NavigateURL": "https://txn.apac.paywithpoli.com/?Token=GU9Uwhr3alXaY0z3aGbY8jKTvVllsK0%2f",
          "ErrorCode": 0,
          "ErrorMessage": null,
          "TransactionRefNo": "996182419382"
      }*/
    
   // return responseBody
    }