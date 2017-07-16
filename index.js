const fs = require('fs');
const download = require('download');
const config = require('./config');

// download(`${config.host}3536.mp4`, 'dist').then(() => {
//     console.log('done!');
// })
//     .catch(e => {
//         "use strict";
//         console.log(e);
//     });

//
// download('http://unicorn.com/foo.jpg').then(data => {
//     fs.writeFileSync('dist/foo.jpg', data);
// });
//
// download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

// Promise.all([
//         'unicorn.com/foo.jpg',
//         'cats.com/dancing.gif'
//     ].map(x => download(x, 'dist'))).then(() => {
//     console.log('files downloaded!');
// });

// 一组下载 100个尝试


let downloadOne= url => {

    return download(url, config.path).then(() => {
        console.log(`${url} done!`);
    })
        .catch(e => {
            "use strict";
            console.log(`${url} fail!`);
        });
}

/**
 * 开始下载
 * @param start 起始
 * @param num 执行数量
 */
let goDownload = (start,num) => {
    "use strict";
    let downloadArr = [];
    for(let i = 0; i<num; i++){
        downloadArr.push(`${config.host}${start++}.mp4`);
    }

return  Promise.all(downloadArr.map(x => downloadOne(x))).then(() => {
    console.log('files downloaded!');
});

}


async function  downloadAll(start,end,many){
    await goDownload(start,many);

    start += many;
    if(start < end) return  downloadAll(start,end,many);
    console.log('download over');
}

downloadAll(config.start, config.end, 5);

// 创建连接数组

    // 下载
    // 日志存储
    // 异常处理,异常日志
    //