import styled from "styled-components";
import { useWeb3Context } from "../src/components/Web3";
import Account from "../src/components/Account";
import Forms from "../src/components/Forms";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px;
  gap: 48px;
`;

function Home() {
  const { address, error, status } = useWeb3Context();

  return (
    <Wrapper>
      <Container>
        <Account />
        <Forms />
      </Container>
    </Wrapper>
  );
}

export default Home;
