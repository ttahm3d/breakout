import styled from "styled-components";
import { Modal } from "../../../components";

type DialogProps = {
  showFollowersDialog: boolean;
  closeFollowersDialog: () => void;
};

export default function FollowersDialog({
  showFollowersDialog,
  closeFollowersDialog,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showFollowersDialog}
      closeModal={closeFollowersDialog}
      header="Followers">
      <Container>Followers</Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
