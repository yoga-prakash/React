## Setup

`src/personalDetails.mjs` is gitignored, so create it yourself.

**src/personalDetails.mjs** (named exports `personalData` and `education`):

- `personalData`: an object with string keys `name`, `phone`, `email`, `homeTown`, `github`, `linkedIn` (the `github` and `linkedIn` values must be full URLs, e.g. `https://github.com/you`).
- `education`: an array of objects, each with `id` (number) and strings `study`, `university`, `address`, `marks`.

**src/personalProjects.mjs** (named export `projects`): an array of objects, each with:

- `id` (number)
- `name`, `stack` (comma-separated), `date` (e.g. "August 2026"), `github` (can be `""`), all strings
- `points`: an array of HTML strings, each wrapped in `<li>`, for example
  `` `<li>Built a <strong>REST</strong> API.</li>` ``
