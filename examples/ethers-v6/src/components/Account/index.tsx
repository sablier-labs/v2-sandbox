import styled from "styled-components";
import { useWeb3Context } from "../Web3";
import { useCallback } from "react";
import Transaction from "../../models/Transaction";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray};
  margin: 8px 0;
`;

const Error = styled.p`
  color: ${(props) => props.theme.colors.red};
`;

function Account() {
  const { address, error, status, signer } = useWeb3Context();

  const onMint = useCallback(async () => {
    if (signer) {
      try {
        await Transaction.doMint(
          signer,
          "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862"
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  return (
    <Wrapper>
      <b>Account</b>
      <Divider />
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
          <Divider />
          <p>
            <b>Mint Goerli DAI for Tests</b>
            <span> . . . </span>
            <button onClick={onMint}>Mint</button>
          </p>
        </>
      ) : (
        false
      )}
    </Wrapper>
  );
}

export default Account;
