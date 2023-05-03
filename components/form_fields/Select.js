import React from "react";
import { UICore } from "..";
import styled from "styled-components";

const StyledSelect = styled.select`
  appearance: none;
  background: var(--neutral-100);
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: var(--space-xxs) var(--space-xs);
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  border: 2px solid var(--neutral-600);
  background:var(--neutral-900);
  color:var(--text-light);
  border-radius: 4px;
  margin-top: 6px;
  box-shadow: rgba(108, 108, 108, 0.12) 0px 2px 4px 0px,
    inset var(--neutral-900) 0px 3px 2px 0px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "initial")};
  font-size: 16px;
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  &:disabled {
    background-color: #ccc;
  }

  &:focus {
    border 2px solid var(--primary-hovered);
  }

  &::placeholder {
    color: var(--text-grey);
  }
`;

const Select = ({
  label = "",
  disabled = false,
  mt,
  mb,
  helper = "",
  helperColor = "",
  placeholder = "",
  options = [],
  labelColor = "var(--text-dark)",
  showRequiredIcon = false,
  ...rest
}) => {
  return (
    <UICore.Box mg="0px" pd="0px" mb={mb} mt={mt} textAlign="left">
      <UICore.Text color={labelColor} as="label">
        {rest.required ? (
          <>
            {showRequiredIcon && (
              <>
                <UICore.Badge
                  aria-label="required"
                  data-balloon-pos="right"
                  bg="var(--color-5)"
                  color="var(--color-2)"
                >
                  *
                </UICore.Badge>
                <UICore.Space amount={1} />{" "}
              </>
            )}
          </>
        ) : null}
        {label}
        <StyledSelect disabled={disabled} {...rest}>
          <option selected={rest?.value ? false : true} disabled value="">
            {placeholder || "select..."}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </StyledSelect>
        <UICore.Text
          size="sm"
          mt="4px"
          mb="0px"
          weight="300"
          color={helperColor || "var(--text-grey)"}
        >
          {helper}
        </UICore.Text>
      </UICore.Text>
    </UICore.Box>
  );
};

export default Select;
