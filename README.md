# Deals-grid

Deals-grid is a Vue 3 application built with Vite. 
It displays a grid of financial deals with sorting, pagination, and data filtering features.
created as case study for interview task

## Demo
    https://midnightblue-pony-700464.hostingersite.com/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization](#customization)

## Features

- Displays a grid of deals with sortable columns
- Pagination with items-per-page options
- Filters for text searching deals
- Responsive design
- CSV exportable
- Display a rightpane with details
- Modular components for easy scalability

## Tech Stack

- **Vue 3**: The progressive JavaScript framework
- **Vite**: Fast and modern build tool for frontend development
- **SCSS**: For styling components
- **vitest**: For test unit

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.x)
- [npm](https://www.npmjs.com/)

### Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/dalaven/deals-grid.git
cd deals-grid
npm install
```
#### Run Development Server
To run the app locally:

```bash
npm run dev
```

The app will be available at http://localhost:5173/.

#### Build for Production
To build the project for production:
 
```bash
npm run build
```
The output will be in the dist directory.

#### Preview Production Build

To locally serve the production build:
```bash
npm run preview
```
## Project Structure
```bash
.
├── public              # Public assets
├── src
│   ├── assets          # Project-specific assets
│   ├── components      # Vue components
│   │   ├── __test__    # test files in vitest
│   │   ├── Datagrid    # Main component to generic Datagrid
│   │   └── icons       # svg icons
│   ├── views           # Views or pages
│   ├── App.vue         # Main application component
│   ├── main.js         # Project entry file
│   └── router.js       # Vue Router configuration
├── package.json        # Project metadata and dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation

```

## Customization

- To change styling, edit src/assets/styles or component-specific styles.
- To adjust pagination or sorting behavior, check out the logic in DataGrid.vue.


