/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SLACK GLOBALS
*/////////////////////////////////////////////////////////////////////////////////////
  var slackurlConstruct = ''
  slackurlConstruct=slackurlConstruct+'https://hooks.slack.com/services/'
  slackurlConstruct=slackurlConstruct+'T39L0UW83/'
  slackurlConstruct=slackurlConstruct+'B01BM0BNLE9/'
  slackurlConstruct=slackurlConstruct+'iUq6FWDg9Z6TWuS4Lnph2VTo'
  const slackSettings = {
    default_chan:'#obisims-invoices',
    colors:{
      purple:'#291a2b',
      blue:'#4285F4',
      red:'#f15b58',
      grey:'#d1d1d1',
      redGoogle:'#DB4437',
      yellow:'#F4B400',
      green:'#0F9D58'
    },
    methodEmojis:{
      'Direct Debit':':dollar:',//:bank:
      'Stripe':':credit_card:',
      'Coinbase':':coin:'
    },
    webhook:slackurlConstruct
  }
 /*
  var methodEmojis = {
    'Direct Debit':':dollar:',//:bank:
    'Stripe':':credit_card:',
    'Coinbase':':coin:'
  }*/
/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SLACK POST COMMANDS///////////////////////////////////
                    https://app.slack.com/block-kit-builder/
*/////////////////////////////////////////////////////////////////////////////////////


function postSlackNotification_purchase_complete(payMethod,slackPostSettings){
 // if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':receipt:'//':dollar:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Paid'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Paid: "+global_slackPostSettings.invoice.INV_NUM+""
    postSettings.payment.METHOD = payMethod
 // }
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+'Direct Debit','invoice paid\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.green,fallback:"Invoice Submitted: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},[
    {"title":"Invoice Paid","value":slackPostSettings.invoice.INV_NUM},
    {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
    {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT},//.toFixed(2)
    {"title":"Method","value":slackPostSettings.payment.METHOD+' '+slackSettings.methodEmojis[postSettings.payment.METHOD]},
    {"title":"Receipt","value":invoiceSettings.payStatus.RECEIPT}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}


function postSlackNotification_purchase_cancelled(payMethod,slackPostSettings){
 // if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':money_with_wings:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Cancelled'
    postSettings.message.NOTIFICATION_SUMMARY = "Transaction Cancelled: "+global_slackPostSettings.invoice.INV_NUM+""
    postSettings.payment.METHOD = payMethod
  //}
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+payMethod,'transaction cancelled\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.red,fallback:"Transaction Cancelled: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},[
    {"title":"Transaction Cancelled","value":slackPostSettings.invoice.INV_NUM},
  //  {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
    {"title":"Cancelled Gateway","value":slackPostSettings.payment.METHOD+' '+slackSettings.methodEmojis[postSettings.payment.METHOD]},
   // {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}







function postSlackNotification_purchase_initiated(payMethod,slackPostSettings){
  //if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':memo:'//':eye:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Transaction Created'
    postSettings.message.NOTIFICATION_SUMMARY = "Transaction Created: "+global_slackPostSettings.invoice.INV_NUM+""
    postSettings.payment.METHOD = payMethod
  //}
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]

 
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+payMethod,'transaction created\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.yellow,fallback:"Transaction created: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},[
    {"title":"Transaction Created","value":slackPostSettings.invoice.INV_NUM},
  //  {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
    {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD+' '+slackSettings.methodEmojis[postSettings.payment.METHOD]},
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}


function postSlackNotification_gateway_opened(mobile,ipInfo,slackPostSettings){
  //if(!slackPostSettings){
    //console.log(ipInfo)
   // console.log('[postSlackNotification_gateway_opened] ipInfo',ipInfo)
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':admission_tickets: '//':eye:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Opened'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Opened: "+global_slackPostSettings.invoice.INV_NUM+""
  //  postSettings.payment.METHOD = payMethod
  //}
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]
  var devices = {
    true:':iphone: mobile',
    false:':computer: desktop'
  }
 //if(mobile)attachs.push({"title":"Device","value":devices[mobile]})
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+devices[mobile]+'','invoice opened\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  
  var attachs = [
   // {"title":"Invoice Opened","value":slackPostSettings.invoice.INV_NUM},
   // {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
  //  {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD},
  //{"title":"isMobile","value":mobile},
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]
  console.log('[postSlackNotification_gateway_opened] ipInfo',ipInfo)
  if(ipInfo){
    if(ipInfo.ip)attachs.push({"title":"IP","value":"<http://api.ipstack.com/"+ipInfo.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+ipInfo.ip+">"})
    if(ipInfo.colo)attachs.push({"title":"Region","value":ipInfo.colo+', '+ipInfo.loc+' :flag-'+ipInfo.loc+':'})
    //if(ipInfo.loc)attachs.push({"title":"Country","value":})
  }
  
  
  
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.grey,fallback:"Invoice Opened: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},attachs))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}







function postSlackNotification_gateway_share(mobile,ipInfo,slackPostSettings){
  //if(!slackPostSettings){
    //console.log(ipInfo)
   // console.log('[postSlackNotification_gateway_opened] ipInfo',ipInfo)
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':calling:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Shared'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Shared: "+global_slackPostSettings.invoice.INV_NUM+""
  //  postSettings.payment.METHOD = payMethod
  //}
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]
  var devices = {
    true:':iphone: mobile',
    false:':computer: desktop'
  }
 //if(mobile)attachs.push({"title":"Device","value":devices[mobile]})
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+devices[mobile]+'','invoice shared\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  
  var attachs = [
   // {"title":"Invoice Opened","value":slackPostSettings.invoice.INV_NUM},
   // {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
  //  {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD},
  //{"title":"isMobile","value":mobile},
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]
  console.log('[postSlackNotification_gateway_opened] ipInfo',ipInfo)
  if(ipInfo){
    if(ipInfo.ip)attachs.push({"title":"IP","value":"<http://api.ipstack.com/"+ipInfo.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+ipInfo.ip+">"})
    if(ipInfo.colo)attachs.push({"title":"Region","value":ipInfo.colo+', '+ipInfo.loc+' :flag-'+ipInfo.loc+':'})
    //if(ipInfo.loc)attachs.push({"title":"Country","value":})
  }
  
  
  
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.grey,fallback:"Invoice Opened: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},attachs))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}
















function postSlackNotification_gateway_download(mobile,ipInfo,slackPostSettings){
  
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':page_with_curl:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Downloaded'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Downloaded: "+global_slackPostSettings.invoice.INV_NUM+""
  //  postSettings.payment.METHOD = payMethod
  //}
  var slackPostSettings = postSettings || slackPostSettings
  var slackBlocks =  [/*{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
  }*/]
  var devices = {
    true:':iphone: mobile',
    false:':computer: desktop'
  }
 //if(mobile)attachs.push({"title":"Device","value":devices[mobile]})
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+devices[mobile]+'','invoice Downloaded\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  
  var attachs = [
   // {"title":"Invoice Opened","value":slackPostSettings.invoice.INV_NUM},
   // {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
  //  {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD},
  //{"title":"isMobile","value":mobile},
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]
  console.log('[postSlackNotification_gateway_downloaded] ipInfo',ipInfo)
  if(ipInfo){
    if(ipInfo.ip)attachs.push({"title":"IP","value":"<http://api.ipstack.com/"+ipInfo.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+ipInfo.ip+">"})
    if(ipInfo.colo)attachs.push({"title":"Region","value":ipInfo.colo+', '+ipInfo.loc+' :flag-'+ipInfo.loc+':'})
    //if(ipInfo.loc)attachs.push({"title":"Country","value":})
  }
  
  
  
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.grey,fallback:"Invoice Opened: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},attachs))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}


































/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SLACK POSTER
*/////////////////////////////////////////////////////////////////////////////////////

  function postSlackNotification(slackPostSettings,slackBlocks,slackAttachments){
    var slackPostSettings = slackPostSettings || global_slackPostSettings
    slackPostSettings.settings.CHANNEL = slackPostSettings.settings.CHANNEL || slackSettings.default_chan//"#obisims-invoices"// document.getElementById('target').value
    slackPostSettings.settings.USERNAME = slackPostSettings.settings.USERNAME || 'Invoice Gateway'
    var notifcationMessage = slackPostSettings.message.NOTIFICATION_SUMMARY || 'message content error or NOTIFICATION_SUMMARY empty'//  || invNum+' | '+payMethod+' transaction created'
    // format payload for slack
    var slackPayload = {
       "text":notifcationMessage,
       "channel":slackPostSettings.settings.CHANNEL,
       "username":slackPostSettings.settings.USERNAME,
       "icon_emoji":slackPostSettings.settings.AVATAR,
    }
    if(slackBlocks)slackPayload['blocks'] = slackBlocks
    if(slackAttachments)slackPayload['attachments'] = slackAttachments
    // post
    console.log('[postSlackNotification] posting',slackPayload)
     $.ajax({
       // url is what you get from activating the "Incoming WebHooks" slack integration
       // if you leave, you should see an error message "No Team", status 404
       url: slackSettings.webhook,//'https://hooks.slack.com/services/XXXXX/XXXXXX/XXXXXX',
       type: 'POST',
       processData: true,
       data : JSON.stringify(slackPayload) ,
       success : function(data) {
         // success will show on page
         console.log('[postSlackNotification][success]',data)
       //  $('#result').html(data);
        return true
       },
       error: function(data){
         // error will show error object
         console.log('[postSlackNotification][failure]',data)
       //  $('#result').html("error:"+JSON.stringify(data));
       return false
      }
     });


  }

/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SLACK POST UTILS
*/////////////////////////////////////////////////////////////////////////////////////



function slack_quickBlock(value,addendum){
  var txt = value // '*'+title+'*:'+txt
  //if(title)txt= '*'+title+'*:'+txt
  if(addendum)txt = txt + ' | ' +addendum
  var block = //[
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
      }
    }
   //]
  return block
}

