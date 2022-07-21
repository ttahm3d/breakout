import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "../Button/Button";
import * as ReactDOM from "react-dom";

type ModalType = {
  children: JSX.Element | string;
  header?: string;
  showModal: boolean;
  size?: "sm" | "md" | "lg";
  closeModal: () => void;
};

interface IModal {
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  children,
  header,
  showModal,
  closeModal,
  size = "sm",
}: ModalType) {
  return ReactDOM.createPortal(
    <>
      {showModal && (
        <StyledModalContainer onClick={closeModal}>
          <StyledModal size={size} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>{header}</div>
              <CloseIcon
                onClick={closeModal}
                icon={<AiOutlineClose fill="red" />}
              />
            </ModalHeader>
            <ModalText>{children}</ModalText>
          </StyledModal>
        </StyledModalContainer>
      )}
    </>,
    document.querySelector("#modal") as HTMLElement
  );
}

const StyledModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(37, 30, 64, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  transition: all 0.3s linear;
`;

const StyledModal = styled.div<IModal>`
  width: ${(props) => {
    if (props.size === "md") return `min(50rem, 90vw)`;
    return "30rem";
  }};
  max-height: 60vh;
  background-color: ${(props) => props.theme.colors.violet1};
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.pink5};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.pink8};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.pink9};
  }
`;

const ModalHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.violet2};
`;

const CloseIcon = styled(IconButton)`
  margin-left: auto;
  background-color: ${(props) => props.theme.colors.red3} !important;
  border: 1px solid ${(props) => props.theme.colors.red7};
  color: ${(props) => props.theme.colors.red10};

  :hover {
    background-color: ${(props) => props.theme.colors.red5};
  }

  :active {
    background-color: ${(props) => props.theme.colors.red6};
  }
`;

const ModalText = styled.div``;
