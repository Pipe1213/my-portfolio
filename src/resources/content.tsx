import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Felipe",
  lastName: "Espinosa",
  name: `Felipe Espinosa`,
  role: "AI/ML Engineer",
  avatar: "/me.jpg",
  email: "felipeespinosa.13@outlook.com",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Spanish (Native)", "English (C1)", "Portuguese (B2)", "French (B1)"], // optional: Leave the array empty if you don't want to display languages
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
  title: `${person.name} — LLMs, GenAI & Agents`,
  description: `AI Engineer with expertise in agentic, retrieval-augmented, and LLM-powered systems. Built a functional SQL Agent prototype at CFM (LangChain/LangGraph, hybrid retrieval) and developed the first Walloon TTS system published at SSW13.`,
  headline: <>LLMs • GenAI • Agents</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/projects",
  },
  subline: (<>AI/ML Engineer with expertise in agentic, retrieval-augmented, and LLM-powered systems. Built a functional SQL Agent prototype at CFM (LangChain/LangGraph, hybrid retrieval) and developed the first Walloon TTS system published at SSW13.</>),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, ${person.role} in Paris, France`,
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
          Hey  I’m Felipe, an AI/ML Engineer based in Paris, France, passionate about creating intelligent systems that blend reasoning, retrieval, and generative capabilities. I’m especially interested in how Generative AI and large language models can make complex information easier to access and understand. I also have experience working on Text-to-Speech systems, exploring how generative models can bring new voices and languages to life.
        </p>
        <p>
          Outside of work, I love traveling, exercising, music, and learning new things, whether that’s exploring a new place, reading about the latest in AI, or picking up new tools to keep my skills sharp. I’m always looking for ways to grow, stay inspired, and turn new ideas into something meaningful.
        </p>
      </>
    ),
  },
  work: {
    display: false, // moved to dedicated Experience page
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // moved to dedicated Education page
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Programming & Databases",
        description: (<>Python, SQL, Oracle, Redis, ChromaDB</>),
      },
      {
        title: "AI & ML Frameworks",
        description: (
          <>PyTorch, LangChain, LangGraph, Transformers, Hugging Face, Scikit-learn, Pandas, OpenCV, NumPy, Matplotlib, Deep Learning, Generative AI, Agent Architectures, RAG, Hybrid Search, Fine-tuning, Prompt Engineering, Vector Databases, Model Deployment</>
        ),
      },
      {
        title: "Tools & Platforms",
        description: (<>Git, Docker, Slurm, AWS, Streamlit, Jupyter, Confluence, Jira</>),
      },
      {
        title: "Soft Skills",
        description: (<>Analytical Thinking, Problem Solving, Teamwork, Communication, Adaptability, Autonomy</>),
      },

    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery - ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
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

// New page configs
const experience = {
  path: "/experience",
  label: "Experience",
  title: `Experience - ${person.name}`,
  description: `Professional experience of ${person.name}`,
};

const education = {
  path: "/education",
  label: "Education",
  title: `Education - ${person.name}`,
  description: `Education history of ${person.name}`,
};

const publications = {
  path: "/publications",
  label: "Publications",
  title: `Publications - ${person.name}`,
  description: `Publications by ${person.name}`,
};

const projects = {
  path: "/projects",
  label: "Projects",
  title: `Projects - ${person.name}`,
  description: `Project portfolio by ${person.name}`,
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact - ${person.name}`,
  description: `Get in touch with ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery, experience, education, publications, projects, contact };
