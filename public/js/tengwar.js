function output(line)
{
    document.getElementById("output").innerHTML += line
}

function convertToken(token)
{
    if ("aeiou".indexOf(token.charAt(0)) != -1) token = "q" + token
    if (token.length > 1) {
        var index = 1
        var len = token.length
        while (index < len) {
            if ("aoeui".indexOf(token.charAt(index)) != -1) {
                if ("lmnMN".indexOf(token.charAt(index-1)) != -1) {
                token = token.substr(0,index) + token.charAt(index).toUpperCase() + token.substr(index+1)
                }
            }
            if (token.charAt(index) == "n") {
                var penult = token.charAt(index-1)
                if (index == token.length -1 || "aoeui".indexOf(token.charAt(index+1)) == -1) {
                    if (penult == "o" || penult == "u")
                        var replace = "M"
                    else
                        var replace = "N"
                    token = token.substr(0,index) + replace + token.substr(index+1)
                }
            }
            index++
        }
    }
    return token
}

function convert()
{
    var alpha = "abcdefghijklmnopqrstuvwxyz"
    var terminators = "!?"
    var input = document.getElementById("input").value
    var index = 0
    var token = ""
    var curr = "?"
    var last = "?"
    document.getElementById("output").innerHTML = ""
    while (index < input.length) {
        if (curr != " ") last = curr
        var curr = input.charAt(index).toLowerCase()
        if (alpha.indexOf(curr) == -1) {
            // not an alpha character
            if (token != "") {
                output(convertToken(token))
                token = ""
            }
            output(curr)
        } else {
            if (terminators.indexOf(last) != -1) output(".")
            token = token + curr
        }
        index++
    }
    if (token != "") output(convertToken(token))
    if (curr != ".") output(".")
}