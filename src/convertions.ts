type Mask = string | number | number[];

export const ipv4MaskToPrefix = (arr: number[]) : number => {
    return arr.reduce((acc,oct) => 
    oct.toString(2).split('').reduce((acc,el) => Number(el) + acc , 0) + acc,0);
}

export const getMaskPrefix = (prefix: Mask) : number => {    
    if(typeof prefix !== 'number') {
        if(typeof prefix === 'string') prefix = prefix.split('.').map(oct => Number(oct));
        prefix = ipv4MaskToPrefix(prefix)
    }
    return prefix;
}

export const binaryOctects = (arr: number[]) : string[] => (arr.map((el:number) => el.toString(2)));
