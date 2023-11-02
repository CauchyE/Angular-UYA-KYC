/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  CosmWasmClient,
  SigningCosmWasmClient,
  ExecuteResult,
} from '@cosmjs/cosmwasm-stargate';
import { StdFee } from '@cosmjs/amino';
import {
  InstantiateMsg,
  ExecuteMsg,
  Decimal,
  Uint128,
  UpdateParamsMsg,
  RegisterProviderMsg,
  Coin,
  UpdateProviderMsg,
  CreateVerificationMsg,
  RemoveVerificationMsg,
  RequestInformationMsg,
  ApproveInformationRequestMsg,
  RejectInformationRequestMsg,
  RemoveInformationRequestMsg,
  QueryMsg,
  Addr,
  ArrayOfInformationRequest,
  InformationRequest,
  Params,
  ArrayOfProvider,
  Provider,
  ArrayOfVerification,
  Verification,
} from './Kyc.types';
export interface KycReadOnlyInterface {
  contractAddress: string;
  params: () => Promise<Params>;
  providers: () => Promise<ArrayOfProvider>;
  verifications: ({
    address,
  }: {
    address: string;
  }) => Promise<ArrayOfVerification>;
  informationRequests: ({
    address,
  }: {
    address: string;
  }) => Promise<ArrayOfInformationRequest>;
}
export class KycQueryClient implements KycReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.params = this.params.bind(this);
    this.providers = this.providers.bind(this);
    this.verifications = this.verifications.bind(this);
    this.informationRequests = this.informationRequests.bind(this);
  }

  params = async (): Promise<Params> => {
    return this.client.queryContractSmart(this.contractAddress, {
      params: {},
    });
  };
  providers = async (): Promise<ArrayOfProvider> => {
    return this.client.queryContractSmart(this.contractAddress, {
      providers: {},
    });
  };
  verifications = async ({
    address,
  }: {
    address: string;
  }): Promise<ArrayOfVerification> => {
    return this.client.queryContractSmart(this.contractAddress, {
      verifications: {
        address,
      },
    });
  };
  informationRequests = async ({
    address,
  }: {
    address: string;
  }): Promise<ArrayOfInformationRequest> => {
    return this.client.queryContractSmart(this.contractAddress, {
      information_requests: {
        address,
      },
    });
  };
}
export interface KycInterface extends KycReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateParams: (
    {
      authority,
    }: {
      authority?: string;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  registerProvider: (
    {
      address,
      customerFeeBackRate,
      details,
      identity,
      informationFee,
      name,
      securityContact,
      website,
    }: {
      address: string;
      customerFeeBackRate: Decimal;
      details: string;
      identity: string;
      informationFee: Coin;
      name: string;
      securityContact: string;
      website: string;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  updateProvider: (
    {
      address,
      customerFeeBackRate,
      details,
      id,
      identity,
      informationFee,
      name,
      securityContact,
      website,
    }: {
      address?: string;
      customerFeeBackRate?: Decimal;
      details?: string;
      id: number;
      identity?: string;
      informationFee?: Coin;
      name?: string;
      securityContact?: string;
      website?: string;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  createVerification: (
    {
      customer,
      providerId,
    }: {
      customer: string;
      providerId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  removeVerification: (
    {
      customer,
      providerId,
    }: {
      customer: string;
      providerId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  requestInformation: (
    {
      customer,
      email,
      providerId,
    }: {
      customer: string;
      email: string;
      providerId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  approveInformationRequest: (
    {
      requestId,
    }: {
      requestId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  rejectInformationRequest: (
    {
      requestId,
    }: {
      requestId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  removeInformationRequest: (
    {
      customer,
      requestId,
    }: {
      customer: string;
      requestId: number;
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
}
export class KycClient extends KycQueryClient implements KycInterface {
  override client: SigningCosmWasmClient;
  sender: string;
  override contractAddress: string;

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateParams = this.updateParams.bind(this);
    this.registerProvider = this.registerProvider.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.createVerification = this.createVerification.bind(this);
    this.removeVerification = this.removeVerification.bind(this);
    this.requestInformation = this.requestInformation.bind(this);
    this.approveInformationRequest = this.approveInformationRequest.bind(this);
    this.rejectInformationRequest = this.rejectInformationRequest.bind(this);
    this.removeInformationRequest = this.removeInformationRequest.bind(this);
  }

  updateParams = async (
    {
      authority,
    }: {
      authority?: string;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_params: {
          authority,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  registerProvider = async (
    {
      address,
      customerFeeBackRate,
      details,
      identity,
      informationFee,
      name,
      securityContact,
      website,
    }: {
      address: string;
      customerFeeBackRate: Decimal;
      details: string;
      identity: string;
      informationFee: Coin;
      name: string;
      securityContact: string;
      website: string;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        register_provider: {
          address,
          customer_fee_back_rate: customerFeeBackRate,
          details,
          identity,
          information_fee: informationFee,
          name,
          security_contact: securityContact,
          website,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  updateProvider = async (
    {
      address,
      customerFeeBackRate,
      details,
      id,
      identity,
      informationFee,
      name,
      securityContact,
      website,
    }: {
      address?: string;
      customerFeeBackRate?: Decimal;
      details?: string;
      id: number;
      identity?: string;
      informationFee?: Coin;
      name?: string;
      securityContact?: string;
      website?: string;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_provider: {
          address,
          customer_fee_back_rate: customerFeeBackRate,
          details,
          id,
          identity,
          information_fee: informationFee,
          name,
          security_contact: securityContact,
          website,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  createVerification = async (
    {
      customer,
      providerId,
    }: {
      customer: string;
      providerId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_verification: {
          customer,
          provider_id: providerId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  removeVerification = async (
    {
      customer,
      providerId,
    }: {
      customer: string;
      providerId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_verification: {
          customer,
          provider_id: providerId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  requestInformation = async (
    {
      customer,
      email,
      providerId,
    }: {
      customer: string;
      email: string;
      providerId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        request_information: {
          customer,
          email,
          provider_id: providerId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  approveInformationRequest = async (
    {
      requestId,
    }: {
      requestId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        approve_information_request: {
          request_id: requestId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  rejectInformationRequest = async (
    {
      requestId,
    }: {
      requestId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        reject_information_request: {
          request_id: requestId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  removeInformationRequest = async (
    {
      customer,
      requestId,
    }: {
      customer: string;
      requestId: number;
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_information_request: {
          customer,
          request_id: requestId,
        },
      },
      fee,
      memo,
      _funds
    );
  };
}