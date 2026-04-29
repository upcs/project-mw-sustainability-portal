# Malawi Sustainability Portal

The Malawi Sustainability project was proposed by the chief teacher, Hendrix Ngwira, at the Nkhorongo Community Day Secondary School in Malawi. The inspiration for the project came when reflecting on the sustainable development and upcycling activities that the students at this school have been working on. With the scarcity of resources and their innovative use of these resources, the students are seeking a way to share their sustainable development projects across Malawi and globally; to promote similar projects.

## Overview

We developed a website so that admin can upload a photo and writings about student’s projects. This will be a centralized hub that allows for global recognition of student’s work.

This personalized platform will give the Nkhorongo community an opportunity to spread sustainable design concepts around the globe. 
Our website is unique to Nkhorongo because it was created by a team of passionate students and can be improved upon by future Software Engineering teams, with an overall aim to support the mission of sustainability. 

This is a website that Malawi will be able to host locally with a simple interface that offers school administrators full control over the projects they share with the world.

## Features

### School administrator(s) contact information 
- List of all student sustainability projects; clicking one will navigate to its respective page 
- Admin login button, authentication fields 
- Admin site options available once logged in
Website Home Page

### Individual project pages
- All posted content pertaining to the project, including photos or other media, articles, timelines/updates, and potential merchandise (only images implemented)
- Button to navigate back to home page 
- Contact information for admin/teacher in charge of that project (not implemented)

### Administrator account (No edit functionality)
- Can post and edit all types of content about each student sustainability project 
- Can add or remove student project pages 
- Can edit/update site contact information 
- Only one univeral admin account

## Project Extensions

### Editability:
- edit project descriptions 
- edit project media
- edit contact page
- edit staff directory page

### Video Embed:
- embed videos about projects from 3rd party site 
- multiple videos per page?

### Admin Pages:
- hide admin pages for non-admin users
- make login button turn into logout button

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- Templating: EJS (Embedded JavaScript Templates)
- Testing: Jest (or similar JS testing framework)
- Other: File-based assets and custom script

## Project Structure

```
project-mw-sustainability-portal-main/
│
├── public/                 # Static frontend assets
│   ├── assets/             # Project descriptions by category
│   ├── images/             # Images and media files
│   ├── javascripts/        # Client-side JavaScript
│   ├── stylesheets/        # CSS styles
│   └── index.html          # Static entry page
│
├── routes/                 # Express route handlers
│   ├── index.js
│   ├── projects.js
│   ├── login_page.js
│   ├── upload_new_proj.js
│   ├── delete_proj.js
│   └── ...
│
├── views/                  # EJS templates (server-rendered pages)
│   ├── index.ejs
│   ├── projects_list.ejs
│   ├── project_page.ejs
│   ├── login_page.ejs
│   ├── partials/           # Reusable UI components
│   └── ...
│
├── tests/                  # Automated tests
│   ├── *.test.js
│   └── ...
│
└── README.md

```

## Getting Started
1. Clone the repository
```
git clone https://github.com/upcs/project-mw-sustainability-portal 
cd project-mw-sustainability-portal-main
```
2. Install dependencies
```
npm install
```
3. Run the application
```
npm start
```
4. Open in browser
http://localhost:3000

## Testing

Run tests with:
```
npm test
```

## Usage

Open the homepage
Navigate through different pages
Explore sustainability projects

## License

This project is licensed under the MIT License.

## Authors

Landon Harrison @LandonJHarr37 (harrisol27@up.edu)
Josie Nuxoll @Nux28 (nuxoll28@up.edu)
Megan Ou @megan-ou (ou27@up.edu)
Clint Sizemore @ClintSizemore (sizemore28@up.edu)

For questions or feedback, please open an issue in this repository.
