import { FinderArgs } from './interfaces';

export const finder = (args: FinderArgs) : string => {
    let binaryExpression = args.binaryAddress
    .map(oct => Array(8 - oct.split('').length).fill('0').join('') + oct)
    .join('').split('').fill(`${args.orientation}`,-args.bits).join('');

    return [
        binaryExpression.slice(0,8),
        binaryExpression.slice(8,16),
        binaryExpression.slice(16,24),
        binaryExpression.slice(24,32)
    ]
    .map(el => Number(`0b${el}`)).join('.');
}