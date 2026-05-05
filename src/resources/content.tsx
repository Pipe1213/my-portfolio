import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Felipe",
  lastName: "Espinosa",
  name: "Felipe Espinosa",
  role: "Applied AI Engineer | NLP and LLM Systems",
  avatar: "/me.jpg",
  email: "felipeespinosa.13@outlook.com",
  location: "Europe/Paris",
  languages: ["Spanish (Native)", "English (C1)", "French (B2)", "Portuguese (B2)"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Newsletter</>,
  description: <>Subscribe</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Pipe1213",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/felipe-espinosa13",
  },
  {
    name: "Google Scholar",
    icon: "document",
    link: "https://scholar.google.com/citations?user=wWZDxU8AAAAJ&hl=en",
  },
  {
    name: "Hugging Face",
    icon: "huggingface",
    link: "https://huggingface.co/Pipe1213",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Applied AI, NLP & LLM Systems`,
  description:
    "Applied AI Engineer in Paris focused on RAG, SQL agents, LLM evaluation, and speech/NLP systems. Built an analyst-facing SQL agent at CFM, published first-author Walloon TTS research at SSW 2025, and built AskData, a full-stack analytics assistant.",
  headline: <>Applied AI, NLP & LLM Systems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured work</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          AskData and CFM SQL Agent
        </Text>
      </Row>
    ),
    href: "/projects",
  },
  subline: (
    <>
      I build AI systems that connect language models with real data: RAG pipelines,
      conversational SQL agents, LLM evaluation workflows, and NLP/speech applications. My work
      focuses on reliable retrieval, validation, tracing, and usable interfaces, from financial
      data assistants to low-resource speech synthesis.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, an Applied AI Engineer focused on NLP and LLM systems in Paris, France`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p>
          I build AI systems that connect language models with real data: RAG pipelines,
          conversational SQL agents, LLM evaluation workflows, and NLP/speech applications.
        </p>
        <p>
          My strongest area is turning natural-language requests into reliable outputs: retrieving
          the right context, generating and validating SQL or code, tracing model behavior,
          benchmarking failures, and making the result usable through APIs or lightweight
          interfaces.
        </p>
        <p>
          Recent work includes a financial SQL agent with RAG and evaluation workflows at Capital
          Fund Management, low-resource speech synthesis research published as first author at SSW
          2025, and AskData, a full-stack analytics assistant for querying PostgreSQL data in plain
          English.
        </p>
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Programming",
        description: <>Python, SQL, Bash, TypeScript</>,
      },
      {
        title: "LLM Systems",
        description: (
          <>
            RAG, agentic workflows, LangChain, LangGraph, LangSmith, ChromaDB, BM25, vector
            databases, prompt engineering, OpenAI API, LLM evaluation
          </>
        ),
      },
      {
        title: "Backend and Data",
        description: (
          <>
            FastAPI, Next.js, Pydantic, PostgreSQL, Oracle, Redis, Docker, CI, SQL safety,
            schema-aware retrieval
          </>
        ),
      },
      {
        title: "AI / ML and Speech",
        description: (
          <>
            PyTorch, scikit-learn, Pandas, NumPy, Matplotlib, Hugging Face Transformers, speech
            synthesis, fine-tuning, model evaluation
          </>
        ),
      },
      {
        title: "Tools",
        description: <>Git, Linux, Jupyter, Streamlit, Slurm, Apify, Claude Code</>,
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing",
  description: `Writing by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Applied AI, NLP, and LLM systems projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery - ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const experience = {
  path: "/experience",
  label: "Experience",
  title: `Experience - ${person.name}`,
  description:
    "Applied AI and NLP experience across LLM systems, RAG, SQL agents, LLM evaluation, and low-resource speech synthesis.",
};

const education = {
  path: "/education",
  label: "Education",
  title: `Education - ${person.name}`,
  description: `Education history of ${person.name} in artificial intelligence, computer science, and electronic engineering.`,
};

const publications = {
  path: "/publications",
  label: "Publications",
  title: `Publications - ${person.name}`,
  description: `First-author speech synthesis publication by ${person.name} at SSW 2025.`,
};

const projects = {
  path: "/projects",
  label: "Projects",
  title: `Projects - ${person.name}`,
  description: `Projects by ${person.name} covering RAG, SQL agents, LLM evaluation, full-stack analytics assistants, NLP, and speech synthesis.`,
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact - ${person.name}`,
  description: `Get in touch with ${person.name}`,
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  experience,
  education,
  publications,
  projects,
  contact,
};
