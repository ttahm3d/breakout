import { getAuth } from "firebase/auth";
import { Content } from "../../styles/globals";

export default function Home() {
  const auth = getAuth();

  console.log(auth.currentUser);

  return (
    <Content>
      <h4>Home</h4>
    </Content>
  );
}
