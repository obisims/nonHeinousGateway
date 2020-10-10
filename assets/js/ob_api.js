function ob_api(inv){
    // v8 // ob_api / obApi_invoices 
    if(!Number(inv))inv = inv.split('-')[1];//handle raw num and prefix
    inv = new Number(inv)
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)inv = obi_api_apiUrl+'?'+'inv='+inv//get just this inv
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)


    })

}