function slack_quickBlock_text(value,addendum){
  var txt = value // '*'+title+'*:'+txt
  //if(title)txt= '*'+title+'*:'+txt
  if(addendum)txt = txt + ' | ' +addendum
  var text = //[
    {
        "type": "mrkdwn",
        "text": txt //'*'+title+'* | '+value+' transaction cancelled'// | "+clientName
    }
   //]
  return text
}





function slack_quickAttachment(slackAttachmentSettings,attachments){
  var slackAttachmentSettings = slackAttachmentSettings||{
    short:true,
    fallback:'no fallback set',
    color:slackSettings.colors.green
  }
  var short = short || true
  var fallback = fallback || 'no fallback set'
  var title = title || 'no title set'
  var value = value || 'no value set' // '*'+title+'*:'+txt
  
  var attachment = {"fields":[]};
    if(fallback)attachment['fallback']= fallback
    if(slackAttachmentSettings.color)attachment['color']= slackAttachmentSettings.color
  
  for(var i = 0;i<attachments.length;i++){
    var thisAttachment = attachments[i]
    if(!thisAttachment['short'])thisAttachment['short']=slackAttachmentSettings.short || true
    attachment['fields'].push({
      "title":thisAttachment['title'],
      "value":thisAttachment['value'],
      "short":thisAttachment['short']
    })
  }
  
  return attachment
}





























/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////OLD FUCKING JAZZ
*/////////////////////////////////////////////////////////////////////////////////////





