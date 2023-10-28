const SABLIER_V2_PROXY_TARGET = [
  {
    inputs: [
      {
        internalType: "contract IAllowanceTransfer",
        name: "permit2",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CallNotDelegateCall",
    type: "error",
  },
  {
    inputs: [],
    name: "SablierV2ProxyTarget_BatchSizeZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "msgValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creditAmount",
        type: "uint256",
      },
    ],
    name: "SablierV2ProxyTarget_CreditAmountMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract ISablierV2Lockup",
            name: "lockup",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "streamIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct Batch.CancelMultiple[]",
        name: "batch",
        type: "tuple[]",
      },
      {
        internalType: "contract IERC20[]",
        name: "assets",
        type: "address[]",
      },
    ],
    name: "batchCancelMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "delta",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.SegmentWithDelta[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct Batch.CreateWithDeltas[]",
        name: "batch",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "batchCreateWithDeltas",
    outputs: [
      {
        internalType: "uint256[]",
        name: "streamIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "total",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct Batch.CreateWithDurations[]",
        name: "batch",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "batchCreateWithDurations",
    outputs: [
      {
        internalType: "uint256[]",
        name: "streamIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "startTime",
            type: "uint40",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "milestone",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.Segment[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct Batch.CreateWithMilestones[]",
        name: "batch",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "batchCreateWithMilestones",
    outputs: [
      {
        internalType: "uint256[]",
        name: "streamIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "start",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "end",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Range",
            name: "range",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct Batch.CreateWithRange[]",
        name: "batch",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "batchCreateWithRange",
    outputs: [
      {
        internalType: "uint256[]",
        name: "streamIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "delta",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.SegmentWithDelta[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithDeltas",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "cancelAndCreateWithDeltas",
    outputs: [
      {
        internalType: "uint256",
        name: "newStreamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "total",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithDurations",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "cancelAndCreateWithDurations",
    outputs: [
      {
        internalType: "uint256",
        name: "newStreamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "startTime",
            type: "uint40",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "milestone",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.Segment[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithMilestones",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "cancelAndCreateWithMilestones",
    outputs: [
      {
        internalType: "uint256",
        name: "newStreamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "start",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "end",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Range",
            name: "range",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithRange",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "cancelAndCreateWithRange",
    outputs: [
      {
        internalType: "uint256",
        name: "newStreamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "contract IERC20[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "streamIds",
        type: "uint256[]",
      },
    ],
    name: "cancelMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "delta",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.SegmentWithDelta[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithDeltas",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "createWithDeltas",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "total",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithDurations",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "createWithDurations",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "startTime",
            type: "uint40",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "milestone",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.Segment[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithMilestones",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "createWithMilestones",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "start",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "end",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Range",
            name: "range",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithRange",
        name: "createParams",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
                  },
                  {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
                  },
                  {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
                  },
                ],
                internalType: "struct IAllowanceTransfer.PermitDetails",
                name: "details",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "sigDeadline",
                type: "uint256",
              },
            ],
            internalType: "struct IAllowanceTransfer.PermitSingle",
            name: "permitSingle",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct Permit2Params",
        name: "permit2Params",
        type: "tuple",
      },
    ],
    name: "createWithRange",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "renounce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "withdrawMax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Lockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "withdrawMaxAndTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "delta",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.SegmentWithDelta[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithDeltas",
        name: "createParams",
        type: "tuple",
      },
    ],
    name: "wrapAndCreateWithDeltas",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "total",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithDurations",
        name: "createParams",
        type: "tuple",
      },
    ],
    name: "wrapAndCreateWithDurations",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupDynamic",
        name: "dynamic",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "startTime",
            type: "uint40",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "UD2x18",
                name: "exponent",
                type: "uint64",
              },
              {
                internalType: "uint40",
                name: "milestone",
                type: "uint40",
              },
            ],
            internalType: "struct LockupDynamic.Segment[]",
            name: "segments",
            type: "tuple[]",
          },
        ],
        internalType: "struct LockupDynamic.CreateWithMilestones",
        name: "createParams",
        type: "tuple",
      },
    ],
    name: "wrapAndCreateWithMilestones",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "totalAmount",
            type: "uint128",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint40",
                name: "start",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "cliff",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "end",
                type: "uint40",
              },
            ],
            internalType: "struct LockupLinear.Range",
            name: "range",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "UD60x18",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithRange",
        name: "createParams",
        type: "tuple",
      },
    ],
    name: "wrapAndCreateWithRange",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export default SABLIER_V2_PROXY_TARGET;
