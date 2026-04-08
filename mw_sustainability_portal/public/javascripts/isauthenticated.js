/**
 *  isauthenticated is called by the router every time 
 *  you try to access an admin page
 *  server side
 */

function isauthenticated()
{
    //does the user have an admin session object?
    session = true;
    if(session)
    {
        console.log("authentication successful");
        //next();
        return true;
    }
    else
    {
        //if not logged in, redirect to authentication failed page??
        return false;
    }
}