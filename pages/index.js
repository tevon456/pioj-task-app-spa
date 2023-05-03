import "styled-components/macro";

import { useBackground } from "../hooks";

import { ArrowRight } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { UICore } from "../components";
import { paths } from "../utils";

export default function Home() {
  useBackground("var(--dark-page-background)");

  return (
    <>
      <Head>
        <title>PIOJ task app | by Tevon</title>
        <meta name="description" content="PIOJ task app" />
        <meta property="og:title" content="PIOJ task app" />
        <meta
          property="og:description"
          content="The app manages employees and tasks, allowing users to create
                new employees, create new tasks, assign tasks to employees,
                change task statuses, and view a list of all tasks along with
                their assigned employees and statuses."
        />
      </Head>
      <main
        css={`
          color: var(--text-dark);
          transition-timing-function: var(--animation);
          transition-duration: background var(--animation-duration);
          transition: background var(--animation-time);
        `}
      >
        <UICore.Flex
          wrap="wrap"
          mg="var(--space-none)"
          pd="var(--space-none)"
          gap="var(--space-md)"
          as={UICore.Box}
          maxHeight="100vh"
          height="100vh"
          justify="center"
        >
          <UICore.Box
            bg={`#000000;
            opacity: 1;
            background-image: radial-gradient(#3e3d3d 0.75px, #000000 0.75px);
            background-size: 15px 15px`}
          >
            <UICore.Flex
              align="center"
              justify="space-evenly"
              wrap="wrap"
              css={`
                height: 100%;
              `}
            >
              <UICore.Box
                mx="var(--space-none)"
                my="var(--space-sm)"
                width="clamp(340px,40%,500px)"
                pd="var(--space-sm)"
              >
                <img src="./logo-mono-light.png" width="80px" />
                <UICore.Flex gap="var(--space-sm)" align="center">
                  <UICore.Text
                    weight="900"
                    font="var(--font-heading)"
                    size="xxl"
                    mt="var(--space-xxxs)"
                    align="left"
                    color="var(--neutral-200)"
                  >
                    Welcome to the PIOJ task app
                  </UICore.Text>
                </UICore.Flex>
                <UICore.Text
                  weight="400"
                  mt="var(--space-xxxs)"
                  align="left"
                  color="var(--neutral-300)"
                >
                  The app manages employees and tasks, allowing users to create
                  new employees, create new tasks, assign tasks to employees,
                  change task statuses, and view a list of all tasks along with
                  their assigned employees and statuses.
                </UICore.Text>
                <UICore.Flex>
                  <Link passHref href={paths.DASHBOARD}>
                    <UICore.Button size="md">
                      Get Started <UICore.Space amount={1} />
                      <ArrowRight size={24} color="var(--neutral-100)" />
                    </UICore.Button>
                  </Link>
                </UICore.Flex>
                <UICore.Text
                  weight="300"
                  size="sm"
                  mt="var(--space-md)"
                  align="left"
                  color="var(--neutral-400)"
                >
                  Developed and designed by candidate{" "}
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://tevon.vercel.app"
                    css={`
                      color: var(--primary);
                      text-decoration: underline;
                    `}
                  >
                    Tevon Davis
                  </a>{" "}
                  May 2023.
                </UICore.Text>
              </UICore.Box>
              <img
                style={{
                  borderRadius: "12px",
                  width: "clamp(300px, 50%, 600px)",
                  filter: "contrast(110%)",
                }}
                src={`https://res.cloudinary.com/lyreform-com/image/upload/v1683074478/Screenshot_2023-05-02_at_19-37-34_Dashboard_yefzg5.png`}
              />
            </UICore.Flex>
          </UICore.Box>
        </UICore.Flex>
      </main>
    </>
  );
}
