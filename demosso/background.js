chrome.runtime.onMessage.addListener(function (msg, sender) {
    if (msg.type == 'notification') {
        showNotification(msg.data.title, msg.data.message);
    } else if (msg.type == 'is_open_admin') {
        chrome.tabs.create({ url: 'https://' + msg.data, active: false });
    } else if (msg.type == 'lunch') {
        lunchMenu();
    }else if (msg.type == 'birthday') {
       birthdays();
    }else if (msg.type == 'pms') {
        chrome.tabs.create({ url: 'https://intranet.mind-infotech.com/mind/CreateAppUrl.aspx?app=pms' });
    }
    
});


function showNotification(title, message) {
    chrome.notifications.create('reminder', {
        type: 'basic',
        imageUrl: 'smg.png',
        title: title,
        message: message
    }, function (notificationId) { });
}

function lunchMenu() {
    var date = new Date();
    var dt=(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    var http = new XMLHttpRequest();
    let url = `https://intranet.mind-infotech.com/MIND/_api/web/lists/getbytitle('Menu')/Items?$filter=Display_x0020_Date eq '${dt}'&$orderby=Display_x0020_Date desc`;
    http.open('GET', encodeURI(url), true);
    http.setRequestHeader('Accept', 'application/json;odata=verbose');
    http.onreadystatechange = () => {
        if(http.readyState === 4) {
            if(http.status === 200) {
                try{
                    var res=JSON.parse(http.responseText);
                    if(res.d.results.length > 0){
                        var menu=res.d.results[0].Menu;
                        var menuList=[]; 
                        menu.split("</div>\n<div>").map((item)=>{
                            let i=extractContent(item);
                            menuList.push(i);
                        });
                        chrome.notifications.create('reminder', {
                            type: 'basic',
                            iconUrl: 'smg.png',
                            title: 'Today`s Lunch Menu',
                            message: menuList.join(", ")
                        }, function (notificationId) { });
                    }
                }catch(e){
                    console.log('lunch:err',e);
                }
            }
        }
    }
    http.send();
}

function extractContent(html) {
    return (new DOMParser).parseFromString(html, "text/html") . 
        documentElement . textContent;
}

function birthdays(){
    let urlBdy = `https://intranet.mind-infotech.com/MIND/Shared%20Documents/bday.xml`;
    let urlEmp =  `https://intranet.mind-infotech.com/MIND/Shared%20Documents/jday.xml`;
    let urlMrg =  `https://intranet.mind-infotech.com/MIND/Shared%20Documents/mday.xml`;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //Bithdays
    xhttp.open("GET", urlBdy, false);
    xhttp.send();
    xmlDoc = xhttp.responseXML;

    var x = xmlDoc.getElementsByTagName("EMP_NAME");
    var z = xmlDoc.getElementsByTagName("FLAG");
    var menuList=[];
    var eventList={'birthday':[],'belated':[],'join':[],'mrg':[]};
    for (i = 0; i < x.length; i++) {
        if(z[i].childNodes[0].nodeValue.trim()=='C')
        eventList['birthday'].push(x[i].childNodes[0].nodeValue);
        else
        eventList['belated'].push(x[i].childNodes[0].nodeValue);
    }
    if(eventList['birthday'].length==0){
        eventList['birthday'].push('No Birthday Today');
    }
    
    //Employee anniversary
    xhttp.open("GET", urlEmp, false);
    xhttp.send();
    xmlDoc = xhttp.responseXML;
    x = xmlDoc.getElementsByTagName("EMP_NAME");
    for (i = 0; i < x.length; i++) {
        eventList['join'].push(x[i].childNodes[0].nodeValue);
    }
    if(eventList['join'].length==0){
        eventList['join'].push('No Anniversary Today');
    }

    //Marriage anniversary
    xhttp.open("GET", urlMrg, false);
    xhttp.send();
    xmlDoc = xhttp.responseXML;
    x = xmlDoc.getElementsByTagName("EMP_NAME");
    for (i = 0; i < x.length; i++) {
        eventList['mrg'].push(x[i].childNodes[0].nodeValue);
    }
    if(eventList['mrg'].length==0){
        eventList['mrg'].push('No Anniversary Today');
    }

    Popup(eventList);
}


// chrome.alarms.create('PMS',{
//     when:Date.now()+10000
// });

// chrome.alarms.onAlarm.addListener(function(res){
//     if(res.name=='PMS'){

//     }
// });

function Popup(data) {
    var html=`
    <div class="list-type1">
    <ol>
        <li><b>Today's Birthdays</b>
        <ol> `;
    data.birthday.forEach(val => {
        html+=`<li><a href="#">${val}</a></li> `;
    });
    html+=` </ol></li> `;
    
    if(data.belated.length > 0){
    html+=`<li><b>Belated Birthdays</b>
    <ol> `;
    data.belated.forEach(val => {
        html+=`<li><a href="#">${val}</a></li> `;
    });
    html+=` </ol></li> `;
    }


    html+=`<li><b>Employee Anniversary </b>
    <ol> `;
    data.join.forEach(val => {
        html+=`<li><a href="#">${val}</a></li> `;
    });
    html+=` </ol></li> `;

    html+=`<li><b>Marriage Anniversary </b>
    <ol> `;
    data.mrg.forEach(val => {
        html+=`<li><a href="#">${val}</a></li> `;
    });
    html+=` </ol></li> `;
    html+=` </ol> </div>`;
    var mywindow = window.open('', 'Today`s Event', 'toolbar=yes,height=400,width=320,status=yes,scrollbars=yes,resizable=yes,top=100,left=750');
    mywindow.document.write(`<html><head><title>Today's Event</title>`);
    mywindow.document.write(`<style>
    .list-type1{
        width:250px;
        margin:0 auto;
        }
        
        .list-type1 ol{
        counter-reset: li;
        list-style: none;
        *list-style: decimal;
        font-size: 12px;
        font-family: "Times New Roman", Times, serif;
        padding: 0;
        margin-bottom: 4em;
        font-weight: bold;
        }
        .list-type1 ol ol{
        margin: 0 0 0 2em;
        }
        
        .list-type1 a{
        position: relative;
        display: block;
        padding: .4em .2em .2em 2em;
        *padding: .4em;
        margin: .5em 0;
        background: #f0554a;
        color:	#FFFFFF;
        text-decoration: none;
        -moz-border-radius: .3em;
        -webkit-border-radius: .3em;
        border-radius: 10em;
        transition: all .2s ease-in-out;
        }
        
        .list-type1 a:hover{
        background:#b30000;
        text-decoration:none;
        transform: scale(1.1);
        }
        
        .list-type1 a:before{
        content: counter(li);
        counter-increment: li;
        position: absolute;
        left: -1.3em;
        top: 50%;
        margin-top: -1.3em;
        background:#f0554a;
        height: 2em;
        width: 2em;
        line-height: 2em;
        border: .3em solid #fff;
        text-align: center;
        font-weight: bold;
        -moz-border-radius: 2em;
        -webkit-border-radius: 2em;
        border-radius: 2em;
        color:#FFF;
        }
     </style>`);
    mywindow.document.write('</head><body>');
    mywindow.document.write(html);
    mywindow.document.write('</body></html>');
    setTimeout(function(){
        mywindow.close();
    },15000);
    return true;
  }