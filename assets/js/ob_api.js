function ob_api(inv){
    //if(inv.split('-')[1]=="THX"){
    //}
    console.log('[ob_api]','inv',inv)
    // v9    // ob_api / obApi_invoices 
    //(urlParams.inv).split('-')[1]
    var invNum = Number(inv)
    console.log('[ob_api]','invNum',invNum)
    
    console.log('[ob_api]','is NaN',Number.isNaN(invNum))
    if(Number.isNaN(invNum)){
    
    var newNum = inv.split('-')[1]
    console.log('[ob_api]','newNum',newNum)
        invNum = newNum//inv.split('-')[1]
        ;}//handle raw num and prefix
    console.log('[ob_api]','invNum',invNum)
    
    var obi_api_apiUrl = 'https://script.google.com/macros/s/AKfycbxhNWLM3sijTGy-L_-YrkVINYblPMdyaFlnnEbleFYf-apslLgs/exec'
    if(inv)obi_api_apiUrl = obi_api_apiUrl+'?'+'inv='+invNum//get just this inv
    $.getJSON(obi_api_apiUrl, function(data) {
        console.log('[ob_api]','invoice data',data)
        obiAPI_params = data[invNum]
        updateGlobalParams(obiAPI_params)

    })
   
}

function updateGlobalParams(obiAPI_params){
    console.log('[updateGlobalParams] updating',obiAPI_params,urlParams)
    if(obiAPI_params['INV NUM'])urlParams.inv=obiAPI_params['INV PREFIX']+'-'+obiAPI_params['INV NUM']
    if(obiAPI_params['TOTAL'])urlParams.inv_total=obiAPI_params['TOTAL']
    if(obiAPI_params['CLIENT'])urlParams.client_name=obiAPI_params['CLIENT']
    if(obiAPI_params['PROJECT'])urlParams.project_name=obiAPI_params['PROJECT']
    if(obiAPI_params['STRIPE PRICE'])urlParams.stripe_price=obiAPI_params['STRIPE PRICE']
    if(obiAPI_params['STRIPE CHECKOUT ID'])urlParams.stripe_price_id=obiAPI_params['STRIPE CHECKOUT ID']
    if(obiAPI_params['DRIVE ID'])urlParams.drive_id=obiAPI_params['DRIVE ID']
    if(obiAPI_params['ISSUED'])urlParams.date_issued=moment(obiAPI_params['ISSUED'],'DD-MM-YYYY').format('DDMMYYY')
    if(obiAPI_params['DUE'])urlParams.date_due=moment(obiAPI_params['DUE'],'DD-MM-YYYY').format('DDMMYYY')
    console.log('[updateGlobalParams] UPDATED',obiAPI_params,urlParams)
 
}