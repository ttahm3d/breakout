import styled from "styled-components";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserInfo } from "../../redux/features/User/thunk";
import { Members } from "../../components";
import Posts from "./Posts";
import { FlexCenter } from "../../styles/globals";
import LikedPosts from "./LikedPosts";

interface ITab {
  active: boolean;
}

export default function LandingPage(): JSX.Element {
  const [tab, setTab] = useState<string>("posts");

  const { userName } = useParams();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.userReducer);

  useEffect(() => {
    if (userName) {
      dispatch(getUserInfo(userName));
    }
  }, [userName, dispatch, user?.following?.length, user?.followers?.length]);

  return (
    <Container>
      <div className="left-side">
        <ProfileHeader />
        <div className="tab__div">
          <TabHeader active={tab === "posts"} onClick={() => setTab("posts")}>
            <FlexCenter>Posts</FlexCenter>
          </TabHeader>
          <TabHeader active={tab === "likes"} onClick={() => setTab("likes")}>
            <FlexCenter>Liked Posts</FlexCenter>
          </TabHeader>
        </div>
        {tab === "posts" ? <Posts /> : <LikedPosts />}
      </div>
      <div className="right-side">
        <Members />
      </div>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 0.5rem;
  padding: 0.5rem 0;

  .tab__div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid ${(props) => props.theme.colors.violet7};
  }

  .right-side {
    border-left: 1px solid ${(props) => props.theme.colors.violet7};
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .right-side {
      border: none;
    }
  }
`;

const TabHeader = styled.div<ITab>`
  cursor: pointer;
  padding: 0.5rem 0;
  align-self: center;
  transition: 0.3s all linear;
  font-weight: ${(props) => {
    if (props.active) return 600;
    return 600;
  }};
  background-color: ${(props) => {
    if (props.active) return props.theme.colors.violet6;
    return props.theme.colors.violet1;
  }};
  color: ${(props) => {
    if (props.active) return props.theme.colors.slate12;
    return props.theme.colors.slate11;
  }};
  /* border-bottom: ${(props) => {
    if (props.active) return `1px solid ${props.theme.colors.plum7}`;
    return `1px solid transparent`;
  }};

  :first-child {
    border-right: 2px solid ${(props) => props.theme.colors.plum7};
  } */
`;
