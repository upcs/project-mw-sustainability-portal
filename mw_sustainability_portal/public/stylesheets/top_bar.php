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
    <a href="/">HOME</a>
    <a href="/mission">MISSION</a>
    <form action="/projects" method="POST">
            <button class="button-as-link" type="submit">PROJECTS</button>
    </form>
    <a href="/contact">CONTACT</a>
    <a onclick="newProject()">NEW PROJECT</a>

    <div class="login">
      <a class="rightside" href="/login_page">Admin Login</a>
    </div>
  </div>
  </body>
</html>