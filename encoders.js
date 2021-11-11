const FIRST_LOWER_LETTER_CODE = 97;
const LAST_LOWER_LETTER_CODE = 122;
const FIRST_UPPER_LETTER_CODE = 65;
const LAST_UPPER_LETTER_CODE = 90;

const encodeDecodeCaesar = (str, flag) => {
    let newString = '';
    if (flag === 1) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= FIRST_UPPER_LETTER_CODE && str.charCodeAt(i) < LAST_UPPER_LETTER_CODE) {
                newString += String.fromCharCode(str.charCodeAt(i) + 1);
            } else if (str.charCodeAt(i) === LAST_UPPER_LETTER_CODE) {
                newString += String.fromCharCode(FIRST_UPPER_LETTER_CODE);
            } else if (str.charCodeAt(i) >= FIRST_LOWER_LETTER_CODE && str.charCodeAt(i) < LAST_LOWER_LETTER_CODE) {
                newString += String.fromCharCode(str.charCodeAt(i) + 1);
            } else if (str.charCodeAt(i) === LAST_LOWER_LETTER_CODE) {
                newString += String.fromCharCode(FIRST_LOWER_LETTER_CODE);
            } else {
                newString += str[i];
            }
        }
    }
    if (flag === 0) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > FIRST_UPPER_LETTER_CODE && str.charCodeAt(i) <= LAST_UPPER_LETTER_CODE) {
                newString += String.fromCharCode(str.charCodeAt(i) - 1);
            } else if (str.charCodeAt(i) === FIRST_UPPER_LETTER_CODE) {
                newString += String.fromCharCode(LAST_UPPER_LETTER_CODE);
            } else if (str.charCodeAt(i) > FIRST_LOWER_LETTER_CODE && str.charCodeAt(i) <= LAST_LOWER_LETTER_CODE) {
                newString += String.fromCharCode(str.charCodeAt(i) - 1);
            } else if (str.charCodeAt(i) === FIRST_LOWER_LETTER_CODE) {
                newString += String.fromCharCode(LAST_LOWER_LETTER_CODE);
            } else {
                newString += str[i];
            }
        }
    }

    return newString;
}

const encodeDecodeROT8 = (str, flag) => {
    let newString = '';
    if (flag === 1) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= FIRST_UPPER_LETTER_CODE && str.charCodeAt(i) <= LAST_UPPER_LETTER_CODE) {
                if (str.charCodeAt(i) + 8 > LAST_UPPER_LETTER_CODE) {
                    newString += String.fromCharCode(FIRST_UPPER_LETTER_CODE + (str.charCodeAt(i) + 8 - LAST_UPPER_LETTER_CODE) - 1);
                } else {
                    newString += String.fromCharCode(str.charCodeAt(i) + 8);
                }
            } else if (str.charCodeAt(i) >= FIRST_LOWER_LETTER_CODE && str.charCodeAt(i) <= LAST_LOWER_LETTER_CODE) {
                if (str.charCodeAt(i) + 8 > LAST_LOWER_LETTER_CODE) {
                    newString += String.fromCharCode(FIRST_LOWER_LETTER_CODE + (str.charCodeAt(i) + 8 - LAST_LOWER_LETTER_CODE) - 1);
                } else {
                    newString += String.fromCharCode(str.charCodeAt(i) + 8);
                }
            } else {
                newString += str[i];
            }
        }
    }
    if (flag === 0) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= FIRST_UPPER_LETTER_CODE && str.charCodeAt(i) <= LAST_UPPER_LETTER_CODE) {
                if (str.charCodeAt(i) - 8 < FIRST_UPPER_LETTER_CODE) {
                    newString += String.fromCharCode(LAST_UPPER_LETTER_CODE - (FIRST_UPPER_LETTER_CODE - (str.charCodeAt(i) - 8)) + 1);
                } else {
                    newString += String.fromCharCode(str.charCodeAt(i) - 8);
                }
            } else if (str.charCodeAt(i) >= FIRST_LOWER_LETTER_CODE && str.charCodeAt(i) <= LAST_LOWER_LETTER_CODE) {
                if (str.charCodeAt(i) - 8 < FIRST_LOWER_LETTER_CODE) {
                    newString += String.fromCharCode(LAST_LOWER_LETTER_CODE - (FIRST_LOWER_LETTER_CODE - (str.charCodeAt(i) - 8)) + 1);
                } else {
                    newString += String.fromCharCode(str.charCodeAt(i) - 8);
                }
            } else {
                newString += str[i];
            }
        }
    }

    return newString;
}


const encodeDecodeAtbash = (str) => {
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedUpperAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedLowerAlphabet = 'zyxwvutsrqponmlkjihgfedcba';
    let newString = '';
    for (let i = 0; i < str.length; i++) {
        if (upperAlphabet.indexOf(str[i]) !== -1) {
            newString += reversedUpperAlphabet.charAt(upperAlphabet.indexOf(str[i]));
        } else if (lowerAlphabet.indexOf(str[i]) !== -1) {
            newString += reversedLowerAlphabet.charAt(lowerAlphabet.indexOf(str[i]));
        } else {
            newString += str[i];
        }
    }

    return newString;
}

module.exports = {encodeDecodeCaesar, encodeDecodeROT8, encodeDecodeAtbash}