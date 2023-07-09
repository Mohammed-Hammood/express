export const homePage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API for Mohammed's apps</title>
    <link  href="/static/main.css" rel='stylesheet' />
</head>
<body>
    <main>
        <h1>Endpoints</h1>
        <div class="notification" id="notification">Copied to clipboard</div>
        <div class="links">
            <span class="title">Images </span>
            <span class="endpoint">
                <a href="/api/images">api/images</a>
                <button onclick="copyEndpoint('/api/images')">copy</button>
            </span>
        </div>
        <div class="links">
            <span class="title">Events </span>
            <span class="endpoint">
                <a href="/api/events">api/events</a>
                <button onclick="copyEndpoint('/api/events')">copy</button>
            </span>
        </div>
    </main>
    <script>
        function copyEndpoint(endpoint){
            var url = window.location.origin + endpoint;
            navigator.clipboard.writeText(url);
            var notify = document.getElementById('notification');
            notify.style.opacity = "1";
            setTimeout(function(){
                notify.style.opacity = "0";
            }, 1000);
        }
    </script>
</body>
</html>`