import styled from "@emotion/styled";

const Button = styled("button")`
  min-width: 12rem;

  margin: 0 auto 20px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 2px;

  padding: 16px;

  border-radius: 5px;

  border: ${props => (props.primary ? "none" : "3px solid currentColor")};

  background: ${props =>
    props.primary && "linear-gradient(90deg, #FFD318, #F3E4A4)"};

  color: ${props => (props.primary ? "white" : "#D26AC2")};

  &:hover {
    opacity: 0.95;
  }

  @media (min-width: 768px) {
    margin: 0 20px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`;

export default Button;
