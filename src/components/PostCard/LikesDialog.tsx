import styled from "styled-components";
import Modal from "../Modal/Modal";
import SmallUserCard from "../UserCard/SmallCard";

type DialogProps = {
  showLikesDialog: boolean;
  closeLikesDialog: () => void;
  likes: any;
};

export default function LikesDialog({
  showLikesDialog,
  closeLikesDialog,
  likes,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showLikesDialog}
      closeModal={closeLikesDialog}
      header="Liked by">
      <Container>
        {likes?.map((user: any) => (
          <SmallUserCard user={user} key={user?.uid} showBtn={false} />
        ))}
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
