import styled from "styled-components";
import { Modal } from "../../../components";

type DialogProps = {
  showFollowingDialog: boolean;
  closeFollowingDialog: () => void;
};

export default function FollowingDialog({
  showFollowingDialog,
  closeFollowingDialog,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showFollowingDialog}
      closeModal={closeFollowingDialog}
      header="Following">
      <Container>Following Dialog</Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
