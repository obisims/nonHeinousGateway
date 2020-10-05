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
                toggleDepositInstructions()
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
                '&drive_id='+encodeURI(urlParams.drive_id)
                '&date_due='+encodeURI(urlParams.date_due)
                
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
       
        var buttonLockdown = $pay_Direct.attr('data-lockhover')
        if(buttonLockdown=="false"){
            $pay_Direct.html('<b>Back</b>')
        }else{
            $pay_Direct.html(payDirectOriginalHtml)
        }
        $pay_Direct.attr('data-lockhover', buttonLockdown == 'true' ? 'false' : 'true')
        

        var $payInstruction = $("#pay_instructions")
        $("#pay_instructions").slideToggle( "slow", function() { /* Animation complete.*/});

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