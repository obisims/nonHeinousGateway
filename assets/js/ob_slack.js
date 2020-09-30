
  var slackurlConstruct = ''
  slackurlConstruct=slackurlConstruct+'https://hooks.slack.com/services/'
  slackurlConstruct=slackurlConstruct+'T39L0UW83/'
  slackurlConstruct=slackurlConstruct+'B01BM0BNLE9/'
  slackurlConstruct=slackurlConstruct+'iUq6FWDg9Z6TWuS4Lnph2VTo'
  const slackSettings = {
    colors:{
      purple:'#291a2b',
      blue:'#4285F4',
      red:'#f15b58',
      gfrey:'#d1d1d1',
      redGoogle:'#DB4437',
      yellow:'#F4B400',
      green:'#0F9D58'
    },
    webhook:slackurlConstruct
  }
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



  var ipData = GetUserIP();



  var devices = {
    true:'mobile',
    false:'desktop'
  }
    
  if(ipData!=undefind){
    if(ipData.ip!=undefined){
  
   
    var payload ={
      // "text": msg,
      "channel":slackPars.chan,
      "username":'Invoice Gateway - Opened',
      "icon_emoji":':eye:',
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
                "text": '*IP*: '+"<http://api.ipstack.com/"+justIP+"?access_key=5881abddbc972045f1878182a8611e63|"+justIP+">" //+ "<https://pay.obisims.com/"+justIP+"|"+justIP+">"
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



function slack_confirmPayment(invNum,invTotal,payMethod,clientName,projectName){
  // get message to be posted
  var invNum = invNum||'THX-1184'//document.getElementById('msgInput').value
  // get target channel or team member
  var invTotal = invTotal || 666
  var clientName = clientName || 'Doppelgänger Dudes Pty Ltd'
  var payMethod = payMethod||"Direct Debit"
console.log('[slack_confirmPayment]',clientName)
  var chan = "#obisims-invoices"// document.getElementById('target').value
  // format payload for slack
//if(!ipData.ip){return}
  var slack_confirmPayment_payload ={
    // "text": msg,
     "channel":chan,
     "username":'Invoice Gateway',
     "icon_emoji":':dollar:',
     /*"blocks": [
       {
         "type": "section",
         "text": {
           "type": "mrkdwn",
           "text": invNum
         }
       },
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
       }
     ],*/
     "attachments":[
       {
          "fallback":"Invoice Submitted: <https://pay.obisims.com/"+invNum+"|"+invNum+">",
          //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
          "color":slackSettings.colors.green,
          "fields":[
             {
              "title":"Invoice Paid <https://pay.obisims.com/"+invNum+"|"+invNum+">",
                "value":clientName,
                "short":true
             },
             {
              "title":"Project",
                "value":projectName,
                "short":true
             },
             {
               "title":"Amount",
               "value":"$"+invTotal.toFixed(2),
               "short":true
            },
             {
               "title":"Method",
               "value":payMethod,
               "short":true
            }
            
          ]
       }
    ]
 };




  var sdata = JSON.stringify(slack_confirmPayment_payload)//formatForSlack(invNum, chan,payMethod,clientName)
  // log in console
  console.log(sdata)
  // post
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



function GetUserIP(){
  var ret;
  $.ajaxSetup({async: false});
  var ipifyKey = 'at_dGnbGW3mDHKUWyngwdcwS3T2NrW7B'
  $.get('https://geo.ipify.org/api/v1?apiKey='+ipifyKey, function(r){ 
    ret = r; 
  });
  return ret;
}




function slack_cancelPayment(invNum,payMethod,clientName){
  // get message to be posted
  var invNum = invNum||'THX-1184'//document.getElementById('msgInput').value
  // get target channel or team member
  //var invTotal = invTotal || 666
  var clientName = clientName || 'Doppelgänger Dudes Pty Ltd'
  var payMethod = payMethod||"Direct Debit"
console.log('[slack_confirmPayment]',clientName)
  var chan = "#obisims-invoices"// document.getElementById('target').value
  // format payload for slack
//if(!ipData.ip){return}
  var slack_cancelPayment_payload ={
    // "text": msg,
     "channel":chan,
     "username":'Invoice Gateway - Cancelled',
     "icon_emoji":':money_with_wings:',
     /*"blocks": [
       {
         "type": "section",
         "text": {
           "type": "mrkdwn",
           "text": invNum
         }
       },
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
       }
     ],*/
     "attachments":[
       {
          "fallback":"Invoice Gateway Cancelled: <http://url_to_task|THX-1184>",
          //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
          "color":slackSettings.colors.yellow,
          "fields":[
             {
                "title":"Invoice "+"<https://pay.obisims.com/"+invNum+"|"+invNum+">",
                "value":clientName,
                "short":true
             },
             /*{
               "title":"Amount",
               "value":"$"+invTotal.toFixed(2),
               "short":true
            },*/
             {
               "title":"Method",
               "value":payMethod,
               "short":true
            }
            
          ]
       }
    ]
 };




  var sdata = JSON.stringify(slack_cancelPayment_payload)//formatForSlack(invNum, chan,payMethod,clientName)
  // log in console
  console.log(sdata)
  // post
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












function slack_openedPayment(invNum,payMethod){
  // get message to be posted
  var invNum = invNum||'THX-1184'//document.getElementById('msgInput').value
  // get target channel or team member
 // var invTotal = invTotal || 666
 // var clientName = clientName || 'Doppelgänger Dudes Pty Ltd'
  var payMethod = payMethod||"Direct Debit"
//console.log('[slack_confirmPayment]',clientName)
  var chan = "#obisims-invoices"// document.getElementById('target').value
  // format payload for slack

  var slack_openedPayment_payload ={
    // "text": msg,
     "channel":chan,
     "username":'Invoice Gateway - Opened',
     "icon_emoji":':eye:',
     "blocks": [
        
      {
        "type": "section",
        "block_id": "section789",
        "fields": [
          {
            "type": "mrkdwn",
            "text": '*Invoice*: '+"<https://pay.obisims.com/"+invNum+"|"+invNum+">"
          },
         /* {
            "type": "mrkdwn",
            "text": "**: "+ipData.ip
          },*/
          {
            "type": "mrkdwn",
            "text": "*Gateway*: "+payMethod+""
          }/*,
          {
            "type": "mrkdwn",
            "text": "*Device*: "+device[isMobile]
          }*/
        ]
      }
    ]
    /* "attachments":[
       {
          "fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
          //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
          "color":slackSettings.colors.green,
          "fields":[
             {
                "title":"Invoice Paid",
                "value":invNum+" by "+clientName,
                "short":false
             },
             {
               "title":"Amount",
               "value":"$"+invTotal.toFixed(2),
               "short":true
            },
             {
               "title":"Method",
               "value":payMethod,
               "short":true
            }
            
          ]
       }
    ]*/
 };




  var sdata = JSON.stringify(slack_openedPayment_payload)//formatForSlack(invNum, chan,payMethod,clientName)
  // log in console
  console.log(sdata)
  // post
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

































/*
* format for slack
* change "username" per instructions
* change emoji icon if desired
*/
function slack_confirmPayment_format(invNum, chan,payMethod,clientName){
  
  // return json string of payload
  return JSON.stringify(payload)
}












function slack_postMSG(invNum,invTotal,clientName){
    // get message to be posted
    var invNum = invNum||'THX-1184'//document.getElementById('msgInput').value
    // get target channel or team member
    var invTotal = invTotal || 666
    var clientName = clientName || 'Doppelgänger Dudes Pty Ltd'
    var chan = "#obisims-invoices"// document.getElementById('target').value
    // format payload for slack
    var sdata = formatForSlack(invNum, chan)
    // log in console
    console.log(sdata)
    // post
     $.ajax({
       // url is what you get from activating the "Incoming WebHooks" slack integration
       // if you leave, you should see an error message "No Team", status 404
       url: slackSettings.webhook,//'https://hooks.slack.com/services/XXXXX/XXXXXX/XXXXXX',
       type: 'POST',
       processData: true,
       data : sdata ,
       success : function(data) {
         // success will show on page
         console.log(data)
       //  $('#result').html(data);
       },
       error: function(data){
         // error will show error object
         console.log(data)
       //  $('#result').html("error:"+JSON.stringify(data));
      }
     });
  }
  /*
  * format for slack
  * change "username" per instructions
  * change emoji icon if desired
  */
  function formatForSlack(invNum, chan){
    var payload ={
     // "text": msg,
      "channel":chan,
      "username":'Invoice Gateway',
      "icon_emoji":':dollar:',
      /*"blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": invNum
          }
        },
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
        }
      ],*/
      "attachments":[
        {
           "fallback":"Invoice Submitted: <http://url_to_task|THX-1184>",
           //"pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
           "color":slackSettings.colors.green,
           "fields":[
              {
                 "title":"Invoice Paid",
                 "value":invNum+" by "+clientName,
                 "short":false
              },
              {
                "title":"Amount",
                "value":"$"+invTotal.toFixed(2),
                "short":true
             },
              {
                "title":"Method",
                "value":"Direct Debit",
                "short":true
             }
             
           ]
        }
     ]
  };
    // return json string of payload
    return JSON.stringify(payload)
  }

  
