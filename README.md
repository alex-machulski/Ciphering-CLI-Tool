# Ciphering-CLI-Tool

It is an application for encoding and decoding a text by 3 ciphers:

* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)

* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)
    
You can use the console or text document for text input / output. If you specify the path to the file for input in the config, reading will be from it, otherwise - from the console. The same with the text output. Only Latin letters are encrypted / decrypted, the case is preserved, the rest of the characters are not changed. The order of the arguments doesn't matter

## Getting started
1. Firstly, you should clone the repository.
2. Run command line, specify the path to the application.
3. Run the command ```node index``` with next options:
* ```-c``` or ```--config``` (required) - config cipher, which is a string with one cipher or cipher sequence separated by "-". Valid cipher options:
    * ```C1``` - for Caesar cipher encoding
    * ```C0``` - for Caesar cipher decoding
    * ```R1``` - for ROT-8 cipher encoding
    * ```R0``` - for ROT-8 cipher decoding
    * ```A``` - for Atbash cipher encoding/decoding
    
* ```-i``` or ```--input``` (optional) - a path to input file

* ```-o``` or ```--output``` (optional) - a path to output file

For example, config ```-c "C0-R1-A"``` means "decode by Caesar cipher => encode by ROT-8 cipher => use Atbash"


## Usage examples    
    node index --config "C1-R1"
    node index --input "./input.txt" -c "R1-R1-A"
    node index -c "C1-R1-A" -i "./input.txt" -o "./output.txt"


## Warnings
Application running will be interrupted in the following cases:
* The input and/or output arguments lead to a non-existent file or directory
* Any of the arguments is duplicated
* The cipher config (```-c``` / ```--config```) is invalid or missing
