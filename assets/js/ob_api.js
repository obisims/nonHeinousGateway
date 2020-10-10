function ob_api(inv){
    // v7 // ob_api / obApi_invoices 
    if(!Number(inv))inv = inv.split('-')[1];
    //inv = new Number(inv)
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)inv = obi_api_apiUrl+'?'+'inv='+inv
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)

    })

}