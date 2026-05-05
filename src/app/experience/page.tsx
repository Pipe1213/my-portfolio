import { Column, Heading, Meta, Schema, Text, Row, Button } from "@once-ui-system/core";
import { baseURL, person, experience as experienceConfig, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: experienceConfig.title,
    description: experienceConfig.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(experienceConfig.title)}`,
    path: experienceConfig.path,
  });
}

export default function Experience() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={experienceConfig.path}
        title={experienceConfig.title}
        description={experienceConfig.description}
        image={`/api/og/generate?title=${encodeURIComponent(experienceConfig.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading variant="heading-strong-xl" align="center">
        {experienceConfig.title}
      </Heading>

      <Column gap="32">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">
            AI Evaluation & Data Contractor
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Independent Contractor - Remote (November 2025 - April 2026)
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">
              Delivered coding, data scraping, and AI-data tasks for client projects across
              contractor platforms, using Apify and LLM-based assistants to collect, structure, and
              validate data.
            </Text>
            <Text as="li" variant="body-default-m">
              Evaluated LLM responses against strict rubrics for factuality, correctness, reasoning
              quality, and safety, including health-related model-comparison tasks.
            </Text>
            <Text as="li" variant="body-default-m">
              Analyzed failure patterns and prompt behavior, including unsupported claims, missing
              evidence, hallucinated facts, and weak reasoning, to support model-quality review.
            </Text>
          </Column>
        </Column>

        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">
            Capital Fund Management (CFM)
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            AI Engineer Intern - LLM Systems - Paris, France (March 2025 - September 2025)
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">
              Built a conversational SQL agent for financial data analysis, achieving{" "}
              <strong>87.5% end-to-end accuracy</strong> on a 48-question internal benchmark.
            </Text>
            <Text as="li" variant="body-default-m">
              Implemented a RAG retrieval pipeline using <strong>BM25</strong>, dense embeddings,
              and Reciprocal Rank Fusion, achieving <strong>95% top-k accuracy</strong>.
            </Text>
            <Text as="li" variant="body-default-m">
              Designed agentic, plan-first workflows for SQL generation, validation, code
              execution, and answer synthesis to handle multi-step queries and follow-ups reliably.
            </Text>
            <Text as="li" variant="body-default-m">
              Deployed the system as an analyst-facing tool and supported release-readiness with
              testing, debugging, LangSmith tracing, and CI/Jenkins checks.
            </Text>
          </Column>
          <Row paddingTop="8">
            <Button variant="secondary" prefixIcon="openLink" href="/projects/sql-agent-cfm">
              View project
            </Button>
          </Row>
        </Column>

        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">
            Laboratoire Interdisciplinaire des Sciences du Numerique (LISN)
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            AI Research Intern - Speech Synthesis - Orsay, France (February 2024 - August 2024)
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">
              Developed the first text-to-speech system for Walloon, an under-resourced minority
              language, using a VITS-based architecture adapted to low-resource speech data.
            </Text>
            <Text as="li" variant="body-default-m">
              Designed and ran experiments comparing grapheme- and phoneme-based inputs, including
              fine-tuning from French-pretrained models and Walloon-only baselines, to study
              low-resource TTS trade-offs.
            </Text>
            <Text as="li" variant="body-default-m">
              Built preprocessing and phonological components for the pipeline, including
              sentence-level data preparation and a rule-based grapheme-to-phoneme workflow for
              phoneme-based synthesis.
            </Text>
            <Text as="li" variant="body-default-m">
              Evaluated generated speech with objective and human perceptual metrics, achieving a{" "}
              <strong>4.22/5 MOS</strong>, and published the work as first author at{" "}
              <strong>SSW 2025</strong>.
            </Text>
          </Column>
          <Row paddingTop="8">
            <Button variant="secondary" prefixIcon="openLink" href="/projects/walloon-tts-ssw13">
              View project
            </Button>
          </Row>
        </Column>
      </Column>
    </Column>
  );
}
