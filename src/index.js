var version = '1.0.3';

var Dedog = function(options){
    if(!options || !options.monitorId){
        console.warn('No monitorId');
    }
    this._monitorId = options.monitorId;
    this._serverUrl = '//dedog-report.futunn.com';
};
Dedog.version = Dedog.prototype.version = version;

var bindEvent = function(element, event, callback){
    if(event === 'load' && document.readyState === 'complete'){
        callback();
        return;
    }
    if(window.addEventListener){
        element.addEventListener(event,callback,false);
    }else if(window.attachEvent){
        element.attachEvent('on'+event,callback);
    }
};

// listen and report
Dedog.prototype.listen = function(data){
    // data.monitorId = data.monitorId || '400050';
    var uaParser = require('ua-parser-js');
    var userAgent = uaParser(navigator.userAgent);

    var deviceType = (userAgent.device.model && userAgent.device.vendor + ' ' + userAgent.device.model) ||
        userAgent.device.vendor || userAgent.device.type || userAgent.os.name;

    var errorData = {
        ua:navigator.userAgent,
        dev_type:deviceType,
        os_type:userAgent.os.name + ' ' + userAgent.os.version,
        monitorId:this._monitorId
    };
    bindEvent(window, 'error', function(error){
        errorData.url = location.href;
        errorData.msg = error.message;
        errorData.filename = error.filename;
        errorData.line = error.lineno;
        errorData.col = error.colno;
        errorData.stack = error.error && error.error.stack;
        var date = new Date();
        errorData.time = new Date(date.getTime() - date.getTimezoneOffset()*60*1000).toISOString().replace(/T/g,' ').replace(/\.\d+Z$/,'');
        console.log(errorData);
        bindEvent(window, 'load', report);
        /*throw new Error('[tool-dedog] error captured. Message:' + msg +
            ', url:' + url +
            ', line:' + line);*/
        //alert(msg+url+line);
    });
    var reportUrl = this._serverUrl;
    function report(){
        var IAMGE_ID = '__toolDedogBeaconImg';
        var reportImg = document.getElementById(IAMGE_ID);
        if(!reportImg){
            reportImg = new Image();
            reportImg.id = IAMGE_ID;
            reportImg.style.display = 'none';
            document.body.appendChild(reportImg);
        }
        reportImg.src = reportUrl+'?'+toQueryStr(errorData);
        function toQueryStr(obj){
            var ary = [];
            for(var item in obj){
                ary.push(item+'='+encodeURIComponent(obj[item]));
            }
            return ary.join('&');
        }
    }


};
module.exports = Dedog;
