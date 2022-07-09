import { Loader } from "../../components";
import { useAppSelector } from "../../hooks";
import { Content } from "../../styles/globals";

export default function Home() {
  const { loading } = useAppSelector((s) => s.authReducer);

  if (loading) return <Loader />;

  return (
    <Content>
      <h4>Home</h4>
    </Content>
  );
}
