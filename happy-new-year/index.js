const readline = require('readline');
const chalk = require('chalk');
const CFonts = require('cfonts');
const consolePng = require('console-png');
const fs = require('fs');

consolePng.attachTo(console);

const outStream = process.stdout;

const rl = readline.createInterface({
    input: process.stdin,
    output: outStream
});

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function randomStyle(text) {
    const styles = ['redBright','yellowBright', 'blueBright', 'cyanBright','greenBright', 'magentaBright', 'whiteBright'];
    const color = styles[Math.floor(Math.random() * styles.length)];
    return chalk[color](text);
}

function randomPos() {
    const x = Math.floor(30 * Math.random());
    const y = Math.floor(10 * Math.random());
    return [x, y];
}

readline.cursorTo(outStream, 0, 0);
readline.clearScreenDown(outStream);
 
var image = fs.readFileSync(__dirname + '/headpic.png');

const textArr = ['2021', '感谢', '大家的', '支持','2022', '我们','一起','加油！'];

(async function () {
    for(let i = 0; i< textArr.length; i++) {
        readline.cursorTo(outStream, ...randomPos());
        rl.write(randomStyle(textArr[i]));

        await delay(1000);
        readline.cursorTo(outStream, 0, 0);
        readline.clearScreenDown(outStream);
    }

    console.png(image);

    await delay(1000);
    const prettyFont = CFonts.render('|HAPPY|NEW YEAR', {font:'block', colors: ['blue', 'yellow']});

    let startX = 60;
    let startY = 0;
    prettyFont.array.forEach((line, index) => {
        readline.cursorTo(outStream, startX + index, startY + index);
        rl.write(line);
    });

    readline.cursorTo(outStream, 120, 25);
    rl.write(chalk.yellowBright('---神光的编程秘籍'));
})();
