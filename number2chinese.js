const number2chinese = function(){
    const characters = {
        traditional: {
            lower: {
                minus: "負",
                digits: "零一二三四五六七八九",
                tens: "十百千",
                wans: "萬億兆京垓秭穰溝澗正載"
            },
            upper: {
                minus: "負",
                digits: "零壹貳參肆伍陸柒捌玖",
                tens: "拾佰仟",
                wans: "萬億兆京垓秭穰溝澗正載"
            }
        },
        simplified: {
            lower: {
                minus: "负",
                digits: "零一二三四五六七八九",
                tens: "十百千",
                wans: "万亿兆京垓秭穰沟涧正载"
            },
            upper: {
                minus: "负",
                digits: "零壹贰叁肆伍陆柒捌玖",
                tens: "拾佰仟",
                wans: "万亿兆京垓秭穰沟涧正载"
            }
        }
    };
    characters.T = characters.t = characters.traditional;
    characters.S = characters.s = characters.simplified;

    return function(number, script, set) {
        if(!script || !characters[script]) script = "traditional";
        if(!set || !characters[script][set]) set = "lower";
        const c = characters[script][set];

        //let value = this.valueOf();
        let result = "", temp = "";
        let arr = Math.abs(number).toString().split("").map(d=>parseInt(d)).reverse();
        for(let w = 0; w < arr.length / 4; ++w) {
            for(let t = 0; t < 4; ++t) {
                let i = w * 4 + t;
                if(i == arr.length) break;
                let d = arr[i];

                if(t && d) temp += c.tens.charAt(t-1);
                if(d || (t && arr[i-1])) temp += c.digits.charAt(d);
            }
            if(temp) {
                if(w) result += c.wans.charAt(w-1);
                result += temp;
                temp = "";
            }
        }
        if(number < 0) result += c.minus;
        return result.split("").reverse().join("");
    }
}();

Number.prototype.toChinese = function(script, set) {
    return number2chinese(this.valueOf(), script, set);
}

if(typeof module != "undefined" && module.exports)
    module.exports = number2chinese;
