const projects = [
  {
    slug: "multi-digit-recognition",
    title: "Multi Digit Recognition",
    year: "AI GUI",
    description:
      "AI GUI app recognizing handwritten multi-digit numbers using CNN and OpenCV with a real-time drawing interface.",
    github: "https://github.com/Ashmeet04Singh/multi_digit_recognition",
    tech: ["Python", "CNN", "OpenCV", "Tkinter", "TensorFlow"],
    category: "AI/ML",
    impact: 96,
    problem:
      "Handwritten digit demos often stop at one number. This project explores a fuller multi-digit recognition flow with drawing input, preprocessing, and prediction feedback.",
    decisions: [
      "Use OpenCV preprocessing to normalize canvas strokes before inference.",
      "Keep the GUI lightweight with Tkinter so the model workflow stays easy to demo.",
      "Separate drawing, prediction, and output concerns for a cleaner future web port."
    ],
    outcomes: ["Real-time drawing flow", "CNN-powered recognition", "Portfolio-ready AI demo"]
  },
  {
    slug: "ai-chess-game",
    title: "AI Chess Game",
    year: "Game AI",
    description:
      "Intelligent chess game with an AI opponent using Python and Pygame, featuring move validation and checkmate logic.",
    github: "https://github.com/Ashmeet04Singh/chess-pygame",
    tech: ["Python", "Pygame", "AI", "Game Dev"],
    category: "Interactive",
    impact: 86,
    problem:
      "A chess project needs reliable state handling before AI feels believable. The focus here is valid moves, turn flow, and playable feedback.",
    decisions: [
      "Model board state explicitly before rendering.",
      "Prioritize legal move validation and game-end states.",
      "Use Pygame for immediate visual feedback and keyboard-friendly iteration."
    ],
    outcomes: ["Playable AI opponent", "Move validation", "Checkmate logic"]
  },
  {
    slug: "fruit-recognition-app",
    title: "Fruit Recognition App",
    year: "95% Accuracy",
    description:
      "Real-time fruit classifier using image classification that identifies fruit types via GUI or webcam with 95% accuracy.",
    github: "https://github.com/Ashmeet04Singh/Fruit_Recognition_App",
    tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
    category: "AI/ML",
    impact: 98,
    problem:
      "The classifier turns camera input into a fast prediction workflow, making model behavior easier to evaluate and explain.",
    decisions: [
      "Use OpenCV for frame capture and preprocessing.",
      "Keep the model path focused on CNN-based image classification.",
      "Surface confidence and classification output in a direct GUI workflow."
    ],
    outcomes: ["95% reported accuracy", "Webcam classification", "Clear model demo"]
  },
  {
    slug: "patient-management-system",
    title: "Patient Management System",
    year: "Full Stack",
    description:
      "Full-stack hospital management platform with Flask, PostgreSQL, and Bootstrap featuring CRUD operations and user roles.",
    github: "https://github.com/Ashmeet04Singh/patient-management-web",
    tech: ["Flask", "PostgreSQL", "Bootstrap", "Python", "REST API"],
    category: "Web",
    impact: 90,
    problem:
      "Hospital workflows need dependable data entry, lookup, and role-aware actions. This project focuses on practical CRUD and backend structure.",
    decisions: [
      "Use Flask routes for clear request handling.",
      "Persist records in PostgreSQL for relational data modeling practice.",
      "Structure UI around repeatable patient-management tasks."
    ],
    outcomes: ["CRUD operations", "User roles", "Database-backed workflow"]
  },
  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    year: "Data App",
    description:
      "Intelligent web app that recommends movies based on user preferences using collaborative and content-based filtering.",
    github: "https://github.com/Ashmeet04Singh/Movie-Recommendation-Sytem.git",
    tech: ["Python", "Machine Learning", "Flask", "Data Science", "Pandas"],
    category: "Data",
    impact: 84,
    problem:
      "Recommendation projects are strongest when the reasoning is inspectable. This app frames preferences into ranked movie suggestions.",
    decisions: [
      "Combine content signals with collaborative recommendation ideas.",
      "Use Pandas for data preparation and feature handling.",
      "Expose the recommender through a Flask web interface."
    ],
    outcomes: ["Preference-based output", "Data processing flow", "Web app wrapper"]
  },
  {
    slug: "math-jarvis",
    title: "MATH_JARVIS",
    year: "AI Assistant",
    description:
      "Advanced AI-powered math assistant with conversational capabilities, GUI, and complex problem-solving using SymPy.",
    github: "https://github.com/Ashmeet04Singh/MATH_JARVIS",
    tech: ["Python", "Tkinter", "AI/LLM", "SymPy", "Calculus"],
    category: "AI/ML",
    impact: 88,
    problem:
      "Math tools should show the path, not only the result. MATH_JARVIS explores conversational help for symbolic and calculus-style problems.",
    decisions: [
      "Use SymPy for symbolic math rather than ad hoc parsing.",
      "Keep an approachable desktop GUI for repeated problem solving.",
      "Design the assistant around explanation and iteration."
    ],
    outcomes: ["Conversational interface", "SymPy-backed solving", "Calculus support"]
  }
];

