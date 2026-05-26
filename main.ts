PN532.init()

basic.showIcon(IconNames.Happy)

basic.forever(function () {

    let uid = PN532.scanCard()

    if (uid != "") {

        basic.showString(uid)

        serial.writeLine("CARD UID: " + uid)

    } else {

        basic.showIcon(IconNames.No)
    }

    basic.pause(1000)
})