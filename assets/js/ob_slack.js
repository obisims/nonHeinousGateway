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
    webhook:slackurlConstruct
  }
  var global_slackPostSettings = {
    message:{
      NOTIFICATION_SUMMARY:'THX-1184'+' | '+'VALUE'+' info'
    },
    settings:{
      CHANNEL:"#obisims-invoices",
      USERNAME:'Invoice Gateway',
      AVATAR:':eye:'
    },
    payment:{
      METHOD:'Direct Debit',
      AMOUNT:666.666
    },
    invoice:{
      INV_NUM:'THX-1184',
      CLIENT_NAME:'Doppelgänger Doppelgänger Dudes Pty Ltd',
      PROJECT_NAME:'Some Project'
    }
  }
/*////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SLACK POST COMMANDS
*/////////////////////////////////////////////////////////////////////////////////////


function postSlackNotification_purchase_complete(payMethod,slackPostSettings){
 // if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':dollar:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Paid'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Paid: <https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+global_slackPostSettings.invoice.INV_NUM+">"
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
    {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
    {"title":"Method","value":slackPostSettings.payment.METHOD}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}


function postSlackNotification_purchase_cancelled(payMethod,slackPostSettings){
 // if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':money_with_wings:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Cancelled'
    postSettings.message.NOTIFICATION_SUMMARY = "Transaction Cancelled: <https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+global_slackPostSettings.invoice.INV_NUM+">"
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
    {"title":"Cancelled Gateway","value":slackPostSettings.payment.METHOD},
   // {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}







function postSlackNotification_purchase_initiated(payMethod,slackPostSettings){
  //if(!slackPostSettings){
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':eye:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Transaction Created'
    postSettings.message.NOTIFICATION_SUMMARY = "Transaction Created: <https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+global_slackPostSettings.invoice.INV_NUM+">"
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
    {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD},
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]))
  postSlackNotification(slackPostSettings,slackBlocks,slackAttachments)
}


function postSlackNotification_gateway_opened(mobile,slackPostSettings){
  //if(!slackPostSettings){
    //console.log(ipInfo)
    console.log('[postSlackNotification_gateway_opened] ipInfo',ipInfo)
    var postSettings = new Object(slackPostSettings||global_slackPostSettings)
    postSettings.settings.AVATAR = ':eye:'
    postSettings.settings.USERNAME = 'Invoice Gateway - Opened'
    postSettings.message.NOTIFICATION_SUMMARY = "Invoice Opened: <https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+global_slackPostSettings.invoice.INV_NUM+">"
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
  slackBlocks.push(slack_quickBlock("<https://pay.obisims.com/"+global_slackPostSettings.invoice.INV_NUM+"|"+'*'+slackPostSettings.invoice.INV_NUM+'*'+">"+': '+'some data','invoice opened\n'+slackPostSettings.invoice.CLIENT_NAME))
  //slackBlocks.push(slack_quickBlock('*Title*'+': '+'Value ','invoice paid'))
  var slackAttachments = [];
  slackAttachments.push(slack_quickAttachment({short:true,color:slackSettings.colors.grey,fallback:"Transaction created: <https://pay.obisims.com/"+slackPostSettings.invoice.INV_NUM+"|"+slackPostSettings.invoice.INV_NUM+">"},[
    {"title":"Invoice Opened","value":slackPostSettings.invoice.INV_NUM},
   // {"title":"Project","value":slackPostSettings.invoice.PROJECT_NAME},
  //  {"title":"Amount","value":"$"+slackPostSettings.payment.AMOUNT.toFixed(2)},
  //  {"title":"Opened Gateway","value":slackPostSettings.payment.METHOD},
  {"title":"isMobile","value":mobile},
  
  //  {"title":"Client","value":slackPostSettings.invoice.CLIENT_NAME}
  ]))
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
function old_GetUserIP(){
  console.log('[GetUserIP] getting...')
  var ret;
 // $.ajaxSetup({async: false});
  var ipifyKey = 'at_dGnbGW3mDHKUWyngwdcwS3T2NrW7B'
  $.get('https://geo.ipify.org/api/v1?apiKey='+ipifyKey, function(r){ 
    ret = r; 
    console.log('[GetUserIP] ret',ret)
    return ret;
  });
}
function GetUserIP(){
  console.log('[GetUserIP] getting...')
  $(function () {
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        dataType: "jsonp",
        data: {apiKey: 'at_dGnbGW3mDHKUWyngwdcwS3T2NrW7B'},//, ipAddress: ip
        success: function(data) {
          console.log('[GetUserIP] data',data)
          return data;
          //  $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
        }
    });
 });
}


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










