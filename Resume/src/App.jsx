import { personalData, education, certifications, stack } from "./personalDetails.mjs";
import { projects } from "./personalProjects.mjs";
import parse from 'html-react-parser';
import { Fragment } from "react";

function Header({ name, phone, email, homeTown, github, linkedIn, intro }) {
  const githubText = github.split("//")[1];
  const linkedInText = linkedIn.split("www.")[1] ?? linkedIn.split("//")[1];
  // ?? is the nullish coalescing operator. It means: “use the left side, unless it’s null or undefined, in which case use the right side.”
  return (
    <header id="personal-data">
      <h1 className="heading" id="name">
        {name}
      </h1>
      <div className="contact-grid">
        <div>
          <strong>Phone:</strong> {phone}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>LinkedIn:</strong> <a href={linkedIn}>{linkedInText}</a>
        </div>
        <div>
          <strong>GitHub:</strong> <a href={github}>{githubText}</a>
        </div>
        <div>
          <strong>Hometown:</strong> {homeTown}
        </div>
      </div>

      <hr />

      <p>
        <h2 className="heading">Professional Summary</h2>
        {parse(intro)}
      </p>
    </header>
  );
};

function Skills() {
  return (
    <section id="skills">
      <ol>
        <li>
          <strong>Languages:</strong> {parse(stack.languages)}
        </li>
        <li>
          <strong>Frameworks:</strong> {parse(stack.frameworks)}
        </li>
        <li>
          <strong>Libraries:</strong> {parse(stack.libraries)}
        </li>
        <li>
          <strong>Tools:</strong> {parse(stack.tools)}
        </li>
        <li>
          <strong>Database and Runtime:</strong> {parse(stack.databaseAndRuntime)}
        </li>
      </ol>
    </section>
  );
};

function ProjectData({ id, name, stack, date, points, github }) {
  return (
    <section className={`project-block ${id === 4 ? "new-page" : ""}`}>
      <p className="project-header">
        <span>
          <strong>
            {id}. {name} ({date})
          </strong>{" "}
          | <em>{stack}</em>
        </span>
      </p>
      <ul className="project-lists">
        {points.map((projectPoints, i) => (
          <Fragment key={`point-${i}`}><li>{parse(projectPoints)}</li></Fragment>
        ))}
        {/* <>...</> will not accept any argument so we cannot use key there instead we use Fragment */}
      </ul>
      {github && (
        <p>
          GitHub: <a href={github}>{github}</a>
        </p>
      )}
    </section>
  );
}

function Education({ study, university, address, marks }) {
  return (
    <>
      <p>
        <strong>{study}</strong>
        <br />
        <span>
          {university} - {address}
        </span>
      </p>
      <p className="marks">
        <strong>{marks}</strong> <br />
      </p>
    </>
  );
};

function Certificates() {
  return (
    <section id="certificates">
      <ol>
        {certifications.map(certificateObject =>
          <li key={certificateObject.id}>{parse(certificateObject.certificate)} {certificateObject.link && parse(certificateObject.link)}</li>
        )}
      </ol>
    </section>
  );
};

function MainContent() {
  return (
    <main id="main-content">
      <h2 className="heading">SKILLS</h2>
      <Skills />

      <hr />

      <h2 className="heading">PROJECTS</h2>
      {projects.map((project) => (
        <ProjectData key={project.id} {...project} />
      ))}

      <hr />

      <h2 className="heading">EDUCATION</h2>
      <section id="education">
        {education.map((educ) => (
          <Education key={educ.id} {...educ} />
        ))}
      </section>

      <hr />

      <h2 className="heading">CERTIFICATIONS &amp; INVOLVEMENT</h2>
      <Certificates />
    </main>
  );
};

export default function App() {
  return (
    <>
      <Header {...personalData} />
      <hr />
      <MainContent />
    </>
  );
};