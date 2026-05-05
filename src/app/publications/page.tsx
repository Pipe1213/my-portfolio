import { Column, Heading, Meta, Schema, Text, Row, Button } from "@once-ui-system/core";
import { baseURL, person, publications as publicationsConfig, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: publicationsConfig.title,
    description: publicationsConfig.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(publicationsConfig.title)}`,
    path: publicationsConfig.path,
  });
}

export default function Publications() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={publicationsConfig.path}
        title={publicationsConfig.title}
        description={publicationsConfig.description}
        image={`/api/og/generate?title=${encodeURIComponent(publicationsConfig.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading variant="heading-strong-xl" align="center">
        Publications
      </Heading>

      <Column gap="24">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">
            Speech Synthesis for Walloon, an Under-Resourced Minority Language
          </Heading>
          <Text variant="body-default-s" onBackground="brand-weak">
            First author - SSW 2025
          </Text>
          <Text variant="body-default-m">
            First-author publication on the first Walloon text-to-speech system, using a VITS-based
            architecture and comparing grapheme, phoneme, and French-pretrained configurations with
            objective and perceptual evaluation.
          </Text>
          <Row gap="12" wrap paddingTop="8">
            <Button
              variant="secondary"
              prefixIcon="document"
              href="https://www.isca-archive.org/ssw_2025/orjuela25_ssw.pdf"
            >
              Paper
            </Button>
            <Button
              variant="secondary"
              prefixIcon="document"
              href="https://scholar.google.com/citations?user=wWZDxU8AAAAJ&hl=en"
            >
              Google Scholar
            </Button>
            <Button variant="secondary" prefixIcon="huggingface" href="https://huggingface.co/Pipe1213">
              Hugging Face
            </Button>
          </Row>
        </Column>
      </Column>
    </Column>
  );
}
