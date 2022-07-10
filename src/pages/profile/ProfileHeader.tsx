import styled from "styled-components";
import { Button, Loader } from "../../components";
import { useAppSelector } from "../../hooks";

export default function ProfileHeader(): JSX.Element {
  const { user, loading } = useAppSelector((s) => s.userReducer);
  const { currentUser } = useAppSelector((s) => s.authReducer);

  if (loading) return <Loader />;

  return (
    <>
      <BannerSection>
        <Banner>
          <img src="https://picsum.photos/1000/400" alt="profile header" />
          <ProfileImage>
            <img src={user?.photoURL} alt={`${user?.firstName}'s profile`} />
          </ProfileImage>
        </Banner>
        <InfoContainer>
          <UserInfo>
            <FullName>
              {user?.firstName}&nbsp;{user?.lastName}
            </FullName>
            <UserName>&#64;{user?.userName}</UserName>
          </UserInfo>
          <>
            {user?.email === currentUser?.email ? (
              <Button variant="primary__cta" radius={0.25}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="primary__cta" radius={0.25}>
                Follow
              </Button>
            )}
          </>
        </InfoContainer>
      </BannerSection>
    </>
  );
}

const BannerSection = styled.section``;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem 0;

  @media screen and (max-width: 420px) {
    padding: 1.75rem 0.5rem 0;
  }
`;

const Banner = styled.div`
  position: relative;
`;

const ProfileImage = styled.div`
  position: absolute;
  top: 80%;
  width: 80px;
  left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    border: 4px solid ${(props) => props.theme.colors.slate1};
  }

  @media screen and (max-width: 540px) {
    img {
      width: 60px;
    }
  }
`;

const UserInfo = styled.div``;

const FullName = styled.div`
  font-size: clamp(1.25rem, 10vw, 1.75rem);
  font-weight: 600;
  margin: 0;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.colors.slate11};
`;
