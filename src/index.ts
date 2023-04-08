import { getMaskPrefix , binaryOctects } from "./convertions";
import { finder } from './tools';
import { isValidIpv4, isValidMask } from "./validations";
import { Network , Ipv4Handlers , Scope } from './interfaces';


export const ipv4Network = (network: Network) : Ipv4Handlers => {
    let address = network.address;
    let mask = network.netmask;
    let prefix : number = getMaskPrefix(mask);
    let bits = 32 - prefix;
    let binaryAddress : string[] = typeof address === 'string' ? binaryOctects(address.split('.').map(el => Number(el))) : binaryOctects(address);
    return {
        validateAddress: () => isValidIpv4(address),
        validateMask: () =>  isValidMask(mask),
        getScope: () : Scope => {
            let hosts = Math.pow(2,bits);
            let utilHosts = hosts - 2;
            let network = finder({binaryAddress,orientation:0,bits});
            let broadcast = finder({binaryAddress,orientation:1,bits});
            return {
                network,
                broadcast,
                prefix,
                hosts,
                utilHosts
            }
        }
    }
}

export { isValidIpv4, isValidMask , getMaskPrefix }

