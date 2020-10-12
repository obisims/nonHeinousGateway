function ob_api(inv){

    console.log('[ob_api]','inv',inv)
    // v8 // ob_api / obApi_invoices 
    //(urlParams.inv).split('-')[1]
    var invNum = new Number(inv)
    console.log('[ob_api]','invNum',invNum)
    if(Number.isNaN(invNum))invNum = new Number(inv.split('-')[1]);//handle raw num and prefix
    //console.log('[ob_api]','Number(invNum)',invNum)
    
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)obi_api_apiUrl = obi_api_apiUrl+'?'+'inv='+invNum//get just this inv
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)
        obiAPI_params = data

    })

}