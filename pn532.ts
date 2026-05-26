namespace PN532 {

    const PN532_ADDR = 0x24
    let savedUID = ""

    // Wake PN532
    //% block="initialize PN532"
    export function init(): void {

        let wakeup = pins.createBuffer(24)

        pins.i2cWriteBuffer(PN532_ADDR, wakeup)

        basic.pause(1000)
    }

    // Read NFC UID
    //% block="scan NFC card"
    export function scanCard(): string {

        let uid = ""

        // PN532 command buffer
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

            uid += val.toString(16)
        }

        return uid
    }

    // Save UID
    //% block="save last scanned card"
    export function saveCard(): void {

        savedUID = scanCard()
    }

    // Get Saved UID
    //% block="get saved card"
    export function getSavedCard(): string {

        return savedUID
    }

    // Compare UID
    //% block="compare scanned with saved"
    export function compareCard(): boolean {

        return scanCard() == savedUID
    }

    // Simple write placeholder
    //% block="write text %data"
    export function writeText(data: string): void {

        serial.writeLine("Write feature experimental")
        serial.writeLine(data)
    }
}
