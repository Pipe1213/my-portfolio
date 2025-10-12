import { Column, Heading, Meta, Schema, Row, Button, Text } from "@once-ui-system/core";
import { baseURL, person, contact as contactConfig, about, social } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: contactConfig.title,
    description: contactConfig.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contactConfig.title)}`,
    path: contactConfig.path,
  });
}

export default function Contact() {
  const emailLink = person.email ? `mailto:${person.email}` : undefined;

  return (
    <Column maxWidth="s" paddingTop="24" gap="24" horizontal="center" align="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contactConfig.path}
        title={contactConfig.title}
        description={contactConfig.description}
        image={`/api/og/generate?title=${encodeURIComponent(contactConfig.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading variant="heading-strong-xl" align="center">
        {contactConfig.title}
      </Heading>
      <Row gap="12" wrap horizontal="center">
        {emailLink && (
          <Button variant="secondary" prefixIcon="email" href={emailLink}>
            Email
          </Button>
        )}
        <Button variant="secondary" prefixIcon="document" href="/resume.pdf">
          Resume
        </Button>
        {social
          .filter((s) => !!s.link)
          .map((s) => (
            <Button key={s.name} variant="secondary" prefixIcon={s.icon} href={s.link}>
              {s.name}
            </Button>
          ))}
      </Row>
      {!emailLink && (
        <Text onBackground="neutral-weak">Add your email in resources to enable mail link.</Text>
      )}
    </Column>
  );
}
