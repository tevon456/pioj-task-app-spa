import "styled-components/macro";

import { UICore } from "../";
import { devices } from "../../utils";

export default function SubPage({ title, actions, children }) {
  return (
    <main
      css={`
        display: flex;
        justify-content: center;
        padding: 8rem 12rem;

        @media screen and (max-width: 1260px) {
          padding: 6rem 2rem;
        }
        @media screen and (max-width: 1060px) {
          padding: 6rem 2rem;
        }
        @media screen and (max-width: ${devices.DEVICE_SIZES_PX.DESKTOP_SM}) {
          padding: 6rem 2rem;
        }
        @media screen and (max-width: ${devices.DEVICE_SIZES_PX.TABLET}) {
          padding: 6rem 2rem;
        }
        @media screen and (max-width: ${devices.DEVICE_SIZES_PX.MOBILE_SM}) {
          padding: 4rem 1rem;
        }
      `}
    >
      <section
        css={`
          width: clamp(300px, 100%, 940px);
        `}
      >
        <div>
          <UICore.Flex
            justify="space-between"
            align="center"
            className="margin-bottom--md"
          >
            <div>
              <UICore.Flex align="center" gap="var(--space-sm)">
                <UICore.Text
                  color="var(--text-light)"
                  as="h1"
                  font="var(--font-heading)"
                  size="lg"
                  weight="900"
                  mt="0px"
                  mb="0px"
                >
                  {title}
                </UICore.Text>
              </UICore.Flex>
            </div>
            <div>{actions}</div>
          </UICore.Flex>
        </div>
        <section>{children}</section>
      </section>
    </main>
  );
}
