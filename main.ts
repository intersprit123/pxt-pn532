PN532.init()

basic.forever(function () {

    let uid = PN532.scanCard()

    if (uid != "") {

        basic.showString(uid)

    }

    basic.pause(1000)
})