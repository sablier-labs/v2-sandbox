import styled from "styled-components";
import { useWeb3Context } from "../Web3";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Error = styled.p`
  color: ${(props) => props.theme.colors.red};
`;

function Account() {
  const { address, error, status } = useWeb3Context();

  return (
    <Wrapper>
      {error ? (
        <Error>
          <b color={"red"}>Error:</b> {error}
        </Error>
      ) : (
        false
      )}
      {status === "connecting" ? (
        <p>
          <b>Status:</b> Connecting
        </p>
      ) : (
        false
      )}
      {status === "disconnected" ? (
        <p>
          <b>Status:</b> Not connected
        </p>
      ) : (
        false
      )}
      {status === "connected" ? (
        <>
          <p>
            <b>Status:</b> Connected
          </p>
          <p>
            <b>Address:</b> {address}
          </p>
        </>
      ) : (
        false
      )}
    </Wrapper>
  );
}

export default Account;
