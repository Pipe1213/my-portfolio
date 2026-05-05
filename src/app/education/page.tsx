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
          <Heading as="h2" variant="heading-strong-l">
            Universite Paris-Saclay
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            M.Sc. in Computer Science, Artificial Intelligence - France (2023 - 2025)
          </Text>
          <Text variant="body-default-m">Grade: 16.2/20</Text>
        </Column>
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">
            Universidad Industrial de Santander
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            B.Sc. in Electronic Engineering - Colombia (Graduated 2017)
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
