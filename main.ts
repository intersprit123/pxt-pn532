PN532.init()

basic.showIcon(IconNames.Happy)

basic.forever(function () {

    let uid = PN532.scanCard()

    if (uid != "") {

        basic.showString(uid)

    }

    basic.pause(1000)
})
