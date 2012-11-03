# Push State example

Very basic example of Javascript history pushState using a simple PHP template system.

##### Example usage:

Remember to only send the relevant content for an AJAX request and the full template response for a regular HTTP request.

    var contentElement = document.getElementById('content');
    var pushStateHandler = new PushState(contentElement);
    pushStateHandler.bind();
