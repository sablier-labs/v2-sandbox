import styled from "styled-components";
import { Cancelability, Segments, Token, Recipient } from "./fields";
import { useCallback } from "react";
import { Core, ERC20 } from "../../../models";
import { useWeb3Context } from "../../Web3";
import useStoreForm, { prefill } from "./store";
import _ from "lodash";
import { ethers } from "ethers";

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
  margin: 8px 0;
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
  & > div {
    height: 20px;
    width: 1px;
    background-color: ${(props) => props.theme.colors.gray};
    margin: 0px;
  }
`;

function LockupDynamic() {
  const { signer } = useWeb3Context();
  const { error, logs, update } = useStoreForm((state) => ({
    error: state.error,
    logs: state.logs,
    update: state.api.update,
  }));
  const onApprove = useCallback(async () => {
    if (signer) {
      const state = useStoreForm.getState();
      try {
        state.api.update({ error: undefined });
        await ERC20.doApprove(
          signer,
          "SablierV2LockupDynamic",
          {
            amount: (ethers.MaxUint256 / 10n ** 18n).toString(),
            token: state.token,
          },
          state.api.log
        );
      } catch (error) {
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [signer]);

  const onCreate = useCallback(async () => {
    if (signer) {
      const state = useStoreForm.getState();
      try {
        state.api.update({ error: undefined });
        await Core.doCreateDynamic(signer, state, state.api.log);
      } catch (error) {
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [signer]);

  const onPrefill = useCallback(() => {
    update(prefill);
  }, [update]);

  const onAdd = useCallback(() => {
    const state = useStoreForm.getState();
    const segments = _.clone(state.segments);
    update({
      segments: [
        ...segments,
        { amount: undefined, delta: undefined, exponent: undefined },
      ],
    });
  }, [update]);

  return (
    <Wrapper>
      <Cancelability />
      <Token />

      <Recipient />
      <Divider />
      <Segments />
      <Divider />
      <Actions>
        <Button onClick={onPrefill}>Prefill form</Button>
        <Button onClick={onAdd}>Add segment</Button>
        <div />
        <Button onClick={onApprove}>Approve token spending</Button>
        <Button onClick={onCreate}>Create LD stream</Button>
      </Actions>
      {error && <Error>{error}</Error>}
      {logs.length > 0 && (
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
      )}
    </Wrapper>
  );
}

export default LockupDynamic;
