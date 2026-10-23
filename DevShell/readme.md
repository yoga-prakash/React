# Programming Languages Explorer

A web application for exploring programming languages, understanding their characteristics, discovering career opportunities, and finding free learning resources.

## About the Project

Programming Languages Explorer brings together useful information about different programming languages and the subjects required to learn and work with them. Instead of searching across multiple websites, users can explore language-specific information and discover learning resources in one place.

## Features

<ul>
  <li><strong>Language Cards:</strong> Browse a collection of programming languages from the home page.</li>
  <li><strong>Language Details:</strong> Open an individual language page to explore its characteristics and learning requirements.</li>
  <li><strong>Language Information:</strong> View the first release year, execution model, and memory management approach.</li>
  <li><strong>IDE and Editor Recommendations:</strong> Discover development environments and editors suitable for each language.</li>
  <li><strong>Career Opportunities:</strong> Explore potential job roles associated with each programming language.</li>
  <li><strong>Knowledge Requirements:</strong> Learn which subjects and topics are relevant to a language and the depth at which they should be studied.</li>
  <li><strong>Free Learning Resources:</strong> Find recommended learning materials, practice platforms, and reference documentation.</li>
  <li><strong>Subject-Specific Resources:</strong> Discover learning and practice resources for subjects such as DSA, COA, OS, DPSD, and CN.</li>
</ul>

## What Can You Explore on Each Language Page?

When a user selects a programming language, its dedicated details page provides the following information.

<table>
  <thead>
    <tr>
      <th>Section</th>
      <th>What You Can Find</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Language Information</strong></td>
      <td>The language's first release year, execution model, and memory management approach.</td>
    </tr>
    <tr>
      <td><strong>IDEs and Editors</strong></td>
      <td>A list of integrated development environments and code editors that can be used to work with the language.</td>
    </tr>
    <tr>
      <td><strong>Career Opportunities</strong></td>
      <td>Potential roles, such as embedded systems engineer, firmware developer, or other language-relevant careers.</td>
    </tr>
    <tr>
      <td><strong>Knowledge Required</strong></td>
      <td>Relevant subjects, their topics, and the recommended depth of study for each subject.</td>
    </tr>
    <tr>
      <td><strong>Free Language Resources</strong></td>
      <td>A recommended free learning resource, a practice platform, and reference documentation, including links and explanations where available.</td>
    </tr>
    <tr>
      <td><strong>Subject Resources</strong></td>
      <td>Recommended learning materials and practice platforms for the subjects associated with the selected language.</td>
    </tr>
  </tbody>
</table>

## Understanding the Knowledge Requirements

Each language can have a set of subjects that help users understand its underlying concepts and practical applications.

Examples include:

<ul>
  <li><strong>DSA — Data Structures and Algorithms:</strong> Arrays, linked lists, trees, sorting, searching, and other algorithmic concepts.</li>
  <li><strong>COA — Computer Organization and Architecture:</strong> CPU structure, registers, memory hierarchy, and instruction execution.</li>
  <li><strong>DPSD — Digital Principles and System Design:</strong> Logic gates, Boolean algebra, adders, multiplexers, flip-flops, and counters.</li>
  <li><strong>OS — Operating Systems:</strong> Processes, threads, memory management, system calls, and file systems.</li>
  <li><strong>CN — Computer Networks:</strong> Networking fundamentals, sockets, and communication protocols.</li>
  <li><strong>DBMS — Database Management Systems:</strong> Database concepts and data management.</li>
  <li><strong>OOP — Object-Oriented Programming:</strong> Object-oriented concepts and design principles.</li>
</ul>

The subjects and topics displayed depend on the selected programming language. Each subject also has a recommended study depth, such as basic, intermediate, or in-depth.

## Learning Resources

The website organizes resources into two categories.

### Language-Specific Resources

Each language can provide:

<ul>
  <li><strong>Best Free Resource:</strong> A recommended learning resource with an explanation of why it is useful, where available.</li>
  <li><strong>Practice:</strong> A platform for solving exercises or gaining practical experience.</li>
  <li><strong>Reference:</strong> Documentation or other reference material for looking up language features.</li>
</ul>

### Subject-Specific Resources

For each relevant subject, users can discover:

