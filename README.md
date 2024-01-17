<h2 align=center>

## Technigo Web Development Bootcamp - FINAL PROJECT

<img src="frontend/public/assets/AirportFinder_transparent_orangedb.png" />
</h2>

For my final project I have built a search engine to search for details about airports around the world. IT has functionality to search for any airport in the world using search by: name, city, country and iata code. It uses 3 APIs I have created (2 with data I created) as well as several other external APIs. It uses Zustand for state management as well as several react libraries, including lottie animations, leaflet maps, pagination and flags. It has been created with responsiveness and accessibility in mind and includes user input and data validation on front and backends.

(See assignment requirements at the end of this readme)

### Technologies used

HTML5, CSS3, React, React Router, with Editor: VS Code

### React Libraries/Dependencies

<ins>zustand</ins>: for global state management

<ins>moment.js</ins>: for data and time

<ins>geolib</ins>: (https://github.com/manuelbieh/geolib) - to convert User IP address to latitude and longitude

<ins>intl.DisplayNames</ins>: for country names

<ins>Lottie files</ins>: animations for loading page animations

<ins>react-paginate</ins>: for pagination of country airport list

### API's

<ins>My Backend</ins>: My MongoDB Database has 3 collections for 3 datasets: airports, airlines and busiestairports.

1. My API for the main airport data: https://final-project-airportfinder.onrender.com/airports/

2. My API for airlines (dataset I created): https://final-project-airportfinder.onrender.com/airlines/

3. MY API from busiest airports (dataset I created): https://final-project-airportfinder.onrender.com/busiestairports/

<ins>Weather API</ins>: https://openweathermap.org - weather information for airport page

<ins>Pexel API</ins>: https://www.pexels.com/api/ - displays an image for each country (UPDATE: removed this component and replaced it with busiest airports information)

<ins>Flag API</ins>: https://flagsapi.com

<ins>Map API</ins>: Leaflet uses openstreetmap

<ins>Nearest airport data</ins>: Lufthansa API

<ins>Country search data</ins>: http://restcountries.com

<ins>Continent codes</ins>: created my own json file in data folder

### Resources

<ins>Logo</ins>: created using Canva and GIMP

<ins>Fonts</ins>: Bebas Neue (for logo), Montserrat, Poppins

<ins>Colour scheme</ins>:
<ins>Colour scheme</ins>:
white background: #fbfbfbfb
text dark blue: #363062
medium blue: #4D4C7D
orange: #F99417

### If I had more time...

Move json files to backend. Create sortable table functionality for every column in the airport country list.
Add city search.

### View it live

<ins>Frontend</ins>: https://airportfinder.netlify.app/

<ins>Backend</ins>: https://final-project-airportfinder.onrender.com/

### Responsiveness

Mobile view testing: Pixel 7 (412 x 915), iPhone 12 Pro (390 x 814)

Tablet view testing: Apple ipad mini

Desktop testing: chrome, safari, edge

### Screenshots

![Screenshot of App](/frontend/public/assets//screenshot1.png?raw=true "Screenshot of frontpage") 

![Screenshot of App](/frontend/public/assets//screenshot2.png?raw=true "Screenshot of IATA search ") 
![Screenshot of App](/frontend/public/assets//screenshot3.png?raw=true "Screenshot of IATA search lower page ") 
![Screenshot of App](/frontend/public/assets//screenshot4.png?raw=true "Screenshot of Country search ") 
![Screenshot of App](/frontend/public/assets//screenshot5.png?raw=true "Screenshot of Country search lower page ") 
![Screenshot of App](/frontend/public/assets//screenshot6.png?raw=true "Screenshot of Name/City search ") 
![Screenshot of App](/frontend/public/assets//screenshot7.png?raw=true "Screenshot of landing page validation ") 
![Screenshot of App](/frontend/public/assets//screenshot8.png?raw=true "Screenshot of landing page validation ") 

### Requirements

Minimal requirements:

<aside>
👾 **Technical requirements**

✓ Frontend in React

✓ Backend in Node.js

✓ MongoDB database

✓ Navigation using React Router

✓ Should work in Chrome, Firefox & Safari

✓ Be responsive and work well on mobile, tablet and desktop

✓ Follow the accessibility guidelines

</aside>

<aside>
🎨 **Visual requirements**

✓ Your application should have a clear structure, using the box model as a reference, with consistent margins/paddings.

✓ You should use consistent h1-h6 styles and sizes throughout your site and for multiple devices.

✓ You should use a colour scheme based on one or a few colours.

✓ You should have a design that can be adjusted to fit devices of all sizes. Remember that **58.43%** (Mar 2023) of all users will visit your page from a mobile device and that the page should therefore be optimised for these users too!

</aside>