const certifications = [
  {
    title: "Generative AI Foundations",
    date: "14th July 2025",
    image: "../../legacy/images/genai_certificate.png",
    pdf: "../../legacy/certificates/Generative AI Foundations Certificate Program.pdf",
    description:
      "Completed a comprehensive course on fundamentals of Generative AI, including GPT models and applications.",
    tech: ["Generative AI", "Deep Learning", "Transformers"]
  },
  {
    title: "Power BI Basic Course",
    date: "31st July 2025",
    image: "../../legacy/images/powerbi_certificate.png",
    pdf: "../../legacy/certificates/certificate (1).pdf",
    description:
      "Covered Power BI fundamentals including data visualization, dashboard creation, and DAX formulas.",
    tech: ["Power BI", "Data Visualization", "Dashboard"]
  },
  {
    title: "IBM Python for Data Science",
    date: "2025",
    image: "../../legacy/images/ibm_certificate.png",
    pdf: "../../legacy/certificates/IBM Certificate.pdf",
    description:
      "Covered Python basics, data analysis, visualization, and machine learning fundamentals for data science.",
    tech: ["Python", "Data Science", "IBM", "Data Analysis"]
  }
];

const skills = {
  "Core engineering": ["Python", "C++", "SQL", "Flask", "REST APIs", "MySQL", "PostgreSQL"],
  "AI and data": ["TensorFlow", "OpenCV", "CNN", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "SymPy"],
  "Interfaces": ["HTML", "CSS", "JavaScript", "Tkinter", "Pygame", "Bootstrap"],
  "Workflow": ["Git", "GitHub", "VS Code", "Problem Solving"]
};

const routes = ["home", "about", "projects", "resume", "certifications", "contact"];
const app = document.querySelector("#app");
const toast = document.querySelector(".toast");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");

let activeTag = "All";
let searchTerm = "";
let sortMode = "newest";

