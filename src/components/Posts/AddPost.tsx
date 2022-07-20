import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { uploadPostPhoto } from "../../redux/features/Posts/services";
import { createPost } from "../../redux/features/Posts/thunk";
import { FlexCenter } from "../../styles/globals";
import { PostType } from "../../types";
import { Button } from "../Button/Button";

export default function AddPost(): JSX.Element {
  const initalValues = {
    content: "",
    imageURL: "",
    imgAltText: "",
  };

  const [post, setPost] = useState<PostType>({
    content: "",
    imageURL: "",
    imgAltText: "",
  });

  const dispatch = useAppDispatch();

  const handleImage = async (file: any) => {
    const url = await uploadPostPhoto(file);
    console.log(url);
    setPost((post) => ({ ...post, imageURL: url }));
  };

  return (
    <Container>
      <Textarea
        id="post-text"
        value={post?.content}
        placeholder="Whats on your mind?"
        onChange={(e) =>
          setPost((post) => ({ ...post, content: e.target.value }))
        }></Textarea>
      <label htmlFor="post-image-input">
        <PostImageInput
          type="file"
          name="imageURL"
          id="post-image-input"
          onChange={(e: any) => handleImage(e.target.files[0])}
        />
        <FileEmojiPicker>
          <FlexCenter className="icon">
            <AiOutlineCamera />
          </FlexCenter>
          <FlexCenter className="icon">
            <BsEmojiSmile />
          </FlexCenter>
        </FileEmojiPicker>
      </label>
      {post?.imageURL && (
        <>
          <FlexCenter>
            <PostImg
              src={post.imageURL}
              alt={post.imgAltText}
              width={400}
              height={300}
            />
          </FlexCenter>
          <FlexCenter>
            <ImgAltText
              type="text"
              placeholder="ALT Text for the image"
              value={post?.imgAltText}
              onChange={(e) =>
                setPost((post) => ({ ...post, imgAltText: e.target.value }))
              }
            />
          </FlexCenter>
        </>
      )}
      <BtnGroup>
        <Button
          variant="primary__outline"
          radius={0.25}
          onClick={() => setPost(initalValues)}>
          Cancel
        </Button>
        <Button
          variant="primary__block"
          radius={0.25}
          onClick={() => dispatch(createPost(post))}>
          Post
        </Button>
      </BtnGroup>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.violet8};
`;

const Textarea = styled.textarea`
  min-height: 6rem;
  width: 100%;
  resize: none;
  font-family: inherit;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  color: ${(props) => props.theme.colors.violet12};
  background-color: ${(props) => props.theme.colors.violet3};
  border: 0;

  ::placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.colors.slate11};
  }

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet8};
  }
`;

const ImgAltText = styled.input`
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  background-color: inherit;
  border: 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.violet12};
  box-shadow: 0 0 4px ${(props) => props.theme.colors.gray7};
  border-radius: 0.25rem;

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet8};
    box-shadow: 0 0 4px ${(props) => props.theme.colors.violet9};
  }
`;

const PostImg = styled.img``;

const PostImageInput = styled.input`
  display: none;
`;

const FileEmojiPicker = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;

  .icon {
    color: ${(props) => props.theme.colors.violet9};
    background-color: ${(props) => props.theme.colors.violet3};
    border: 1px solid ${(props) => props.theme.colors.violet7};
    border-radius: 50%;
    padding: 0.25rem;
    cursor: pointer;
    bottom: 0;

    :hover {
      background-color: ${(props) => props.theme.colors.violet4};
    }

    :active {
      background-color: ${(props) => props.theme.colors.violet5};
    }
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
