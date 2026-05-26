PN532.init()

basic.forever(function () {

    PN532.scanCard()

    basic.pause(2000)

})

input.onButtonPressed(Button.A, function () {

    PN532.clearLogs()

})