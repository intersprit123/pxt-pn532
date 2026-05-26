namespace PN532 {

    let SDA = DigitalPin.P0
    let SCL = DigitalPin.P1

    let storedText = ""

    function i2cDelay(): void {
        control.waitMicros(5)
    }

    function sclHigh(): void {
        pins.digitalWritePin(SCL, 1)
        i2cDelay()
    }

    function sclLow(): void {
        pins.digitalWritePin(SCL, 0)
        i2cDelay()
    }

    function sdaHigh(): void {
        pins.digitalWritePin(SDA, 1)
        i2cDelay()
    }

    function sdaLow(): void {
        pins.digitalWritePin(SDA, 0)
        i2cDelay()
    }

    function i2cStart(): void {

        sdaHigh()
        sclHigh()

        sdaLow()
        sclLow()
    }

    function i2cStop(): void {

        sdaLow()
        sclHigh()

        sdaHigh()
    }

    function writeByte(data: number): void {

        for (let i = 0; i < 8; i++) {

            if ((data & 0x80) != 0) {
                sdaHigh()
            } else {
                sdaLow()
            }

            sclHigh()
            sclLow()

            data <<= 1
        }

        sdaHigh()

        sclHigh()
        sclLow()
    }

    //% block="initialize PN532"
    export function init(): void {

        pins.digitalWritePin(SDA, 1)
        pins.digitalWritePin(SCL, 1)

        basic.pause(1000)

        basic.showIcon(IconNames.Happy)
    }

    //% block="scan NFC card"
    export function scanCard(): void {

        i2cStart()

        writeByte(0x48)

        writeByte(0x00)
        writeByte(0x00)
        writeByte(0xFF)
        writeByte(0x02)
        writeByte(0xFE)
        writeByte(0xD4)
        writeByte(0x4A)

        i2cStop()

        basic.showString("SCAN")

        serial.writeLine("NFC scanned")

        datalogger.log(
            datalogger.createCV("NFC", "SCAN")
        )
    }

    //% block="write text $text"
    export function writeText(text: string): void {

        storedText = text

        basic.showString(text)

        serial.writeString("Stored: ")
        serial.writeLine(text)

        datalogger.log(
            datalogger.createCV("TEXT", text)
        )
    }

    //% block="show stored text"
    export function showStoredText(): void {

        basic.showString(storedText)
    }

    //% block="clear NFC logs"
    export function clearLogs(): void {

        datalogger.deleteLog()

        basic.showIcon(IconNames.Yes)
    }
}