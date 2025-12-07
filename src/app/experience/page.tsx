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

      <Column gap="24">
        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">Capital Fund Management</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">AI/ML Engineer Intern — LLM Agents & RAG — Paris, France (Mar 2025 – Sep 2025)</Text>
          <Text variant="body-default-m">
            Developed a Data Analysis Agent that enables analysts to query financial data in natural language. The system was built using <strong>LangChain</strong> and <strong>LangGraph</strong> to design <strong>agentic architectures</strong> and a <strong>hybrid retrieval</strong> mechanism that merges keyword and semantic search for more accurate table selection.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Built a data analysis agent that achieved <strong>88% end-to-end QA accuracy</strong> on an internal benchmark.</Text>
            <Text as="li" variant="body-default-m">Reduced average SQL writing and correction time to <strong>51 seconds</strong>, speeding up analyst iterations and QA cycles.</Text>
            <Text as="li" variant="body-default-m">Achieved <strong>95% top-k retrieval accuracy</strong> by combining <strong>BM25</strong>, dense embeddings, and <strong>RRF fusion</strong> in the RAG pipeline.</Text>
            <Text as="li" variant="body-default-m">Integrated multi-tool capabilities (coding, data visualization, and analytical reasoning) to enable complex, autonomous analyst workflows.</Text>
            <Text as="li" variant="body-default-m">Implemented active learning loops capturing user feedback for few-shot grounding and fine-tuning data curation.</Text>
            <Text as="li" variant="body-default-m">Deployed the system to a pilot group within the Data team to validate the architecture for future enterprise integration.</Text>
          </Column>
          <Row paddingTop="8">
            <Button variant="secondary" prefixIcon="openLink" href="/projects/sql-agent-cfm">
              View project
            </Button>
          </Row>
        </Column>

        <Column gap="8">
          <Heading as="h2" variant="heading-strong-l">LISN (Laboratoire Interdisciplinaire des Sciences du Numérique)</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">AI Scientist Intern — Speech Synthesis — Orsay, France (Apr 2024 – Aug 2024)</Text>
          <Text variant="body-default-m">
            Developed the first <strong>Text-to-Speech</strong> system for the Walloon language using the <strong>VITS</strong> architecture. The project covered the entire pipeline, from data collection to model training, fine-tuning, evaluation, and public deployment.
          </Text>
          <Column as="ul" gap="8">
            <Text as="li" variant="body-default-m">Trained the first Text-to-Speech model for Walloon (3h of data) using cross-lingual transfer from 20h of French, achieving <strong>MOS 4.22/5</strong> for the best configuration.</Text>
            <Text as="li" variant="body-default-m">Ran ablation studies (French pretraining vs none, graphemes vs phonemes) and conducted objective + human evaluation (<strong>PESQ</strong>, <strong>MCD</strong>, <strong>SECS</strong> + native-speaker perceptual tests) to select the best configuration.</Text>
            <Text as="li" variant="body-default-m">Lead author of a paper presented at the <strong>13th Speech Synthesis Workshop (SSW 2025)</strong>, in collaboration with senior researchers at LISN, highlighting cross-lingual transfer strategies for low-resource <strong>TTS</strong>.</Text>
            <Text as="li" variant="body-default-m">Open-sourced trained models, demos, and inference scripts on <strong>Hugging Face</strong>, enabling reuse by other researchers.</Text>
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
