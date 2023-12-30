import styled from "styled-components";
import { Core, ERC20, Periphery } from "../../../models";
import { useCallback } from "react";
import _ from "lodash";
import {
  APPROVE_BATCH,
  APPROVE_LOCKUP_LINEAR,
  APPROVE_LOCKUP_DYNAMIC,
  BATCH_LOCKUP_LINEAR_WITH_DURATIONS,
  BATCH_LOCKUP_LINEAR_WITH_RANGE,
  BATCH_LOCKUP_DYNAMIC_WITH_MILESTONES,
  BATCH_LOCKUP_DYNAMIC_WITH_DELTAS,
  LOCKUP_LINEAR_WITH_DURATIONS,
  LOCKUP_LINEAR_WITH_RANGE,
  LOCKUP_DYNAMIC_WITH_DELTAS,
  LOCKUP_DYNAMIC_WITH_MILESTONES,
} from "../../../constants/data";
import { useAccount } from "wagmi";

const WrapperPartial = styled.div`
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
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray};
  margin: 16px 0;
`;

const Button = styled.button``;

const Wrapper = styled(WrapperPartial)`
  &[data-style="batch"] {
    & > ${Box} {
      background-color: #fefefe;
    }
  }
`;

function Single() {
  const { isConnected } = useAccount();

  const onApproveLinear = useCallback(async () => {
    if (isConnected) {
      try {
        await ERC20.doApprove(...APPROVE_LOCKUP_LINEAR, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onApproveDynamic = useCallback(async () => {
    if (isConnected) {
      try {
        await ERC20.doApprove(...APPROVE_LOCKUP_DYNAMIC, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupLinearWithDurations = useCallback(async () => {
    if (isConnected) {
      try {
        await Core.doCreateLinearWithDurationsRaw(LOCKUP_LINEAR_WITH_DURATIONS);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupLinearWithRange = useCallback(async () => {
    if (isConnected) {
      try {
        await Core.doCreateLinearWithRangeRaw(LOCKUP_LINEAR_WITH_RANGE);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupDynamicWithDeltas = useCallback(async () => {
    if (isConnected) {
      try {
        await Core.doCreateDynamicWithDeltasRaw(LOCKUP_DYNAMIC_WITH_DELTAS);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onCreateLockupDynamicWithMilestones = useCallback(async () => {
    if (isConnected) {
      try {
        await Core.doCreateDynamicWithMilestonesRaw(
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
            <b>Allow Lockup Linear to spend DAI</b>
          </p>
        </Header>
        <Button onClick={onApproveLinear}>Approve</Button>
      </Box>

      <Box>
        <Header>
          <p>
            <b>Allow Lockup Dynamic to spend DAI</b>
          </p>
        </Header>
        <Button onClick={onApproveDynamic}>Approve</Button>
      </Box>
      <Box>
        <Header>
          <p>
            <b>
              Lockup Linear stream <span>with Durations</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupLinearWithDurations}>Create</Button>
      </Box>

      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Lockup Dynamic stream <span>with Deltas</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupDynamicWithDeltas}>Create</Button>
      </Box>
      <Box>
        <Header>
          <p>
            <b>
            Lockup Linear stream <span>with Range</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupLinearWithRange}>Create</Button>
      </Box>
      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Lockup Dynamic stream <span>with Milestones</span>
            </b>
          </p>
        </Header>
        <Button onClick={onCreateLockupDynamicWithMilestones}>Create</Button>
      </Box>
    </Wrapper>
  );
}

function Batch() {
  const { isConnected } = useAccount();

  const onApproveBatch = useCallback(async () => {
    if (isConnected) {
      try {
        await ERC20.doApprove(...APPROVE_BATCH, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onBatchCreateLockupLinearWithDurations = useCallback(async () => {
    if (isConnected) {
      try {
        await Periphery.doBatchCreateLinearWithDurationsRaw(
          BATCH_LOCKUP_LINEAR_WITH_DURATIONS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onBatchCreateLockupLinearWithRange = useCallback(async () => {
    if (isConnected) {
      try {
        await Periphery.doBatchCreateLinearWithRangeRaw(
          BATCH_LOCKUP_LINEAR_WITH_RANGE
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onBatchCreateLockupDynamicWithMilestones = useCallback(async () => {
    if (isConnected) {
      try {
        await Periphery.doBatchCreateDynamicWithMilestonesRaw(
          BATCH_LOCKUP_DYNAMIC_WITH_MILESTONES
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  const onBatchCreateLockupDynamicWithDeltas = useCallback(async () => {
    if (isConnected) {
      try {
        await Periphery.doBatchCreateDynamicWithDeltasRaw(
          BATCH_LOCKUP_DYNAMIC_WITH_DELTAS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isConnected]);

  return (
    <Wrapper data-style={"batch"}>
      <Box>
        <Header>
          <p>
            <b>Allow Batch Periphery to spend DAI</b>
          </p>
        </Header>
        <Button onClick={onApproveBatch}>Approve</Button>
      </Box>

      <div />
      <Box>
        <Header>
          <p>
            <b>
              Batch Lockup Linear <span>with Durations</span>
            </b>
          </p>
        </Header>
        <Button onClick={onBatchCreateLockupLinearWithDurations}>Create</Button>
      </Box>
      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Batch Lockup Dynamic <span>with Deltas</span>
            </b>
          </p>
        </Header>
        <Button onClick={onBatchCreateLockupDynamicWithDeltas}>Create</Button>
      </Box>
      <Box>
        <Header>
          <p>
            <b>
              Batch Lockup Linear <span>with Range</span>
            </b>
          </p>
        </Header>
        <Button onClick={onBatchCreateLockupLinearWithRange}>Create</Button>
      </Box>
      <Box>
        <Header data-type={"dynamic"}>
          <p>
            <b>
              Batch Lockup Dynamic <span>with Milestones</span>
            </b>
          </p>
        </Header>
        <Button onClick={onBatchCreateLockupDynamicWithMilestones}>
          Create
        </Button>
      </Box>
    </Wrapper>
  );
}

function Headless() {
  return (
    <>
      <Single />
      <Divider />
      <Batch />
    </>
  );
}
export default Headless;
