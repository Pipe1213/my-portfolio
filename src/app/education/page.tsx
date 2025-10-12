import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, person, education as educationConfig, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: educationConfig.title,
    description: educationConfig.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(educationConfig.title)}`,
    path: educationConfig.path,
  });
}

export default function Education() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={educationConfig.path}
        title={educationConfig.title}
        description={educationConfig.description}
        image={`/api/og/generate?title=${encodeURIComponent(educationConfig.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading variant="heading-strong-xl" align="center">
        {educationConfig.title}
      </Heading>

      <Column gap="24">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Paris-Saclay University</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">Master’s in Artificial Intelligence — Sep 2023 – Sep 2025</Text>
        </Column>
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Lloyds International College</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">Advanced Diploma in Leadership and Management — Feb 2020 – Feb 2022</Text>
        </Column>
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Universidad Industrial de Santander</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">B.Sc. in Electronic Engineering — Apr 2010 – Dec 2016</Text>
        </Column>
      </Column>
    </Column>
  );
}
