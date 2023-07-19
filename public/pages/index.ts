export const homePage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API for Mohammed's apps</title>
    <link rel="icon" type="image/x-icon" href="https://icon-library.com/images/code-icon-png/code-icon-png-20.jpg" />
    <link  href="/static/main.css" rel='stylesheet' />
    <style>
    body {
        padding: 0;
        margin: 0;
        min-height: 100vmin;
        background-attachment: fixed;
        background: linear-gradient(to bottom, black, teal);
    }
    
    main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        color: white;
    }
    
    main .links {
        display: flex;
        gap: 10px;
        border: 1px solid teal;
        padding: 10px;
    }
    
    main .links .title {
        display: flex;
        align-items: center;
    }
    
    main .links span {
        display: flex;
        align-items: center;
    }
    
    main .links span a {
        text-decoration: none;
        color: white;
        padding: 5px;
        background: teal;
    }
    
    main .links span button {
        border: none;
        padding: 5px;
        height: 100%;
        cursor: pointer;
    }
    
    main .notification {
        opacity: 0;
        background: gold;
        height: 50px;
        color: red;
        display: flex;
        align-items: center;
        padding: 10px;
    }
    </style>
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
        <div class="links">
            <span class="title">Users </span>
            <span class="endpoint">
                <a href="/api/users">api/users</a>
                <button onclick="copyEndpoint('/api/users')">copy</button>
            </span>
        </div>

        <div>
            You can search for a specific user like /api/users?q=json
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