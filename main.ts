PN532.init()

basic.showIcon(IconNames.Happy)

basic.forever(function () {

    PN532.scanCard()

    basic.pause(1000)

})