const intToRoman = (num) => {
    let digits = String(+num).split(''),
        key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
            '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
            '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        romanNum = '',
        i = 3;
    while (i--) {
        romanNum = (key[+digits.pop() + (i * 10)] || '') + romanNum;
    }
    return Array(+digits.join('') + 1).join('M') + romanNum;
}

module.exports = intToRoman