function icon(name) {
  const paths = {
    arrow:
      '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    back:
      '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
    download:
      '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    github:
      '<path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7 0-1.5-.5-2.7-1.4-3.7.1-.4.6-1.9-.1-3.7 0 0-1.1-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.3 1.1 4.2 1.5 4.2 1.5c-.7 1.8-.2 3.3-.1 3.7A5.2 5.2 0 0 0 2.7 9c0 5.1 3.1 6.3 6.1 6.7a3.4 3.4 0 0 0-1 2.6V22"/><path d="M9 18c-3 .9-4.7-.7-5.4-2.1"/>',
    mail:
      '<path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/>',
    close:
      '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    external:
      '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v7H3V3h7"/>'
  };

  return `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function render(options = {}) {
  const { route, slug } = currentRoute();
  setActiveNav(route);

  if (route === "about") app.innerHTML = renderAbout();
  else if (route === "projects") app.innerHTML = renderProjects();
  else if (route === "project") app.innerHTML = renderProjectDetail(slug);
  else if (route === "resume") app.innerHTML = renderResume();
  else if (route === "certifications") app.innerHTML = renderCertifications();
  else if (route === "contact") app.innerHTML = renderContact();
  else app.innerHTML = renderHome();

  bindPageEvents(route);
  if (!options.keepFocus) {
    document.querySelector("#main").focus({ preventScroll: true });
  }
}

function currentRoute() {
  const hash = window.location.hash.replace("#", "") || "home";
  if (hash.startsWith("project/")) return { route: "project", slug: hash.split("/")[1] };
  return { route: routes.includes(hash) ? hash : "home" };
}

function setActiveNav(route) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkRoute = link.dataset.route;
    link.classList.toggle("active", route === linkRoute || (route === "project" && linkRoute === "projects"));
  });
}

function tabs(active) {
  return `<div class="route-tabs" aria-label="Prototype screens">
    ${routes
      .map(
        (route) =>
          `<a class="route-tab ${active === route ? "active" : ""}" href="#${route}">${routeLabel(route)}</a>`
      )
      .join("")}
  </div>`;
}

function routeLabel(route) {
  return route === "certifications" ? "Certs" : route[0].toUpperCase() + route.slice(1);
}

function renderHome() {
  return `<section class="page">
    ${tabs("home")}
    <div class="hero">
      <div class="panel hero-copy">
        <h1 class="hero-title">Ashmeet Singh builds <span>AI-ready</span> software tools.</h1>
        <p class="lead">Computer Science undergraduate focused on Python, backend engineering, data systems, and practical AI interfaces.</p>
        <div class="hero-actions">
          <a class="button" href="#projects">View projects ${icon("arrow")}</a>
          <a class="button secondary" href="#resume">Resume ${icon("download")}</a>
          <a class="button ghost" href="#contact">Contact</a>
        </div>
        <div class="hero-proof" aria-label="Portfolio highlights">
          <div class="stat"><strong>6</strong><span>Featured builds</span></div>
          <div class="stat"><strong>AI/ML</strong><span>Primary focus</span></div>
          <div class="stat"><strong>GTBIT</strong><span>B.Tech CSE</span></div>
        </div>
      </div>

      <aside class="panel hero-console" aria-label="Technical profile preview">
        <div class="console-top">
          <div class="window-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span class="console-label">profile.ts</span>
        </div>
        <div class="console-body">
          <div class="code-card">
            <pre><code>const ashmeet = {
  focus: ["AI/ML", "Backend", "Data"],
  languages: ["Python", "C++", "SQL"],
  tools: ["Flask", "OpenCV", "TensorFlow"],
  currentGoal: "Production Next.js portfolio"
};</code></pre>
          </div>
          <div class="skill-rail">
            ${Object.values(skills)
              .flat()
              .slice(0, 15)
              .map((skill) => `<span class="chip">${skill}</span>`)
              .join("")}
          </div>
        </div>
      </aside>
    </div>

    <section class="section">
      <div class="section-head">
        <div>
          <h2 class="section-title">Selected work</h2>
          <p class="section-copy">A tighter first look at the projects most relevant to recruiters and technical reviewers.</p>
        </div>
        <a class="button secondary" href="#projects">All projects ${icon("arrow")}</a>
      </div>
      <div class="grid cols-3">
        ${projects
          .slice(0, 3)
          .map((project) => projectCard(project, true))
          .join("")}
      </div>
    </section>
  </section>`;
}

function renderAbout() {
  return `<section class="page">
    ${tabs("about")}
    <div class="section-head">
      <div>
        <h1 class="section-title">About Ashmeet</h1>
        <p class="section-copy">Education, technical direction, and the strengths behind the project work.</p>
      </div>
    </div>

    <div class="profile-layout">
      <article class="panel text-block">
        <p>I'm <strong>Ashmeet Singh</strong>, a Computer Science undergraduate focused on software development, databases, and backend engineering. I'm skilled in Python, C++, SQL, Flask, and MySQL, with experience building applications involving CRUD systems, authentication, and data processing.</p>
        <p>Currently, I'm pursuing my <strong>Bachelor of Technology in Computer Science and Engineering</strong> at <strong>Guru Tegh Bahadur Institute of Technology (GTBIT)</strong> in Delhi, where I'm actively engaging in Object Oriented Programming, DBMS, Computer Networks, and Applied Mathematics.</p>
        <p>My technical interests span AI, web applications, and interactive tools. I'm driven by learning, coding, and creating solutions that bridge education and technology through practical programming.</p>
      </article>

      <aside class="subtle-panel text-block">
        <h2 class="section-title">Focus areas</h2>
        <div class="timeline" style="margin-top: 18px">
          <div class="timeline-item"><time>Now</time><div><strong>AI and web tooling</strong><span>Interfaces for model demos, recommendation systems, and education tools.</span></div></div>
          <div class="timeline-item"><time>Study</time><div><strong>B.Tech CSE</strong><span>GTBIT Delhi with coursework across OOP, DBMS, networks, and applied math.</span></div></div>
          <div class="timeline-item"><time>Build</time><div><strong>Backend and data systems</strong><span>Flask, SQL databases, CRUD flows, and structured data processing.</span></div></div>
        </div>
      </aside>
    </div>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Technical stack</h2>
      </div>
      <div class="grid cols-2">
        ${Object.entries(skills)
          .map(
            ([group, items]) =>
              `<div class="card"><h3>${group}</h3><div class="skill-rail">${items
                .map((item) => `<span class="chip">${item}</span>`)
                .join("")}</div></div>`
          )
          .join("")}
      </div>
    </section>
  </section>`;
}

function renderProjects() {
  const allTags = ["All", ...new Set(projects.map((project) => project.category))];
  const filtered = getFilteredProjects();

  return `<section class="page">
    ${tabs("projects")}
    <div class="section-head">
      <div>
        <h1 class="section-title">Projects</h1>
        <p class="section-copy">AI, backend, data, and interactive builds with clear stack and outcome signals.</p>
      </div>
      <a class="button secondary" href="https://github.com/Ashmeet04Singh" target="_blank" rel="noreferrer">GitHub ${icon("external")}</a>
    </div>

    <div class="filter-bar" role="search">
      <label class="field">
        <span>Search projects</span>
        <input class="input" id="projectSearch" type="search" value="${escapeHtml(searchTerm)}" placeholder="Try Python, Flask, OpenCV" />
      </label>
      <label class="field">
        <span>Sort</span>
        <select class="select" id="projectSort">
          <option value="newest" ${sortMode === "newest" ? "selected" : ""}>Newest first</option>
          <option value="impact" ${sortMode === "impact" ? "selected" : ""}>Most impactful</option>
        </select>
      </label>
    </div>

    <div class="filter-row" aria-label="Project categories">
      ${allTags
        .map(
          (tag) =>
            `<button class="filter-chip ${tag === activeTag ? "active" : ""}" type="button" data-tag="${tag}">${tag}</button>`
        )
        .join("")}
    </div>

    ${
      filtered.length
        ? `<div class="grid cols-3">${filtered.map((project) => projectCard(project)).join("")}</div>`
        : `<div class="subtle-panel project-empty"><strong>No projects found.</strong><p class="muted">Try another keyword or category.</p></div>`
    }
  </section>`;
}

function renderProjectDetail(slug) {
  const project = projects.find((item) => item.slug === slug) || projects[0];

  return `<section class="page">
    ${tabs("projects")}
    <a class="button ghost" href="#projects" style="margin-bottom: 18px">${icon("back")} Back to projects</a>
    <div class="detail-layout">
      <article class="panel text-block">
        <p class="project-meta">${project.year} / ${project.category}</p>
        <h1 class="hero-title" style="font-size: clamp(2.6rem, 6vw, 5rem)">${project.title}</h1>
        <p class="lead">${project.description}</p>
        <div class="hero-actions">
          <a class="button" href="${project.github}" target="_blank" rel="noreferrer">View GitHub ${icon("github")}</a>
          <a class="button secondary" href="#contact">Discuss project</a>
        </div>
      </article>

      <aside class="subtle-panel text-block">
        <h2 class="section-title">Stack</h2>
        <div class="skill-rail">${project.tech.map((tech) => `<span class="chip accent">${tech}</span>`).join("")}</div>
        <div class="architecture" aria-label="Project architecture">
          <span>Input</span>
          <span>Processing</span>
          <span>Model or Logic</span>
          <span>Interface</span>
        </div>
      </aside>
    </div>

    <section class="section grid cols-3">
      <div class="card"><h2>Problem</h2><p>${project.problem}</p></div>
      <div class="card"><h2>Decisions</h2>${project.decisions.map((item) => `<p>${item}</p>`).join("")}</div>
      <div class="card"><h2>Outcomes</h2><div class="skill-rail">${project.outcomes.map((item) => `<span class="chip">${item}</span>`).join("")}</div></div>
    </section>
  </section>`;
}

function renderResume() {
  return `<section class="page">
    ${tabs("resume")}
    <div class="resume-layout">
      <article class="panel text-block">
        <h1 class="section-title">Resume</h1>
        <p class="lead">A concise mirror of education, selected projects, and technical tools for quick review.</p>
        <div class="hero-actions">
          <button class="button" type="button" data-toast="Resume PDF will be added to the production build.">${icon("download")} Download resume</button>
          <a class="button secondary" href="#contact">Contact Ashmeet</a>
        </div>
        <div class="screen-note">Availability: open to software engineering, AI tooling, backend, and data-focused opportunities.</div>
      </article>

      <aside class="panel resume-panel" aria-label="Resume preview">
        <div class="resume-preview">
          <h3>Ashmeet Singh</h3>
          <p>Computer Science undergraduate focused on Python, Flask, SQL, AI/ML, and data-driven applications.</p>
          <h4>Education</h4>
          <p>B.Tech in Computer Science and Engineering, GTBIT Delhi.</p>
          <h4>Selected Projects</h4>
          <ul>
            <li>Multi Digit Recognition - CNN, OpenCV, Tkinter.</li>
            <li>Patient Management System - Flask, PostgreSQL, REST API.</li>
            <li>Fruit Recognition App - TensorFlow, OpenCV, CNN.</li>
          </ul>
          <h4>Skills</h4>
          <p>Python, C++, SQL, Flask, MySQL, PostgreSQL, TensorFlow, OpenCV, Pandas, Git.</p>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderCertifications() {
  return `<section class="page">
    ${tabs("certifications")}
    <div class="section-head">
      <div>
        <h1 class="section-title">Certifications</h1>
        <p class="section-copy">Verified learning across AI foundations, data visualization, and Python for data science.</p>
      </div>
    </div>

    <div class="grid cols-3">
      ${certifications
        .map(
          (cert, index) =>
            `<article class="card certificate-card">
              <button class="certificate-thumb" type="button" data-cert="${index}" aria-label="Preview ${cert.title}">
                <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
              </button>
              <div>
                <h2>${cert.title}</h2>
                <p class="project-meta">${cert.date}</p>
                <p>${cert.description}</p>
                <div class="project-tags">${cert.tech.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>
                <div class="card-actions">
                  <button class="button secondary" type="button" data-cert="${index}">Preview</button>
                  <a class="button ghost" href="${cert.pdf}" target="_blank" rel="noreferrer">PDF ${icon("external")}</a>
                </div>
              </div>
            </article>`
        )
        .join("")}
    </div>
    <div class="modal" id="certModal" role="dialog" aria-modal="true" aria-labelledby="certModalTitle">
      <div class="modal-inner">
        <div class="modal-head">
          <h3 id="certModalTitle"></h3>
          <button class="icon-link" type="button" data-close-modal aria-label="Close preview">${icon("close")}</button>
        </div>
        <div class="modal-body"></div>
      </div>
    </div>
  </section>`;
}

function renderContact() {
  return `<section class="page">
    ${tabs("contact")}
    <div class="contact-layout">
      <article class="panel text-block">
        <h1 class="section-title">Get in touch</h1>
        <p class="lead">Fast paths for recruiters, collaborators, and technical reviewers to reach Ashmeet.</p>
        <div class="contact-card" style="margin-top: 24px">
          ${contactLink("Email", "ashmeet.singh.talwar1@gmail.com", "mailto:ashmeet.singh.talwar1@gmail.com")}
          ${contactLink("Phone", "+91 98705 33489", "tel:+919870533489")}
          ${contactLink("LinkedIn", "Ashmeet Singh", "https://www.linkedin.com/in/ashmeet-singh-5a2a93361/")}
          ${contactLink("GitHub", "Ashmeet04Singh", "https://github.com/Ashmeet04Singh")}
        </div>
      </article>

      <form class="panel contact-form" id="contactForm">
        <label class="field">
          <span>Name</span>
          <input class="input" name="name" autocomplete="name" required />
        </label>
        <label class="field">
          <span>Email</span>
          <input class="input" name="email" type="email" autocomplete="email" required />
        </label>
        <label class="field">
          <span>Subject</span>
          <input class="input" name="subject" required />
        </label>
        <label class="field">
          <span>Message</span>
          <textarea class="textarea" name="message" required></textarea>
        </label>
        <label class="honeypot">Company<input name="company" tabindex="-1" autocomplete="off" /></label>
        <button class="button" type="submit">Send message ${icon("mail")}</button>
      </form>
    </div>
  </section>`;
}

function contactLink(label, value, href) {
  const external = href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : "";
  return `<a class="contact-link" href="${href}"${external}><strong>${label}</strong><span>${value}</span></a>`;
}

function projectCard(project, compact = false) {
  return `<article class="card project-card">
    <p class="project-meta">${project.year} / ${project.category}</p>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">${project.tech.slice(0, compact ? 4 : 5).map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>
    <div class="card-actions">
      <a class="button secondary" href="#project/${project.slug}">Case study</a>
      <a class="icon-link" href="${project.github}" target="_blank" rel="noreferrer" aria-label="${project.title} on GitHub">${icon("github")}</a>
    </div>
  </article>`;
}

function getFilteredProjects() {
  const term = searchTerm.trim().toLowerCase();
  return projects
    .filter((project) => {
      const matchesTag = activeTag === "All" || project.category === activeTag;
      const haystack = [project.title, project.description, project.category, ...project.tech].join(" ").toLowerCase();
      return matchesTag && (!term || haystack.includes(term));
    })
    .sort((a, b) => (sortMode === "impact" ? b.impact - a.impact : projects.indexOf(a) - projects.indexOf(b)));
}

function bindPageEvents(route) {
  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });

  if (route === "projects") {
    document.querySelectorAll(".filter-chip").forEach((button) => {
      button.addEventListener("click", () => {
        activeTag = button.dataset.tag;
        render();
      });
    });

    document.querySelector("#projectSearch").addEventListener("input", (event) => {
      searchTerm = event.target.value;
      render({ keepFocus: true });
      requestAnimationFrame(() => {
        const nextInput = document.querySelector("#projectSearch");
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(searchTerm.length, searchTerm.length);
        }
      });
    });

    document.querySelector("#projectSort").addEventListener("change", (event) => {
      sortMode = event.target.value;
      render();
    });
  }

  if (route === "certifications") {
    document.querySelectorAll("[data-cert]").forEach((button) => {
      button.addEventListener("click", () => openCertificate(Number(button.dataset.cert)));
    });
    document.querySelector("[data-close-modal]").addEventListener("click", closeModal);
    document.querySelector("#certModal").addEventListener("click", (event) => {
      if (event.target.id === "certModal") closeModal();
    });
  }

  if (route === "contact") {
    document.querySelector("#contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (new FormData(form).get("company")) return;
      showToast("Thanks. Your message has been noted for this preview.");
      form.reset();
    });
  }
}

function openCertificate(index) {
  const cert = certifications[index];
  const modal = document.querySelector("#certModal");
  modal.querySelector("#certModalTitle").textContent = cert.title;
  modal.querySelector(".modal-body").innerHTML = `<img src="${cert.image}" alt="${cert.title}" />`;
  modal.classList.add("open");
  modal.querySelector("[data-close-modal]").focus();
}

function closeModal() {
  document.querySelector("#certModal")?.classList.remove("open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

window.addEventListener("hashchange", render);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

render();
