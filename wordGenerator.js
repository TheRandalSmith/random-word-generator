function randNumberGen(max, min = 0) {
    if (min >= max) throw new Error(`Max must be > min; max:${max} min:${min}`);
    return Math.floor(Math.random() * (max - min) + min);
}


function flip() {
    return randNumberGen(1) === 1;
}

function getRandLetter(list) {
    let randNum = randNumberGen(list.length);
    return list[randNum];
}


export function makeWord(pattern, {alphabet}) {
    const newWord = [];

    for (let i = 0; i < pattern.length; i++) {
        let chosen = pattern[i];

        if (chosen[0] === '$') {
            newWord.push(chosen.slice(1));
        } else {
            let randLetter = getRandLetter(alphabet[chosen]);
            newWord.push(randLetter);
        }
    }
    return newWord.join('');
}

export function makeWordWithRules(pattern, {alphabet, illegal}) {
    let stopInfiniteLoop = 0;
    let followsRules = false;
    let newWord = '';
    
    while (!followsRules) {
        if (stopInfiniteLoop > 100) return;
        newWord = makeWord(pattern, {alphabet});

        // ensure new word doesn't break rules
        followsRules = illegal.every(rule => {
            return !RegExp(rule).test(newWord);
        });
        stopInfiniteLoop++;
    }
    return newWord;
}

export function makeWordCommon({alphabet, illegal}, choice) {
    return makeWordWithRules(choice, {alphabet, illegal});
}
