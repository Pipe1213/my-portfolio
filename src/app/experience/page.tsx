import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
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

      <Column gap="24">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Capital Fund Management</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">AI Engineer Intern — Paris, France (Mar 2025 – Sep 2025)</Text>
          <Text variant="body-default-m">
            Developed a production-ready AI-powered SQL Agent enabling analysts to query enterprise data using natural language. Modular LangChain/LangGraph pipeline replaces manual SQL for seamless data access.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Designed and optimized RAG pipelines with vector DBs and LLM-driven schema enrichment for context-aware table and example selection in Oracle.</Text>
            <Text as="li" variant="body-default-m">Implemented multi-step agent workflows (LangChain, LangGraph) with custom tools for retrieval, reasoning, SQL validation, and automated answer synthesis.</Text>
            <Text as="li" variant="body-default-m">Evaluated parallel chain-of-thought prompting and fallbacks, improving robustness and correctness for complex financial queries.</Text>
            <Text as="li" variant="body-default-m">Delivered a production-ready prototype establishing a reference for future LLM tools.</Text>
          </Column>
        </Column>

        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">LISN (Laboratoire Interdisciplinaire des Sciences du Numérique)</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">NLP Research Intern — Orsay, France (Apr 2024 – Aug 2024)</Text>
          <Text variant="body-default-m">
            Led the end-to-end development of the first Text-to-Speech system for the low-resource Walloon language, from data to deployment and publication.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Built a TTS system using a conditional VAE with cross-lingual transfer from French to overcome data scarcity.</Text>
            <Text as="li" variant="body-default-m">Managed the full lifecycle: data pipelines, training, fine-tuning, and evaluation with objective and perceptual metrics.</Text>
            <Text as="li" variant="body-default-m">Published findings at SSW13 (Interspeech 2025); released models and demos on Hugging Face.</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