function slack_invoiceLoad(slackPars){
  var slackPars = slackPars||{
    invNum : 'THX-1184',
    chan : "#obisims-invoices",
    //ipData:ipData,
    //isMobile:isMobile
    project:project,
    client:client
  }
  

var ipData;

  $.getJSON('https://api.ipstack.com/check?access_key=5881abddbc972045f1878182a8611e63', function(data) {
    ipData = data  
    console.log('ipData Grabbed:',ipData);
    if(ipData.success==false){
      console.log('ipData fail:',ipData.success);


      var ipifyKey = 'at_dGnbGW3mDHKUWyngwdcwS3T2NrW7B'
      $.get('https://geo.ipify.org/api/v1?apiKey='+ipifyKey, function(newIpInfo){ 
        ipData = newIpInfo
        if(ipData==undefined){
         // ipData = ipData || new Object()
         // ipData.ip = GetUserIP().ip;
        }
      });

//  var ipData = newIpInfo//GetUserIP();



  var devices = {
    true:'mobile',
    false:'desktop'
  }
    
  if(ipData!=undefined){
    if(ipData.ip!=undefined){
  
 //     fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
      //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",


    var payload ={
      // "text": msg,
      "channel":slackPars.chan,
      "username":'Invoice Gateway - Opened',
      "icon_emoji":':eye:',
      "text":slackPars.invNum+' | opened',
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text":'*Invoice*: '+"<https://pay.obisims.com/"+slackPars.invNum+"|"+slackPars.invNum+">"
          }
        },
        {
          "type": "mrkdwn",
          "text": "*Device*: "+devices[isMobile]
        },
        {
          "type": "mrkdwn",
          "text": '*Project*: '+slackPars.project
        },
        {
          "type": "mrkdwn",
          "text": '*Client*: '+slackPars.client
        }/*,
        {
          "type": "section",
          "block_id": "section567",
          "text": {
            "type": "mrkdwn",
            "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
            "alt_text": "Haunted hotel image"
          }
        },
        {
          "type": "section",
          "block_id": "section789",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Average Rating*\n1.0"
            }
          ]
        }*/
      ]/*,
      "attachments":[
        {
           //"fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
           //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
         //  "color":slackSettings.colors.green,
           "fields":[
              {
                 "title":"IP",
                 "value":ipData.ip,
                 "short":true
              },
              {
                "title":"Country",
                "value":ipData.country_name,
                "short":true
             },
              {
                "title":"Region",
                "value":ipData.region_name,
                "short":true
             }
             
           ]
        }
     ]*/
  };
  if(ipData!=undefined){
    if(ipData.ip){
      var msgFields = payload['blocks'][0]['fields']
      
      ipArrs = [{
        "type": "mrkdwn",
        "text": "*IP*: "+"<http://api.ipstack.com/"+ipData.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+ipData.ip+">"
      },{
        "type": "mrkdwn",
        "text": "*Location*: :flag-"+ipData.location.country+": "+ipData.location.city+", "+ipData.location.country
      }];
  
      //msgFields.splice.apply(msgFields, [2, 0].concat(ipArrs));
      msgFields.splice(1, 0, ...ipArrs);
    
    }
  }
    // return json string of payload
    
  
  
    var sdata = JSON.stringify(payload) || formatForSlack(invNum, chan)
    $.ajax({
      // url is what you get from activating the "Incoming WebHooks" slack integration
      // if you leave, you should see an error message "No Team", status 404
      url: slackSettings.webhook,//'https://hooks.slack.com/services/XXXXX/XXXXXX/XXXXXX',
      type: 'POST',
      processData: true,
      data : sdata ,
      success : function(data) {
        // success will show on page
        //console.log(data)
        console.log('[slackSettings][success]',data)
      //  $('#result').html(data);
      },
      error: function(data){
        // error will show error object
        console.log('[slackSettings][failure]',data)
      //  $('#result').html("error:"+JSON.stringify(data));
    }
    });
  
    }else{






      var payload ={
        // "text": msg,
        "channel":slackPars.chan,
        "username":'Invoice Gateway - Opened',
        "icon_emoji":':eye:',
        "text":slackPars.invNum+' opened',
        "blocks": [
          
          {
            "type": "section",
            "block_id": "section789",
            "fields": [
              {
                "type": "mrkdwn",
                "text": '*Invoice*: '+"<https://pay.obisims.com/"+slackPars.invNum+"|"+slackPars.invNum+">"
              },
              {
                "type": "mrkdwn",
                "text": "*Device*: "+devices[isMobile]
              },
              {
                "type": "mrkdwn",
                "text": '*Project*: '+slackPars.project
              },
              {
                "type": "mrkdwn",
                "text": '*Client*: '+slackPars.client
              }
              
            ]
          }/*,
          {
            "type": "section",
            "block_id": "section567",
            "text": {
              "type": "mrkdwn",
              "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
            },
            "accessory": {
              "type": "image",
              "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
              "alt_text": "Haunted hotel image"
            }
          },
          {
            "type": "section",
            "block_id": "section789",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*Average Rating*\n1.0"
              }
            ]
          }*/
        ]/*,
        "attachments":[
          {
            //"fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
            //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
          //  "color":slackSettings.colors.green,
            "fields":[
                {
                  "title":"IP",
                  "value":ipData.ip,
                  "short":true
                },
                {
                  "title":"Country",
                  "value":ipData.country_name,
                  "short":true
              },
                {
                  "title":"Region",
                  "value":ipData.region_name,
                  "short":true
              }
              
            ]
          }
      ]*/
    };
    

    if(ipData!=undefined){
      if(ipData.ip){
       // var msgFields = 
        
        ipArrs = [{
          "type": "mrkdwn",
          "text": '*IP*: '+"<http://api.ipstack.com/"+ipData.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+justIP+">" //+ "<https://pay.obisims.com/"+justIP+"|"+justIP+">"
        }];
      
        //msgFields.splice.apply(msgFields, [2, 0].concat(ipArrs));
        payload['blocks'][0]['fields'].splice(1, 0, ...ipArrs);
       
      }
      }
              
      // return json string of payload
      
    
    
      var sdata = JSON.stringify(payload) || formatForSlack(invNum, chan)
      $.ajax({
        // url is what you get from activating the "Incoming WebHooks" slack integration
        // if you leave, you should see an error message "No Team", status 404
        url: slackSettings.webhook,//'https://hooks.slack.com/services/XXXXX/XXXXXX/XXXXXX',
        type: 'POST',
        processData: true,
        data : sdata ,
        success : function(data) {
          // success will show on page
          console.log('[slackSettings][success]',data)
        //  $('#result').html(data);
        },
        error: function(data){
          // error will show error object
          console.log('[slackSettings][failure]',data)
        //  $('#result').html("error:"+JSON.stringify(data));
      }
      });









    }
  }




    }else{
      console.log('ipData success:',ipData.success);
    }
  })
  .done(function() {
   // var ipData = data//JSON.stringify(data, null, 2) 
    console.log('ipData done:',ipData);
  
    if(!ipData.ip){return}
      var devices = {
        true:'mobile',
        false:'desktop'
      }
      
    var payload ={
      // "text": msg,
      "channel":slackPars.chan,
      "username":'Invoice Gateway - Opened',
      "icon_emoji":':eye:',
      "text":slackPars.invNum+' opened',
      "blocks": [
        
        {
          "type": "section",
          "block_id": "section789",
          "fields": [
            {
              "type": "mrkdwn",
              "text": '*Invoice*: '+"<https://pay.obisims.com/"+slackPars.invNum+"|"+slackPars.invNum+">"
            },
            {
              "type": "mrkdwn",
              "text": "*Device*: "+devices[isMobile]
            },
            {
              "type": "mrkdwn",
              "text": '*Project*: '+slackPars.project
            },
            {
              "type": "mrkdwn",
              "text": '*Client*: '+slackPars.client
            }
            
          ]
        }/*,
        {
          "type": "section",
          "block_id": "section567",
          "text": {
            "type": "mrkdwn",
            "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
            "alt_text": "Haunted hotel image"
          }
        },
        {
          "type": "section",
          "block_id": "section789",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Average Rating*\n1.0"
            }
          ]
        }*/
      ]/*,
      "attachments":[
        {
           //"fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
           //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
         //  "color":slackSettings.colors.green,
           "fields":[
              {
                 "title":"IP",
                 "value":ipData.ip,
                 "short":true
              },
              {
                "title":"Country",
                "value":ipData.country_name,
                "short":true
             },
              {
                "title":"Region",
                "value":ipData.region_name,
                "short":true
             }
             
           ]
        }
     ]*/
  };
  if(ipData!=undefined){
  if(ipData.ip){
    var msgFields = payload['blocks'][0]['fields']
    
    ipArrs = [{
      "type": "mrkdwn",
      "text": "*IP*: "+"<http://api.ipstack.com/"+ipData.ip+"?access_key=5881abddbc972045f1878182a8611e63|"+ipData.ip+">"
    },{
      "type": "mrkdwn",
      "text": "*Location*: "+ipData.location.country_flag_emoji+" "+ipData.city+", "+ipData.region_code
    }];
  
    //msgFields.splice.apply(msgFields, [2, 0].concat(ipArrs));
    msgFields.splice(1, 0, ...ipArrs);
   
  }
  }
    // return json string of payload
    
  
  
    var sdata = JSON.stringify(payload) || formatForSlack(invNum, chan)
    $.ajax({
      // url is what you get from activating the "Incoming WebHooks" slack integration
      // if you leave, you should see an error message "No Team", status 404
      url: slackSettings.webhook,//'https://hooks.slack.com/services/XXXXX/XXXXXX/XXXXXX',
      type: 'POST',
      processData: true,
      data : sdata ,
      success : function(data) {
        // success will show on page
        //console.log(data)
        console.log('[slackSettings][success]',data)
      //  $('#result').html(data);
      },
      error: function(data){
        // error will show error object
        console.log('[slackSettings][failure]',data)
      //  $('#result').html("error:"+JSON.stringify(data));
    }
    });
    })
  .fail(function(jqXHR, textStatus, errorThrown) {
    
    console.log('getJSON failed! ' + textStatus);
  
  })
  .always(function() { console.log('getJSON request always!'); });
 


}






















