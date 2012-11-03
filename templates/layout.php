<!DOCTYPE html>
<html>
<head>
<script src="/js/pushState.js"></script>
</head>
<body>
<h1>Site title</h1>
<div id="content">
<?= $content ?>
</div>
<p><cite>Site footer</cite></p>
<script>
var contentElement = document.getElementById('content');
var pushStateHandler = new PushState(contentElement);
pushStateHandler.bind();
</script>
</body>
</html>
