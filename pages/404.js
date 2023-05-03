import "styled-components/macro";

import Head from "next/head";
import { UICore } from "../components";
import { useBackground } from "../hooks";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useBackground("var(--dark-page-background)");

  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <main
        css={`
          color: var(--text-light);
          transition-timing-function: var(--animation);
          transition-duration: background var(--animation-duration);
          transition: background var(--animation-time);
          height: 90vh;
        `}
      >
        <section pt="var(--space-xxl) !important">
          <UICore.Page>
            <UICore.Flex justify="center" align="center">
              <UICore.Box width="auto">
                <UICore.Text
                  font="var(--font-heading)"
                  weight="bold"
                  color="inherit"
                  as="h1"
                  size="xxxl"
                  align="center"
                >
                  Page not found
                </UICore.Text>
                <UICore.Flex justify="center">
                  <UICore.Text
                    align="left"
                    color="inherit"
                    css={`
                      min-width: 300px;
                      max-width: 500px;
                    `}
                  >
                    That page does not exist or you are not allowed to view.
                  </UICore.Text>
                </UICore.Flex>
                <UICore.Flex justify="center" gap="var(--space-sm)">
                  <UICore.Button
                    size="lg"
                    kind="tertiary"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Back
                  </UICore.Button>
                </UICore.Flex>
              </UICore.Box>
            </UICore.Flex>
          </UICore.Page>
        </section>
      </main>
    </>
  );
}
