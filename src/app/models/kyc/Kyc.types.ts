/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  authority: string;
}
export type ExecuteMsg = {
  update_params: UpdateParamsMsg;
} | {
  register_provider: RegisterProviderMsg;
} | {
  update_provider: UpdateProviderMsg;
} | {
  create_verification: CreateVerificationMsg;
} | {
  remove_verification: RemoveVerificationMsg;
} | {
  request_information: RequestInformationMsg;
} | {
  approve_information_request: ApproveInformationRequestMsg;
} | {
  reject_information_request: RejectInformationRequestMsg;
} | {
  remove_information_request: RemoveInformationRequestMsg;
};
export type Decimal = string;
export type Uint128 = string;
export interface UpdateParamsMsg {
  authority?: string | null;
}
export interface RegisterProviderMsg {
  address: string;
  customer_fee_back_rate: Decimal;
  details: string;
  identity: string;
  information_fee: Coin;
  name: string;
  security_contact: string;
  website: string;
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export interface UpdateProviderMsg {
  address?: string | null;
  customer_fee_back_rate?: Decimal | null;
  details?: string | null;
  id: number;
  identity?: string | null;
  information_fee?: Coin | null;
  name?: string | null;
  security_contact?: string | null;
  website?: string | null;
}
export interface CreateVerificationMsg {
  customer: string;
  provider_id: number;
}
export interface RemoveVerificationMsg {
  customer: string;
  provider_id: number;
}
export interface RequestInformationMsg {
  customer: string;
  email: string;
  provider_id: number;
}
export interface ApproveInformationRequestMsg {
  request_id: number;
}
export interface RejectInformationRequestMsg {
  request_id: number;
}
export interface RemoveInformationRequestMsg {
  customer: string;
  request_id: number;
}
export type QueryMsg = {
  params: {};
} | {
  providers: {};
} | {
  verifications: {
    address: string;
  };
} | {
  information_requests: {
    address: string;
  };
};
export type Addr = string;
export type ArrayOfInformationRequest = InformationRequest[];
export interface InformationRequest {
  approved?: boolean | null;
  customer: Addr;
  email: string;
  id: number;
  information_fee: Coin;
  provider_id: number;
  sender: Addr;
}
export interface Params {
  authority: Addr;
}
export type ArrayOfProvider = Provider[];
export interface Provider {
  address: Addr;
  customer_fee_back_rate: Decimal;
  details: string;
  id: number;
  identity: string;
  information_fee: Coin;
  name: string;
  security_contact: string;
  website: string;
}
export type ArrayOfVerification = Verification[];
export interface Verification {
  address: Addr;
  provider_id: number;
}