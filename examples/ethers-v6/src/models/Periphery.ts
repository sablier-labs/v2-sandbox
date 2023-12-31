import { Contract, ethers } from "ethers";
import _ from "lodash";
import { ABI, SEPOLIA_CHAIN_ID, contracts } from "../constants";
import type {
  IBatchCreateWithDeltas,
  IBatchCreateWithDurations,
  IBatchCreateWithMilestones,
  IBatchCreateWithRange,
} from "../types";

export default class Periphery {
  static async doBatchCreateLinearWithDurationsRaw(signer: ethers.Signer, payload: IBatchCreateWithDurations) {
    const contract_batch = new Contract(contracts[SEPOLIA_CHAIN_ID].SablierV2Batch, ABI.SablierV2Batch.abi, signer);

    const data = _.clone(payload);
    const you = await signer.getAddress();
    data[2].map((_item, index) => {
      if (data[2][index][0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
        data[2][index][0] = you;
      }
    });

    console.info("Payload", data);
    /**
     * Remember to spread the arguments.
     * The core generators use a single base parameter, while the batch generators expect 3.
     */
    const tx = await contract_batch.createWithDurations.send(...data);
    return tx.wait();
  }

  static async doBatchCreateLinearWithRangeRaw(signer: ethers.Signer, payload: IBatchCreateWithRange) {
    const contract_batch = new Contract(contracts[SEPOLIA_CHAIN_ID].SablierV2Batch, ABI.SablierV2Batch.abi, signer);

    const data = _.clone(payload);
    const you = await signer.getAddress();
    data[2].map((_item, index) => {
      if (data[2][index][0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
        data[2][index][0] = you;
      }
    });

    console.info("Payload", data);
    /**
     * Remember to spread the arguments.
     * The core generators use a single base parameter, while the batch generators expect 3.
     */
    const tx = await contract_batch.createWithRange.send(...data);
    return tx.wait();
  }

  static async doBatchCreateDynamicWithMilestonesRaw(signer: ethers.Signer, payload: IBatchCreateWithMilestones) {
    const contract_batch = new Contract(contracts[SEPOLIA_CHAIN_ID].SablierV2Batch, ABI.SablierV2Batch.abi, signer);

    const data = _.clone(payload);
    const you = await signer.getAddress();
    data[2].map((_item, index) => {
      if (data[2][index][0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
        data[2][index][0] = you;
      }
    });

    console.info("Payload", data);
    /**
     * Remember to spread the arguments.
     * The core generators use a single base parameter, while the batch generators expect 3.
     */
    const tx = await contract_batch.createWithMilestones.send(...data);
    return tx.wait();
  }

  static async doBatchCreateDynamicWithDeltasRaw(signer: ethers.Signer, payload: IBatchCreateWithDeltas) {
    const contract_batch = new Contract(contracts[SEPOLIA_CHAIN_ID].SablierV2Batch, ABI.SablierV2Batch.abi, signer);

    const data = _.clone(payload);
    const you = await signer.getAddress();
    data[2].map((_item, index) => {
      if (data[2][index][0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
        data[2][index][0] = you;
      }
    });

    console.info("Payload", data);
    /**
     * Remember to spread the arguments.
     * The core generators use a single base parameter, while the batch generators expect 3.
     */
    const tx = await contract_batch.createWithDeltas.send(...data);
    return tx.wait();
  }
}
