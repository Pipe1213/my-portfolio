import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, projects as projectsConfig } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: projectsConfig.title,
    description: projectsConfig.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(projectsConfig.title)}`,
    path: projectsConfig.path,
  });
}

export default function ProjectsPage() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={projectsConfig.path}
        title={projectsConfig.title}
        description={projectsConfig.description}
        image={`/api/og/generate?title=${encodeURIComponent(projectsConfig.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {projectsConfig.title}
      </Heading>
      <Projects />
    </Column>
  );
}

