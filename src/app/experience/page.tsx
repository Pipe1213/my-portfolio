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
            Developed a functional SQL Agent prototype that enables analysts to query financial data in natural language. The system was built using <strong>LangChain</strong> and <strong>LangGraph</strong> to design <strong>agentic architectures</strong> and a <strong>hybrid retrieval</strong> mechanism that merges keyword and semantic search for more accurate table selection.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Achieved <strong>88% accuracy</strong> and <strong>93% correct table retrieval</strong> on an internal test set built with the data team.</Text>
            <Text as="li" variant="body-default-m">Designed a <strong>hybrid search engine</strong> combining <strong>BM25</strong>, <strong>semantic embeddings</strong>, and <strong>Reciprocal Rank Fusion (RRF)</strong> to improve table relevance and precision across <strong>Oracle</strong> databases.</Text>
            <Text as="li" variant="body-default-m">Created <strong>RAG pipelines</strong> with schema enrichment, multi-step reasoning, and <strong>fallback strategies</strong> for complex financial queries.</Text>
            <Text as="li" variant="body-default-m">Delivered the complete solution: retrieval modules, validation tools, an <strong>evaluation pipeline</strong>, and a <strong>Streamlit</strong> interface adopted by internal analysts.</Text>
            <Text as="li" variant="body-default-m">Shipped a <strong>functional prototype</strong> that now serves as a foundation for future <strong>LLM-based</strong> automation tools.</Text>
          </Column>
        </Column>

        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">LISN (Laboratoire Interdisciplinaire des Sciences du Numérique)</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">NLP Research Intern — Orsay, France (Apr 2024 – Aug 2024)</Text>
          <Text variant="body-default-m">
            Developed the first <strong>Text-to-Speech</strong> system for the Walloon language using the <strong>VITS</strong> architecture. The project covered the entire pipeline, from data collection to model training, fine-tuning, evaluation, and public deployment.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Trained multiple <strong>VITS</strong> models with and without French pretraining, achieving a <strong>Mean Opinion Score (MOS)</strong> of <strong>4.22</strong> for the best configuration.</Text>
            <Text as="li" variant="body-default-m">Conducted objective evaluations using <strong>PESQ</strong>, <strong>MCD</strong>, and <strong>SECS</strong> metrics, and validated the results through perceptual tests with native speakers.</Text>
            <Text as="li" variant="body-default-m">Published results at the <strong>13th Speech Synthesis Workshop (SSW 2025)</strong>, highlighting cross-lingual transfer strategies for low-resource <strong>TTS</strong>.</Text>
            <Text as="li" variant="body-default-m">Released trained models, demos, and inference scripts publicly on <strong>Hugging Face</strong> to support open research and community use.</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
