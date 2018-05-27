

String.prototype.pad = function(paddingChar, length) {
    if (this.length < length) {
        var paddingString = '';
        for (var i=0; i < (length-this.length); i++) {
            paddingString += paddingChar.toString();
        }
        return paddingString+this.valueOf();
    } else {
        return this.valueOf();
    }
}

Date.prototype.toLogString = function() {
    return this.getHours().toString().pad('0', 2) + ':'
    + this.getMinutes().toString().pad('0', 2) + ':'
    + this.getSeconds().toString().pad('0', 2) + '.'
    + this.getMilliseconds().toString().pad('0', 3);
}
