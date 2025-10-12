import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
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
        {publicationsConfig.title}
      </Heading>

      <Column gap="24">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Walloon TTS (SSW13, 2025)</Heading>
          <Text variant="body-default-m">
            VITS-based TTS for Walloon with cross-lingual transfer, objective metrics, and MOS bootstrap analysis. Accepted at the 13th Speech Synthesis Workshop (Interspeech 2025).
          </Text>
          <Text variant="body-default-m">
            Paper: <a href="https://www.isca-archive.org/ssw_2025/orjuela25_ssw.pdf" target="_blank" rel="noreferrer">ISCA Archive</a>
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
