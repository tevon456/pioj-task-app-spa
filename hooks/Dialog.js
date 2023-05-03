import React, { useRef } from "react";

import ReactDOM from "react-dom";
import { UICore } from "../components";
import { X } from "@phosphor-icons/react";
import styled from "styled-components";
import useOnClickOutside from "./useOnClickOutside";

function Dialog({ open = false, close = () => {}, name = "", blur, ...props }) {
  const ref = useRef();
  useOnClickOutside(ref, () => close() || null);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <DialogBackground blur={blur}>
        <div ref={ref}>
          <DialogInner name={name} minWidth="300px" close={close} {...props}>
            {props.children}
          </DialogInner>
        </div>
      </DialogBackground>
    </div>,
    document.getElementById("portal")
  );
}

function DialogInner({ name, close = () => {}, children, width, height }) {
  return (
    <UICore.Box
      bg="var(--dark-page-background)"
      radius="8px"
      pd="0px"
      pb="6px"
      border="1px solid var(--neutral-700)"
    >
      <UICore.Box
        bg="var(--dark-page-background)"
        mg="0px"
        radius="8px 8px 0px 0px"
        pd="12px"
      >
        <UICore.Flex justify="space-between" align="center">
          <UICore.Text
            mt="0px"
            color="var(--text-light)"
            weight="500"
            size="md"
            className="margin-top--none margin-bottom--none"
          >
            {name}
          </UICore.Text>
          <UICore.Button
            kind="secondary"
            autoFocus
            mg="0px"
            pd="0px"
            data-cy="close-dialog"
            onClick={() => close()}
          >
            <UICore.Flex align="center" justify="center">
              <X size={22} color="#ffffff" />
            </UICore.Flex>
          </UICore.Button>
        </UICore.Flex>
      </UICore.Box>
      <UICore.Box
        css={`
          &::-webkit-scrollbar {
            width: 10px;
          }
          &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background: #a2a2a2;
            border-radius: 8px;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: #767676;
          }
        `}
        width={width}
        height={height || "max-content"}
        minWidth="300px"
        maxWidth={width || "max-content"}
        maxHeight="70vh"
        mg="8px"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {children}
        <button
          style={{ border: "none", padding: "0px", background: "transparent" }}
          onFocus={() => {
            let closeButton = document.body.querySelector(
              '[data-cy="close-dialog"]'
            );
            closeButton.focus();
          }}
        ></button>
      </UICore.Box>
    </UICore.Box>
  );
}

const DialogBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
  backdrop-filter: blur(${(props) => props.blur || "8px"});
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 12;
`;

export default Dialog;
