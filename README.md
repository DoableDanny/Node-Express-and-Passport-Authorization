## Scripts

npm start (deployment)
npm run dev (development with nodemon)

## ejs Templating Engine

Put every line of javascript inside <% %>
e.g. <% errors.forEach(error => { %>
<% // some code... %>
<% >}) %>

To output something / a variable <%= %>
e.g. <%= error[0].msg %>
