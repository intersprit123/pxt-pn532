namespace PN532 {

    const PN532_ADDR = 0x24
    let savedUID = ""

    //% block="initialize PN532"
    export function init(): void {

        let wakeup = pins.createBuffer(24)

        pins.i2cWriteBuffer(PN532_ADDR, wakeup)

        basic.pause(1000)
    }

    //% block="scan NFC card"
    export function scanCard(): string {

        let uid = ""

        let cmd = pins.createBuffer(7)

        cmd[0] = 0x00
        cmd[1] = 0x00
        cmd[2] = 0xFF
        cmd[3] = 0x04
        cmd[4] = 0xFC
        cmd[5] = 0xD4
        cmd[6] = 0x4A

        pins.i2cWriteBuffer(PN532_ADDR, cmd)

        basic.pause(500)

        let response = pins.i2cReadBuffer(PN532_ADDR, 20)

        for (let i = 13; i < 17; i++) {

            let val = response[i]

            if (val < 16) {
                uid += "0"
            }

            uid += val.toString()
        }

        return uid
    }

    //% block="save last scanned card"
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

        basic.showString(data)
    }
}