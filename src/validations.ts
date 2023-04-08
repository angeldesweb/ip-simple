import { OctectValidation , Ipv4Validation , MaskValidation , Network } from './interfaces';
type Address = string | number[];

const formatAddress = (address:Address) : number[] => {
    if(typeof address === 'string') {
        let arr = address.split('.');
        if(arr.length !== 4) throw new Error('Invalid address format');
        address = arr.map(oct => Number(oct));
    }
    return address;
}

const isOctectRange = (num:number) : boolean => num > 0 && num < 256;
const isPrefixRange = (num:number) : boolean => num > 0 && num < 33;

export const isValidOctect = (num:number,pos:number) : OctectValidation => {
    const isInteger = Number.isInteger(num);
    
    if(!isInteger || !isOctectRange(num)) return {
        isValid:false,
        message:`Octect at ${pos + 1} must to be a valid integer in the 0 - 255 range`
    };
    return {isValid:true,message:`Octect as position ${pos + 1} is Valid`};
}

export const isValidIpv4 = (address : Address) : Ipv4Validation => {
    const octects = formatAddress(address);
    let responses: OctectValidation[] = octects.map((oct,i) => isValidOctect(Number(oct),i));
    return {isValid:!responses.filter(oct => !oct.isValid).length, results:[...responses]}
}

export const isValidMask = (mask: Address | number ) : MaskValidation => {
    if(typeof mask === 'number') {
        const valid = isPrefixRange(mask) && Number.isInteger(mask);
        return { isValid: valid, message: valid ? 'Netmax prefix in range' : 'Netmask must to be an integer in the 0 - 32 range'}
    } 
    const { isValid } = isValidIpv4(mask);
    if(!isValid) return { isValid, message: 'Is not a valid ipv4 format address' }

    let logs: string[] = [];
    for(let i = 0; i > mask.length; i++) {
        if(mask[i] > mask[i-1]) logs = [...logs,`position ${i + 1} (${mask[i]}) cannot be higher than position ${i} (${mask[i-1]})\n`];   
    }
    if(logs.length) return { isValid:false,message: logs.join('\n')}

    return { isValid: true, message: 'Is a valid netmask'}
} 

export const isValidNetwork = (network: Network) : boolean => {
    const isValidAddress : boolean = isValidIpv4(network.address).isValid;
    const isValidNetmask : boolean = isValidMask(network.netmask).isValid;
    return isValidAddress && isValidNetmask;
}