<ul>
  <li>A recommended free learning resource.</li>
  <li>A platform or resource for practice.</li>
  <li>Links to the resources when URLs are provided.</li>
</ul>

## Technology Stack

<table>
  <thead>
    <tr>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>React</strong></td>
      <td>Building the user interface and reusable components.</td>
    </tr>
    <tr>
      <td><strong>TypeScript</strong></td>
      <td>Defining data types and improving type safety across the application.</td>
    </tr>
    <tr>
      <td><strong>React Router</strong></td>
      <td>Handling navigation between the language listing and individual language detail pages.</td>
    </tr>
    <tr>
      <td><strong>Vite</strong></td>
      <td>Frontend development tooling and build process.</td>
    </tr>
    <tr>
      <td><strong>Node.js</strong></td>
      <td>JavaScript runtime used by the backend tooling and server environment.</td>
    </tr>
    <tr>
      <td><strong>Express.js</strong></td>
      <td>Providing API endpoints for language listings and language-specific details.</td>
    </tr>
    <tr>
      <td><strong>Zod</strong></td>
      <td>Validating incoming language ID parameters in the backend.</td>
    </tr>
    <tr>
      <td><strong>JSON</strong></td>
      <td>Storing the language information and learning-resource data used by the application.</td>
    </tr>
  </tbody>
</table>

## How It Works

<ol>
  <li>The home page requests the available language cards from the Express API.</li>
  <li>The user selects a language card.</li>
  <li>React Router navigates to a URL containing the selected language ID, such as <code>/language/1</code>.</li>
  <li>The details page retrieves the ID using React Router's <code>useParams()</code> hook.</li>
  <li>The frontend requests the corresponding language details from the backend.</li>
  <li>The backend gathers the language information, language-specific resources, subject resources, and subject abbreviations.</li>
  <li>The frontend renders the returned data into separate sections, with links to external learning resources.</li>
</ol>

## API Endpoints

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>GET</code></td>
      <td><code>/languages</code></td>
      <td>Returns the language information required to display the cards.</td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/languages/:id</code></td>
      <td>Returns the selected language's details, language resources, subject resources, and subject abbreviations.</td>
    </tr>
  </tbody>
</table>

## Frontend Implementation

The frontend uses React components to separate the language listing from the language details.

The details component uses:

<ul>
  <li><code>useParams()</code> to retrieve the language ID from the URL.</li>
  <li><code>useState()</code> to manage the fetched data and error state.</li>
  <li><code>useEffect()</code> to fetch the details when the selected ID changes.</li>
  <li><code>fetch()</code> to communicate with the Express API.</li>
  <li><code>AbortController</code> to cancel an outdated or no-longer-needed request when the effect is cleaned up.</li>
  <li>TypeScript interfaces and types imported from a shared types file to describe the API response and its nested objects.</li>
</ul>

The interface displays a loading message while the request is in progress and an error message if the request fails.

## Project Data

The application uses JSON files to store the language information, recommended free resources, and subject-related learning materials. The Express backend processes this data and returns the information requested by the frontend.

This approach keeps the data separate from the UI and makes it easier to organize and update the content as the project grows.

## Getting Started

To run the project locally, make sure the required dependencies are installed.

<ol>
  <li>Clone the repository.</li>
  <li>Install the project dependencies.</li>
  <li>Start the Express backend on the configured API port.</li>
  <li>Start the frontend development server.</li>
  <li>Open the frontend URL in your browser and select a language card to explore its details.</li>
</ol>

The frontend must be configured to communicate with the backend at the correct API address. In the current development setup, the frontend requests data from <code>http://localhost:3000</code>.

Refer to the project's package scripts and configuration for the exact commands required to start each application.

## Future Improvements

Possible future enhancements include:

<ul>
  <li>Adding search and filtering for programming languages.</li>
  <li>Improving the presentation and navigation of learning resources.</li>
  <li>Expanding the language collection and subject coverage.</li>
  <li>Moving from JSON-based storage to a database as the dataset grows.</li>
  <li>Adding improved loading, error, and not-found states.</li>
</ul>

## Purpose

The goal of Programming Languages Explorer is to help learners understand not only what a programming language is, but also what they can build with it, what they should learn alongside it, and where they can find useful free resources to continue learning.
