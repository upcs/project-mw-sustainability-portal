  <html margin: 0;>
    
  <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <style>
    html, body {
          margin: 0;
      }
    </style>
  <div class="navbar">
    <a onclick="window.location.href='index.html'">HOME</a>
    <a onclick="window.location.href='mission.html'">MISSION</a>
    <form action="/projects" method="POST">
            <button class="button-as-link" type="submit">PROJECTS</button>
    </form>
    <a onclick="window.location.href='contactpage.html'">CONTACT</a>
    <a onclick="newProject()">NEW PROJECT</a>

    <div class="login">
      <a class="rightside" onclick="window.location.href='login.html'">Admin Login</a>
    </div>
  </div>
  </body>
</html>