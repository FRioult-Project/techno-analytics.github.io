(function(exports){
    var MAX_INT = 2147483647;
    var timeouts = {};
    var index = 1;

    // Set new timeout
    var set = function(callback, timeout){
        var id = index++;
        if(timeout > MAX_INT){
            timeouts[id] = setTimeout(set.bind(undefined, callback, timeout - MAX_INT), MAX_INT);
        }else{
            if(timeout < 0) timeout = 0;
            timeouts[id] = setTimeout(function(){
                delete timeouts[id];
                callback();
            }, timeout);
        }
        return id;
    };

    // Clear existing timeout
    var clear = function(id){
        if(timeouts.hasOwnProperty(id)){
            clearTimeout(timeouts[id]);
            delete timeouts[id];
        }
    };

    // Expose public interface
    exports.set = set;
    exports.clear = clear;
    exports._timeouts = timeouts;

})(typeof module === 'undefined' && typeof exports === 'undefined'? this.timeout = {} : exports);