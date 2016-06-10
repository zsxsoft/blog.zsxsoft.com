{/*
    let _XMLHttpRequest = window.XMLHttpRequest;
    XMLHttpRequest = function() {
        let xhr = new _XMLHttpRequest();
        let _open = xhr.open;
        xhr.open = function() {
            debugger;
            let argu = Array.from(arguments);
            let url = argu[1];
            if (/^http/.test(url) && location.host.indexOf(url) < 0) {
                argu[1] = location.origin + window.config.bridge + "?arguments=" + encodeURIComponent(url);
            } 
            return _open.apply(this, argu);
        }

        return xhr;
    }*/
}