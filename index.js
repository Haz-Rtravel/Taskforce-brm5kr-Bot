const firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const { Client, MessageEmbed, MessageAttachment, displayAvatarURL } = require(`discord.js`); // discord.js를 불러옴
const Discord = require('discord.js')
const client = new Discord.Client(); // 새로운 디스코드 클라이언트를 만듬
const { prefix } = require('./config.json');

var firebaseConfig = {
    apiKey: "AIzaSyBvfRpHE_c2n-MkKrfsM5UN0hHpg5PMnio",
    authDomain: "taskforce-brm5kr.firebaseapp.com",
    databaseURL: "https://taskforce-brm5kr-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "taskforce-brm5kr",
    storageBucket: "taskforce-brm5kr.appspot.com",
    messagingSenderId: "901221570560",
    appId: "1:901221570560:web:50c1aafe64050b63d120e5"
  };

// 만약에 클라이언트가 준비되었다면, 아래의 코드를 실행
// 이 이벤트는 봇이 로그인 되고 한번만 실행

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('기능 테스트', { type: 'PLAYING' })

    firebase.initializeApp(firebaseConfig);

    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: 'https://discord-tlb-project.firebaseio.com'
    //   });
    // db = admin.database();
    // ref = db.ref("/");
});

client.on('message', async message => {
    // if (!message.content.startsWith(prefix) || message.author.bot) return;
    // if (message.author.id == '327799371099930626') {
    //     message.channel.send(`넌 생각하고 말해라`);
    // }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const message1 = message;

    const user = message.author;

    


    // if (message.content === "!ping" ) {
    //     // "Pong"으로 되돌려 칩니다.
    //     message.channel.send("Pong");
    // }

    
    // 권한 없음 알림
    // message.channel.send(failed())
    function failed(command, args, author) {

        var failedargs = [{name: '입력 명령어', value: `${prefix}` + command}]

        for (var i = 0; i < args.length; i++) {
            failedargs.push({name: '추가값', value: args[i], inline: true})
        }

        const embed = new MessageEmbed()
                .setTitle('ERROR')
                .setColor(0xff0000)
                // .setAuthor('')
                .setDescription(`${author}님, \n 입력한 명령어 ${prefix}${command} ${args} 는 존재하지 않는 명령어이거나 사용할 수 없는 명령어입니다.`)
                .addFields(failedargs)
                .setTimestamp()
                .setFooter('Haz#6467')
        return embed;

    }

    function auth_create(command, args, auth_code) {
        var auth_info = [{name: 'Authentication code', value: auth_code}]
        const auth_create = new MessageEmbed()
            .setTitle('인증코드 생성 완료')
            .setColor(0x6FA8DC)
            .setDescription(`${user}님, 인증코드가 성공적으로 생성되었습니다.`)
            .addFields(auth_info)
            .setTimestamp()
        return auth_create;
    }

    function auth_confirm(command, args, auth_code) {
        var auth_info = [{name: 'Authentication code', value: auth_code}]
        const auth_confirm = new MessageEmbed()
            .setTitle('인증코드 인증 완료')
            .setColor(0x66FF66)
            .setDescription(`${user}님, 인증코드가 성공적으로 인증되었습니다. 서버에 오신 것을 환영합니다.`)
            .addFields(auth_info)
            .setTimestamp()
        return auth_confirm;
    }

    function auth_failed(command, args, auth_code) {
        var auth_info = [{name: 'Authentication code', value: auth_code}]
        const auth_failed = new MessageEmbed()
            .setTitle('인증코드 인증 실패')
            .setColor(0xffcc66)
            .setDescription(`${user}님, 해당 인증코드는 이미 사용되었거나 존재하지 않는 것으로 보입니다. 다시 확인해주세요.`)
            .addFields(auth_info)
            .setTimestamp()
        return auth_failed;
    }

    function auth_search(command, args, request_data) {
        const auth_search = new MessageEmbed()
            .setTitle('인증코드 검색 결과')
            .setColor(0x6FA8DC)
            .addFields(request_data)
            .setTimestamp()
        return auth_search;
    }

    switch (command) {

        case `인증`:

            switch(args[0]) {
                
                case `검사`:

                    if (args[1] != null) {

                        var auth_code = args[1]

                        async function AUTHCODE_CHECK() {
                            var DATA = null
                            DATA = await firebase.database().ref().child('authentication_code').child(auth_code).get().then((snapshot) => {
                                console.log('SEARCHING : ' + auth_code)
                                console.log('RESULT : ' + snapshot.val())

                                var testing = snapshot.val()

                                if (testing.STATUS != "WAITING") {
                                    console.log('WARNING')
                                    return null
                                } else {
                                    return snapshot.val()
                                }

                                
                            })

                            if (DATA != null) {
                                return true
                            } else {
                                return false
                            }
                        }

                        async function CHECKER() {
                            var confirmed_result_1 = await AUTHCODE_CHECK();
                            var receive_user_name = user.username + "#" + user.discriminator;

                            if (confirmed_result_1 == true) {
                                let today = new Date();
                                let year = today.getFullYear(); // 년도
                                let month = today.getMonth() + 1;  // 월
                                let date = today.getDate();  // 날짜
                                let day = today.getDay();  // 요일
                                let hours = today.getHours(); // 시
                                let minutes = today.getMinutes();  // 분
                                let seconds = today.getSeconds();  // 초
                                let milliseconds = today.getMilliseconds(); // 밀리초

                                if (month < 10) {month = "0"+ month}
                                if (date < 10) {date = "0" + date}
                                if (hours < 10) {hours = "0"+ hours}
                                if (minutes < 10) {minutes = "0"+ minutes}
                                if (seconds < 10) {seconds = "0"+ seconds}
                                var register_date = year+"."+month+"."+date+" "+hours+':'+minutes+':'+ seconds;

                                firebase.database().ref('authentication_code/' + auth_code).update({
                                    RECEIVE_USER: user.id,
                                    RECEIVE_USER_NAME: receive_user_name,
                                    RECEIVE_CONFIRM_DATE: register_date,
                                    STATUS: 'CONFIRM'
                                });

                                message.channel.send(auth_confirm(command, args, auth_code))
                            } else {
                                message.channel.send(auth_failed(command, args, auth_code))
                            }
                        }

                        CHECKER()

                    } else {
                        
                    }
                    
                break;

                case `생성`:

                    if (args[1] == null) {
                        let today = new Date();
                        let year = today.getFullYear(); // 년도
                        let month = today.getMonth() + 1;  // 월
                        let date = today.getDate();  // 날짜
                        let day = today.getDay();  // 요일
                        let hours = today.getHours(); // 시
                        let minutes = today.getMinutes();  // 분
                        let seconds = today.getSeconds();  // 초
                        let milliseconds = today.getMilliseconds(); // 밀리초

                        if (month < 10) {month = "0"+ month}
                        if (date < 10) {date = "0" + date}
                        if (hours < 10) {hours = "0"+ hours}
                        if (minutes < 10) {minutes = "0"+ minutes}
                        if (seconds < 10) {seconds = "0"+ seconds}
                        var register_code = year+month+date
                        var register_date = year+"."+month+"."+date+" "+hours+':'+minutes+':'+ seconds;

                        var ar  = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        for (var code_count = 0; code_count < 2; code_count++) {
                            register_code = register_code+"-";
                            for(var i = 0; i < 8; i++) {
                                register_code = register_code + ar.charAt(Math.floor(Math.random() * ar.length));
                            };
                        }

                        var created_by_name = user.username + "#" + user.discriminator;

                        firebase.database().ref('authentication_code/' + register_code).set({
                            STATUS: "WAITING",
                            CREATE_BY: user.id,
                            CREATE_BY_NAME: created_by_name,
                            CREATE_DATE: register_date,
                            RECEIVE_USER: 'NEED RECEIVE_USER',
                            RECEIVE_USER: 'NEED RECEIVE_USER_NAME',
                            RECEIVE_CONFIRM_DATE: 'NEED RECEIVE_CONFIRM_DATE',
                        });

                        message.channel.send(auth_create(command, args, register_code))
                    }

                break;

                case `조회`:

                    if (args[1] != null) {
                        try {
                            firebase.database().ref().child('authentication_code').child(args[1]).get().then((snapshot) => {
                                var search_result = snapshot.val();
                                var request_data = [{name: '검색 요청자', value: `${user}`}]
                                console.log(snapshot.val())
                                console.log(Object.keys(search_result))
                                console.log(Object.keys(search_result).length)
    
                                if (args[2] == '자세히') {
                                    for (var key in search_result) {
                                        request_data.push({name: key, value: search_result[key]})
                                        console.log(key, search_result[key])
                                    }
    
                                } else {
                                    request_data.push({name: '인증 생성자', value: search_result['CREATE_BY_NAME'], inline: true})
                                    request_data.push({name: '인증 생성일', value: search_result['CREATE_DATE']})
                                    request_data.push({name: '인증 수신자', value: search_result['RECEIVE_USER_NAME'], inline: true})
                                    request_data.push({name: '인증 사용일', value: search_result['RECEIVE_CONFIRM_DATE']})
                                    request_data.push({name: '인증 상태', value: search_result['STATUS']})
                                }
                                console.log(request_data)
                                message.channel.send(auth_search(command, args, request_data))
            
                            })
                        } catch {
                            message.channel.send(failed(command, args, message.author))
                        }
                    }

                break;
            }

        break;

        default:
            message.channel.send(failed(command, args, message.author))
        break;    
    }
});

// 디스코드 토큰으로 디스코드에 로그인
client.login(process.env.TOKEN);