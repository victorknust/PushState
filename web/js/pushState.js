var PushState = function (contentElement) {
    var instance = this;
    var previousClickHandlers;
    var previousPopStateHandler;

    this.bind = function () {
        init();

        var anchorElements = contentElement.getElementsByTagName('a');
        for (var index in anchorElements) {
            var anchorElement = anchorElements[index];
            previousClickHandlers[index] = anchorElement.onclick;

            anchorElement.onclick = function (e) {
                var href = this.getAttribute('href');
                if (! href) {
                    return;		
                }
                e.preventDefault();

                console.log('Redirect to', href);
                window.history.pushState(null, 'link-' + index, href);

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('GET', href, true);
                xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState != 4) {
                        return;
                    }
                    if (xmlhttp.status != 200 && xmlhttp.status != 304) {
                        console.log('HTTP error', xmlhttp.status);
                    }

                    contentElement.innerHTML = xmlhttp.responseText;
                    instance.unbind().bind();
                };
                xmlhttp.send();
            };

            return this;
        }

        previousPopStateHandler = window.onpopstate;
        window.onpopstate = function (e) {
            console.log(e);
        };
    };

    this.unbind = function () {
        var anchorElements = contentElement.getElementsByTagName('a');
        for (var index in anchorElements) {
            var anchorElement = anchorElements[index];
            anchorElement.onclick = previousClickHandlers[index];
        }

        return this;
    };

    function init() {
        previousClickHandlers = {};
        previousPopStateHandler = null;
    }

    init();
};
