

var paySettings = {
    DOMAIN:invoiceSettings.domain,
    stripe:{
        PUBLISHABLE_KEY:invoiceSettings.checkouts['Stripe'].PUBLISHABLE_KEY//||'pk_live_518wo3qEB9Gfp1i8QifDcWocfocfuhEtZr6Bospg60FsnR37S6Lwt69I0EZ6hqsvul8POOgnNURETpwQOlVM3qdkO00WTqwMzVB'
    }
}
var stripe = Stripe(paySettings.stripe.PUBLISHABLE_KEY);

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
     $('#confirm_directDebit').click(function(){
        handleCheckout(this)
    })

    if(urlParams['stripe_checkout']=='paid'){
        postSlackNotification_purchase_complete('Stripe')
    }else if(urlParams['stripe_checkout']=='canceled'){
        postSlackNotification_purchase_cancelled('Stripe')
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
 function handleCheckout(thisButton){
  //  var thisButton = button
     console.log('[$payButton click] click this',thisButton)
    // var checkoutMode = $thisButton.dataset.checkoutMode
    // var paymentMode = $thisButton.dataset.paymentMode
     //var id = $thisButton.id
     //var $thisButton = $(thisButton)
     console.log('[$payButton click] $thisButton',thisButton)
     var buttonProps = new Object()
    buttonProps.id = thisButton.id
    buttonProps.paymentMode = thisButton.dataset.paymentMode
    buttonProps.checkout = thisButton.dataset.checkout
    console.log('[$payButton click] buttonProps',buttonProps)
    handleCheckoutButtons(buttonProps)
}
 function handleCheckoutButtons(thisButton) {
    /*thisButton  {
        id: $thisButton.id,
        paymentMode: $thisButton.dataset.paymentMode,
        checkout: $thisButton.dataset.checkoutMode
    }*/
    console.log('[handleCheckoutButtons] buttonData',thisButton.checkout,thisButton)
    //which checkout stage?
    if(thisButton.checkout=='confirm'){
        postSlackNotification_purchase_initiated(thisButton.paymentMode)
        switch(thisButton.paymentMode) {
            case 'Direct Debit':
                // stripe confirmation through callback // toggleDepositInstructions()
                if (window.confirm("Have you already processed your payment for via "+thisButton.paymentMode+"?")) { 
                    postSlackNotification_purchase_complete(thisButton.paymentMode) //  alert("Payment confirmed");
                    $('#payInstructions').html("<b>Payment Confirmed</b><br><span>Thank you very much, a notification has been sent to obi.</span>")
                }else{
                    postSlackNotification_purchase_cancelled(thisButton.paymentMode) //directDebitOpened_cancelled = true
                }
                break;
            case 'Stripe':
                // stripe confirmation through callback // toggleDepositInstructions()
                break;
            case 'Coinbase':
                // coinbase confirmation through callback  //  toggleDepositInstructions()
                
                break;
            //   default:
                // code block
        }
    }else if(thisButton.checkout=='open'){
        switch(thisButton.paymentMode) {
            //what happens if they chose that payment option
            case 'Direct Debit':
                //opens direct deposit instructions
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

                
                var paramsToPass = 'inv_num='+encodeURI(urlParams.inv_num)+
                '&client_name='+encodeURI(urlParams.client_name)+
                '&project_name='+encodeURI(urlParams.project_name)+
                '&stripe_price_id='+encodeURI(urlParams.stripe_price_id)
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
                window.location.href = "https://crypto.obisims.com/" + invoiceSettings.invoice.NUM;
                break;
            //   default:
                // code block
        }
    }

}




var directDebitOpened = false
var directDebitOpened_cancelled = false
function toggleDepositInstructions(){
            
        $('#header').toggleClass('directDebitShrink')
        $("#pay_instructions").slideToggle( "slow", function() {
            // Animation complete.
        });
        $("#pay_Crypto.payButton").slideToggle();
        $("#pay_Stripe.payButton").slideToggle();
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