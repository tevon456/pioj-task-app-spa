import "styled-components/macro";

import { CheckSquareOffset, UsersThree } from "@phosphor-icons/react";
import { useBackground, useWindowSize } from "../../hooks";

import Link from "next/link";
import paths from "../../utils/paths";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "../ui-core";

export default function AppShell({ children }) {
  const router = useRouter();
  const windowSize = useWindowSize();

  const activeLinkMatch = (match) => {
    const baseSplitter = "/dashboard";
    const slashRemovedMatchPath = match.split(baseSplitter)[1] || baseSplitter;

    let subDir = router.pathname
      .split(baseSplitter)[1]
      .split("/")
      .map((path) => {
        return `/${path}`;
      })
      .slice(1);

    if (baseSplitter === match && router.pathname === match) {
      return "active";
    } else {
      return subDir.includes(slashRemovedMatchPath) ? "active" : "";
    }
  };

  useBackground("var(--dark-page-background)");

  return (
    <Flex
      direction="column"
      as={Box}
      maxHeight="100vh"
      height="100vh"
      mg="var(--space-none)"
      pd="var(--space-none)"
    >
      {windowSize?.width > 460 && (
        <Box
          bg="#18181abf"
          mg="var(--space-none)"
          pd="var(--space-none)"
          height="60px"
          width="calc(100vw)"
          maxWidth="100vw"
          bb="1px solid #3a3a3d"
          color="white"
          css={`
            backdrop-filter: saturate(120%) brightness(120%) blur(33px);
            position: fixed !important;
            left: 0;
            z-index: 8;
          `}
        >
          <Flex
            align="center"
            justify={"center"}
            gap="var(--space-sm)"
            as={Box}
            height="100%"
            mg="var(--space-none)"
            pd="var(--space-none)"
            pl="var(--space-md)"
            pr="var(--space-md)"
          >
            <NavBarLinkItem
              href={paths.DASHBOARD}
              text="Tasks"
              className={activeLinkMatch(paths.DASHBOARD)}
            >
              <CheckSquareOffset size={24} color="var(--neutral-200)" />
            </NavBarLinkItem>
            <NavBarLinkItem
              href={paths.EMPLOYEE_LIST}
              text="Employees"
              className={activeLinkMatch(paths.EMPLOYEE_LIST)}
            >
              <UsersThree size={24} color="var(--neutral-200)" />
            </NavBarLinkItem>
          </Flex>
        </Box>
      )}

      <Box
        mg="var(--space-none)"
        pd="var(--space-none)"
        css={`
          flex-grow: 1;
        `}
      >
        <Flex
          as={Box}
          maxHeight="calc(100vh)"
          height="calc(100vh)"
          mg="var(--space-none)"
          pd="var(--space-none)"
          css={`
            overflow-y: hidden;
          `}
        >
          <Box
            mg="var(--space-none)"
            pd="var(--space-none)"
            css={`
              flex-grow: 1;
              overflow-y: auto;
            `}
          >
            {children}
          </Box>
        </Flex>
      </Box>
      {windowSize?.width < 460 && <BottomBar />}
    </Flex>
  );
}

function NavBarLinkItem({ href = "", text = "", children, ...rest }) {
  return (
    <Link passHref href={href}>
      <a
        css={`
          color: var(--neutral-100);
          min-width: 140px;
          transition-timing-function: ease;
          transition-duration: 0.3s;
          border-radius: 24px;

          &.active {
            background: #ffffff21;
            backdrop-filter: blur(30px);
            background-blend-mode: multiply;
          }

          &.active:hover {
            background: #babcbf69;
          }

          &:hover {
            background: #bbbbbb1a;
          }
        `}
        {...rest}
      >
        <Flex align="center" justify="center" gap="var(--space-xxxs)">
          <Box mg="var(--space-none)" pd="var(--space-xxxxs)">
            {children}
          </Box>
          <Text
            weight="400"
            color="inherit"
            mt="var(--space-xxxs)"
            mb="var(--space-xxxs)"
          >
            {text}
          </Text>
        </Flex>
      </a>
    </Link>
  );
}

function BottomBarLinkItem({ href = "", text = "", children, ...rest }) {
  return (
    <Link passHref href={href}>
      <a
        css={`
          color: var(--neutral-100);
          display: block;
          flex-grow: 1;
          width: 100%;
          transition-timing-function: ease;
          transition-duration: 0.3s;

          &:focus {
            box-shadow: none;
            outline: 0;
          }

          &.active div > svg {
            fill: var(--neutral-100) !important;
          }

          &.active div > svg > path {
            stroke: var(--neutral-100) !important;
          }
        `}
        {...rest}
      >
        <Flex direction="column">
          <Box mg="var(--space-none)" pd="var(--space-xxxs)">
            {children}
          </Box>
        </Flex>
      </a>
    </Link>
  );
}

function BottomBar() {
  const router = useRouter();

  const activeLinkMatch = (match) => {
    const baseSplitter = "/dashboard";
    const slashRemovedMatchPath = match.split(baseSplitter)[1] || baseSplitter;

    let subDir = router.pathname
      .split(baseSplitter)[1]
      .split("/")
      .map((path) => {
        return `/${path}`;
      })
      .slice(1);

    if (baseSplitter === match && router.pathname === match) {
      return "active";
    } else {
      return subDir.includes(slashRemovedMatchPath) ? "active" : "";
    }
  };

  return (
    <Box
      bg="#18181abf"
      width="calc(100vw - calc(2rem * 2))"
      maxWidth="100vw"
      height="50px"
      mg="var(--space-none)"
      bt="1px solid #3a3a3d"
      css={`
        position: fixed !important;
        padding: var(--space-xxs) 2rem !important;
        bottom: 0 !important;
        backdrop-filter: saturate(120%) brightness(31%) blur(30px);
        left: 0;
        z-index: 8;
      `}
    >
      <Flex align="center" justify="space-evenly">
        <BottomBarLinkItem
          href={paths.DASHBOARD}
          text="Tasks"
          className={activeLinkMatch(paths.DASHBOARD)}
        >
          <CheckSquareOffset size={24} color="var(--neutral-500)" />
        </BottomBarLinkItem>
        <BottomBarLinkItem
          href={paths.EMPLOYEE_LIST}
          className={activeLinkMatch(paths.EMPLOYEE_LIST)}
          text="Employee"
        >
          <UsersThree size={24} color="var(--neutral-500)" />
        </BottomBarLinkItem>
      </Flex>
    </Box>
  );
}
