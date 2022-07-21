import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks";
import { editPostHandler } from "../../../redux/features/Posts/services";
import { editPost } from "../../../redux/features/Posts/thunk";
import { PostType } from "../../../types";
import Modal from "../../Modal/Modal";
import PostForm from "../Forms/PostForm";

type DialogProps = {
  showEditDialog: boolean;
  closeEditDialog: () => void;
  postData: any;
};

export default function EditDialog({
  showEditDialog,
  closeEditDialog,
  postData,
}: DialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: PostType = {
    content: postData?.content || "",
    imageURL: postData?.imageURL || "",
    imgAltText: postData?.imgAltText || "",
    isEdited: false,
    pid: postData?.pid,
  };

  const [post, setPost] = useState<PostType>({
    content: postData?.content || "",
    imageURL: postData?.imageURL || "",
    imgAltText: postData?.imgAltText || "",
    isEdited: true,
    pid: postData?.pid,
  });

  const isValidEdit = (initialValues: PostType, post: PostType) => {
    const { content: initContent } = initialValues;
    const { content } = post;

    const isValidAdd = post?.content !== "";
    const isValueSame = !(initContent === content);

    return isValidAdd && isValueSame;
  };

  const handleEditChanges = (post: PostType) => {
    dispatch(editPost(post));
    setPost({
      content: "",
      imageURL: "",
      imgAltText: "",
      isEdited: false,
    });
    closeEditDialog();
  };

  const actions = [
    {
      id: "cancel",
      text: "Cancel",
      variant: "primary__outline",
      disabled: false,
      onClickHandler: () => setPost(initialValues),
    },
    {
      id: "edit",
      text: "Save Changes",
      variant: "primary__block",
      disabled: !isValidEdit(initialValues, post),
      onClickHandler: () => handleEditChanges(post),
    },
  ];

  return (
    <Modal
      showModal={showEditDialog}
      closeModal={closeEditDialog}
      header="Edit post">
      <Container>
        <PostForm post={post} setPost={setPost} actions={actions} />
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
