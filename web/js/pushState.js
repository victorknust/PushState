var PushState = function (contentElement) {
    // store a copy of this instance
    var instance = this;

    // store a copy of event handlers for when we unbind from the content element
    var previousClickHandlers;
    var previousPopStateHandler;

    // binds the click event for anchor elements
    this.bind = function () {
        // initialise class variables
        init();

        // find all anchor elements
        var anchorElements = contentElement.getElementsByTagName('a');
        for (var index in anchorElements) {
            // loop through to find each anchor element from array
            var anchorElement = anchorElements[index];
            // store back up of current click handling
            previousClickHandlers[index] = anchorElement.onclick;

            // handle anchor click event
            anchorElement.onclick = function (e) {
                var href = this.getAttribute('href');
                // anchor does not contain an href
                // run the previously stored click event instead
                if (! href) {
                    return previousClickHandlers[index].apply(anchorElement, e);
                }
                // if they are remote URLs ignore them
                if (href.match(/^\/\//) || href.match(/^[^:]+:\/\//)) {
                    return previousClickHandlers[index].apply(anchorElement, e);;
                }

                e.preventDefault();

                console.log('Redirect to', href);
                sendRequest(href);
            };
        };

        // keep a copy of current popstate event handling
        previousPopStateHandler = window.onpopstate;
        window.onpopstate = function (e) {
            if (e.state && e.state.content) {
                instance.unbind();
                contentElement.innerHTML = e.state.content;
                instance.bind();
            }
            else {
                sendRequest(document.location.pathname);
            }
        };

        return this;
    };

    // unbind content element - reset event handlers
    this.unbind = function () {
        var anchorElements = contentElement.getElementsByTagName('a');
        for (var index in anchorElements) {
            var anchorElement = anchorElements[index];
            anchorElement.onclick = previousClickHandlers[index];
        }

        window.onpopstate = previousPopStateHandler;

        return this;
    };

    function sendRequest(href) {
        // create an ajax request
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', href, true);
        // important header for server to identify if request is AJAX
        xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) {
                return;
            }
            if (xmlhttp.status != 200 && xmlhttp.status != 304) {
                console.log('HTTP error', xmlhttp.status);
            }

            // remove current bindings
            instance.unbind();
            // replace content
            contentElement.innerHTML = xmlhttp.responseText;
            // reinitialise bindings
            instance.bind();

            // add to the history states
            window.history.pushState({ content: xmlhttp.responseText }, href, href);
        };

        xmlhttp.send();
    }

    // initialise class variables
    function init() {
        previousClickHandlers = {};
        previousPopStateHandler = null;
    }
};
