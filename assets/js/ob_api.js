function ob_api(inv){
    // v8 // ob_api / obApi_invoices 
    //(urlParams.inv).split('-')[1]
    if(Number.isNaN(new Number(Number(inv))))inv = inv.split('-')[1];//handle raw num and prefix
    inv = new Number(inv)
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)obi_api_apiUrl = obi_api_apiUrl+'?'+'inv='+inv//get just this inv
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)
        obiAPI_params = data

    })

}