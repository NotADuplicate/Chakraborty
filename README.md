# File Structure

Public: Contains everything on the frontend
-Main: The main page that shows when you load the site, contains all the tabs
-Form: Used for adding new rows to the sql table, accessed at /form/form.html
-PageForm: Used for adding new pages to link for news or anything else, accessed at /pageform/pageform.html
-Page: Displays a custom page that was created on the pageform of a given id. Accessed at /page/page.html?id=[id]
       -These pages can handle markdown formatting and the ids are sequential starting at 1

-Server: Handles requests made by the frontend
server.js: Handles the API requests and serves frontend pages
database.db: SQL data for the server to query

setup.js: Initializes the database. To add dummy data uncomment the function dummy data and tweak it to your preferences