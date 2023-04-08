//Args
export interface Network {
    address: string | number[];
    netmask: string | number | number[];
}

export interface FinderArgs {
    binaryAddress: string[];
    orientation: number;
    bits: number;
}

//Results
export interface Scope {
    prefix: number;
    hosts: number;
    utilHosts: number;
    network: string;
    broadcast: string;
}

//Methods
export interface Ipv4Handlers {
    validateAddress: () => Ipv4Validation;
    validateMask: () => MaskValidation;
    getScope: () => Scope;
}

//Validations
export interface Ipv4Validation {
    isValid: boolean;
    results: OctectValidation[];
}

export interface MaskValidation {
    isValid: boolean;
    message: string;
}

export interface OctectValidation {
    isValid: boolean;
    message: string;
}