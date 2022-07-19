import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import styled from "styled-components";
import { FlexCenter } from "../../styles/globals";
import { PostType } from "../../types";
import { Button } from "../Button/Button";

export default function AddPost(): JSX.Element {
  const [post, setPost] = useState<PostType>({
    text: "",
    imageURL: "",
    imgAltText: "",
  });

  const handleImage = (event: any) => {
    console.log(event.target.files[0]);
  };

  return (
    <Container>
      <Textarea
        id="post-text"
        value={post?.text}
        placeholder="Whats' on your mind?"
        onChange={(e) =>
          setPost((post) => ({ ...post, text: e.target.value }))
        }></Textarea>
      <label htmlFor="post-image-input">
        <PostImageInput
          type="file"
          name="imageURL"
          id="post-image-input"
          onChange={(e: any) => {
            setPost((post) => ({ ...post, imageURL: e?.target?.files[0] }));
          }}
        />
        <FileEmojiPicker>
          <FlexCenter className="icon">
            <AiOutlineCamera />
          </FlexCenter>
        </FileEmojiPicker>
      </label>
      {post?.imageURL && (
        <>
          <FlexCenter>
            <PostImg
              src={post.imageURL}
              alt={post.imgAltText}
              width={300}
              height={200}
            />
          </FlexCenter>
          <ImgAltText
            type="text"
            value={post?.imgAltText}
            onChange={(e) =>
              setPost((post) => ({ ...post, text: e.target.value }))
            }
          />
        </>
      )}
      <BtnGroup>
        <Button variant="primary__outline" radius={0.25}>
          Cancel
        </Button>
        <Button variant="primary__block" radius={0.25}>
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
  display: block;
  width: 100%;
  padding: 0.5rem;
  min-height: 6rem;
`;

const PostImg = styled.img``;

const PostImageInput = styled.input`
  display: none;
`;

const FileEmojiPicker = styled.div`
  display: flex;
  gap: 2rem;
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
  gap: 1rem;
`;
