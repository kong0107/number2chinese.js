Number.prototype.toChinese = function() {
    const characters = {
        traditional: {
            lower: {
                digits: "零一二三四五六七八九",
                tens: "十百千",
                wans: "萬億兆京垓秭穰溝澗正載"
            },
            upper: {
                digits: "零壹貳參肆伍陸柒捌玖",
                tens: "拾佰仟",
                wans: "萬億兆京垓秭穰溝澗正載"
            }
        },
        simplified: {
            lower: {
                digits: "零一二三四五六七八九",
                tens: "十百千",
                wans: "万亿兆京垓秭穰沟涧正载"
            },
            upper: {
                digits: "零壹贰叁肆伍陆柒捌玖",
                tens: "拾佰仟",
                wans: "万亿兆京垓秭穰沟涧正载"
            }
        }
    };
    characters.T = characters.t = characters.traditional;
    characters.S = characters.s = characters.simplified;
    
    return function(script, set) {
        if(!script || !characters[script]) script = "traditional";
        if(!set || !characters[script][set]) set = "lower";
        const digits = characters[script][set].digits;
        const tens = characters[script][set].tens;
        const wans = characters[script][set].wans;
        
        let result = "";
        let arr = this.toString().split("").map(d=>parseInt(d)).reverse();
        for(let i = 0; i < arr.length; ++i) {
            let d = arr[i];
            let t = i % 4;
            let w = Math.floor(i / 4);
            
            if(t) {
                if(d) result += tens.charAt(t-1);
            }
            else if(w) result += wans.charAt(w-1);
            
            if(d) result += digits.charAt(d);
            else {
                if(t && i && arr[i-1]) result += digits.charAt(0);
            }
        }
        return result.split("").reverse().join("");
    }
}();
