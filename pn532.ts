namespace PN532 {

    let savedUID = ""

    //% block="initialize PN532"
    export function init(): void {
        basic.pause(100)
    }

    //% block="scan NFC card"
    export function scanCard(): string {

        let uid = ""

        pins.i2cWriteNumber(
            0x24,
            0x00,
            NumberFormat.UInt8LE,
            false
        )

        basic.pause(100)

        let buffer = pins.i2cReadBuffer(0x24, 4)

        for (let i = 0; i < buffer.length; i++) {
            uid += buffer[i].toString()
        }

        return uid
    }

    //% block="save last card"
    export function saveCard(): void {
        savedUID = scanCard()
    }

    //% block="get saved card"
    export function getSavedCard(): string {
        return savedUID
    }

    //% block="compare scanned with saved"
    export function compareCard(): boolean {
        return scanCard() == savedUID
    }

    //% block="write text %data"
    export function writeText(data: string): void {

        let buf = pins.createBuffer(data.length)

        for (let i = 0; i < data.length; i++) {
            buf[i] = data.charCodeAt(i)
        }

        pins.i2cWriteBuffer(0x24, buf)
    }
}
