import styled from "styled-components";
import Transaction from "../../../models/Transaction";
import { useCallback } from "react";
import _ from "lodash";
import {
  APPROVE_LINEAR,
  APPROVE_DYNAMIC,
  LOCKUP_LINEAR_WITH_DURATIONS,
  LOCKUP_LINEAR_WITH_RANGE,
  LOCKUP_DYNAMIC_WITH_DELTAS,
  LOCKUP_DYNAMIC_WITH_MILESTONES,
} from "../../../constants/data";
import { useAccount } from "wagmi";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`;

const Box = styled.div`
  grid-column: span 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 6px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 8px;

  & > p {
    color: ${(props) => props.theme.colors.dark};
    span {
      color: ${(props) => props.theme.colors.orange};
    }
  }

  &[data-type="dynamic"] {
    & > p span {
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;
const Button = styled.button``;

function Headless() {
  const { isConnected } = useAccount();

  const onApproveLinear = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doApprove(...APPROVE_LINEAR, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onApproveDynamic = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doApprove(...APPROVE_DYNAMIC, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupLinearWithDurations = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doCreateLinearWithDurationsRaw(
          LOCKUP_LINEAR_WITH_DURATIONS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupLinearWithRange = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doCreateLinearWithRangeRaw(LOCKUP_LINEAR_WITH_RANGE);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupDynamicWithDeltas = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doCreateDynamicWithDeltasRaw(
          LOCKUP_DYNAMIC_WITH_DELTAS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupDynamicWithMilestones = useCallback(async () => {
    if (isConnected) {
      try {
        await Transaction.doCreateDynamicWithMilestonesRaw(
          LOCKUP_DYNAMIC_WITH_MILESTONES
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  return (
    <Wrapper>
      <Box>
        <Header>
          <p>
            <b>Allow Lockup Linear to spend tokens</b>
          </p>
        </Header>
        <Button onClick={onApproveLinear}>Approve</Button>
      </Box>

      <Box>
        <Header>
          <p>
            <b>Allow Lockup Dynamic to spend tokens</b>
          </p>
        </Header>
        <Button onClick={onApproveDynamic}>Approve</Button>
      </Box>
      <Box>
        <Header>
          <p>
            <b>
              Linear Lockup stream <span>with Durations</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupLinearWithDurations}>Create</Button>
      </Box>

      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Linear Dynamic stream <span>with Deltas</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupDynamicWithDeltas}>Create</Button>
      </Box>
      <Box>
        <Header>
          <p>
            <b>
              Linear Lockup stream <span>with Range</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupLinearWithRange}>Create</Button>
      </Box>
      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Linear Dynamic stream <span>with Milestones</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupDynamicWithMilestones}>Create</Button>
      </Box>
    </Wrapper>
  );
}

export default Headless;
