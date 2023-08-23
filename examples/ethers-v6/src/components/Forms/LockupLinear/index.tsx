import styled from "styled-components";
import {
  Amount,
  Cancelability,
  Cliff,
  Token,
  Recipient,
  Duration,
} from "./fields";
import { useCallback } from "react";
import Stream from "../../../model/Stream";
import { useWeb3Context } from "../../Web3";
import useStoreForm from "./store";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray};
  margin: 16px 0;
`;

const Button = styled.button``;

const Error = styled.p`
  color: ${(props) => props.theme.colors.red};
  margin-top: 16px;
`;

const Logs = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;

  label {
    font-weight: 700;
  }

  ul {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    margin: 0 !important;
  }
`;

const Actions = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function LockupLinear() {
  const { signer } = useWeb3Context();
  const { error, logs } = useStoreForm((state) => ({
    error: state.error,
    logs: state.logs,
  }));
  const onApprove = useCallback(() => {
    if (signer) {
      const state = useStoreForm.getState();
      Stream.doApprove(signer, state);
    }
  }, [signer]);

  const onCreate = useCallback(() => {
    if (signer) {
      const state = useStoreForm.getState();
      Stream.doCreateLinear(signer, state);
    }
  }, [signer]);

  return (
    <Wrapper>
      <Cancelability />
      <Token />
      <Amount />
      <Recipient />
      <Duration />
      <Divider />
      <Cliff />
      <Divider />
      <Actions>
        <Button onClick={onApprove}>Approve token spending</Button>
        <Button onClick={onCreate}>Create stream</Button>
      </Actions>
      {error ? <Error>{error}</Error> : false}
      {logs.length ? (
        <>
          <Divider />
          <Logs>
            <label>Logs</label>
            <ul>
              {logs.map((log) => (
                <li key={log}>{log}</li>
              ))}
            </ul>
          </Logs>
        </>
      ) : (
        false
      )}
    </Wrapper>
  );
}

export default LockupLinear;
