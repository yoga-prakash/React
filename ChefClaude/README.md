<h1>Chef Claude</h1>
<p>Chef Claude is a small React app where you list the ingredients you have at home and get a recipe suggestion based on them. It is a practice project built with React and Vite.</p>
<blockquote><b>Project status:</b> work in progress. The UI and state handling are done, but the recipe shown is currently <b>hardcoded</b> (a sample Beef Bolognese Pasta). Connecting a real AI API is planned. See the Roadmap below.</blockquote>
<h2>Features (current)</h2>
<ul>
<li>Add ingredients through a form. Each one is capitalized automatically.</li>
<li>Ingredients are shown as a list and stored in React state.</li>
<li>A "Get a recipe" section appears once you have <b>4 or more</b> ingredients.</li>
<li>Clicking "Get a recipe" shows a recipe card (currently a static sample).</li>
</ul>
<h2>Tech stack</h2>
<ul>
<li><a href="https://react.dev/">React</a></li>
<li><a href="https://vitejs.dev/">Vite</a></li>
<li>Plain CSS (<code>App.css</code>)</li>
</ul>
<h2>Getting started</h2>
<p>Make sure you have <a href="https://nodejs.org/">Node.js</a> installed, then run:</p>
<pre><code># install dependencies
npm install
# start the dev server
npm run dev</code></pre>
<p>Open the local URL that Vite prints in the terminal (usually <code>http://localhost:5173</code>).</p>
<p>Other scripts:</p>
<pre><code>npm run build     # create a production build
npm run preview   # preview the production build locally</code></pre>
<h2>Project structure</h2>
<pre><code>src/
├── App.jsx              # Root component: Header + MainComponent
├── App.css              # Styles
├── Header.jsx           # App title and logo
├── MainComponent.jsx    # Holds state; ingredient form and page logic
├── IngredientList.jsx   # Displays the list of added ingredients
├── GetRecipe.jsx        # "Ready for a recipe?" banner with the button
└── ClaudeRecipe.jsx     # Recipe card (hardcoded for now)
public/
└── chef-claude-icon.png # Logo used in the header</code></pre>
<h2>How it works</h2>
<ol>
<li><code>MainComponent</code> keeps two pieces of state: the <code>ingredients</code> array and an <code>isShown</code> flag.</li>
<li>Submitting the form calls <code>handleForm</code>, which reads the input from <code>formData</code>, capitalizes it, and adds it to the <code>ingredients</code> array.</li>
<li>Once the list has 4 or more items, <code>GetRecipe</code> is rendered.</li>
<li>Clicking its button sets <code>isShown</code> to <code>true</code>, which renders <code>ClaudeRecipe</code>.</li>
</ol>
<h2>Roadmap</h2>
<p>These are things I plan to add as I learn more React:</p>
<ul>
<li>☐ <b>Scroll to the recipe</b> after clicking "Get a recipe" (using <code>useRef</code> and <code>scrollIntoView</code>)</li>
<li>☐ <b><code>useEffect</code></b> for cleaner side effects, such as scrolling once the recipe appears</li>
<li>☐ <b>Connect a real AI API</b> to generate recipes from the ingredient list, instead of the hardcoded sample
<ul>
<li>The API call should go through a small backend or serverless function so the API key is never exposed in the browser</li>
<li>API keys will be stored in a <code>.env</code> file (never committed to Git)</li>
</ul>
</li>
<li>☐ <b>Render the AI response as markdown</b> (for example with <code>react-markdown</code>)</li>
<li>☐ <b>Loading and error states</b> while the recipe is being fetched</li>
<li>☐ Remove individual ingredients from the list</li>
<li>☐ Prevent duplicate ingredients</li>
</ul>
<h2>Notes</h2>
<ul>
<li>The sample recipe in <code>ClaudeRecipe.jsx</code> is placeholder content and does not depend on the ingredients you enter yet.</li>
<li>Do not commit <code>.env</code> files or API keys. Make sure <code>.env</code> is listed in <code>.gitignore</code>.</li>
</ul>