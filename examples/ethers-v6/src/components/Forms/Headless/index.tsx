import styled from "styled-components";
import { Core, ERC20, Periphery } from "../../../models";
import { useWeb3Context } from "../../Web3";
import { useCallback } from "react";
import _ from "lodash";
import {
  APPROVE_BATCH,
  APPROVE_LINEAR,
  APPROVE_DYNAMIC,
  LOCKUP_LINEAR_WITH_DURATIONS,
  LOCKUP_LINEAR_WITH_RANGE,
  LOCKUP_DYNAMIC_WITH_DELTAS,
  LOCKUP_DYNAMIC_WITH_MILESTONES,
  BATCH_LOCKUP_LINEAR_WITH_DURATIONS,
  BATCH_LOCKUP_LINEAR_WITH_RANGE,
  BATCH_LOCKUP_DYNAMIC_WITH_MILESTONES,
  BATCH_LOCKUP_DYNAMIC_WITH_DELTAS,
} from "../../../constants/data";

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
  const { signer } = useWeb3Context();

  const onApproveLinear = useCallback(async () => {
    if (signer) {
      try {
        await ERC20.doApprove(
          signer,
          ...APPROVE_LINEAR,
          (_value: string) => {}
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onApproveDynamic = useCallback(async () => {
    if (signer) {
      try {
        await ERC20.doApprove(
          signer,
          ...APPROVE_DYNAMIC,
          (_value: string) => {}
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onCreateLockupLinearWithDurations = useCallback(async () => {
    if (signer) {
      try {
        await Core.doCreateLinearWithDurationsRaw(
          signer,
          LOCKUP_LINEAR_WITH_DURATIONS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onCreateLockupLinearWithRange = useCallback(async () => {
    if (signer) {
      try {
        await Core.doCreateLinearWithRangeRaw(signer, LOCKUP_LINEAR_WITH_RANGE);
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onCreateLockupDynamicWithDeltas = useCallback(async () => {
    if (signer) {
      try {
        await Core.doCreateDynamicWithDeltasRaw(
          signer,
          LOCKUP_DYNAMIC_WITH_DELTAS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onCreateLockupDynamicWithMilestones = useCallback(async () => {
    if (signer) {
      try {
        await Core.doCreateDynamicWithMilestonesRaw(
          signer,
          LOCKUP_DYNAMIC_WITH_MILESTONES
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

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

function Group() {
  const { signer } = useWeb3Context();

  const onApproveBatch = useCallback(async () => {
    if (signer) {
      try {
        await ERC20.doApprove(signer, ...APPROVE_BATCH, (_value: string) => {});
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onBatchCreateLockupLinearWithDurations = useCallback(async () => {
    if (signer) {
      try {
        await Periphery.doBatchCreateLinearWithDurationsRaw(
          signer,
          BATCH_LOCKUP_LINEAR_WITH_DURATIONS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onBatchCreateLockupLinearWithRange = useCallback(async () => {
    if (signer) {
      try {
        await Periphery.doBatchCreateLinearWithRangeRaw(
          signer,
          BATCH_LOCKUP_LINEAR_WITH_RANGE
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onBatchCreateLockupDynamicWithMilestones = useCallback(async () => {
    if (signer) {
      try {
        await Periphery.doBatchCreateDynamicWithMilestonesRaw(
          signer,
          BATCH_LOCKUP_DYNAMIC_WITH_MILESTONES
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  const onBatchCreateLockupDynamicWithDeltas = useCallback(async () => {
    if (signer) {
      try {
        await Periphery.doBatchCreateDynamicWithDeltasRaw(
          signer,
          BATCH_LOCKUP_DYNAMIC_WITH_DELTAS
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [signer]);

  return (
    <Wrapper data-style={"batch"}>
      <Box>
        <Header>
          <p>
            <b>Allow Batch Periphery to spend tokens</b>
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
      <Group />
    </>
  );
}
export default Headless;
