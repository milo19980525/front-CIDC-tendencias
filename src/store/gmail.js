const nodemailer = require ("nodemailer");
const {google} = require ("googleapis");

const CLIENT_ID = '33215512607-37ibsug1g1k35f2ko1gli83uas7i6uqf.apps.googleusercontent.com'
const CLIENT_SECRET = 'GTodzL6pDHuWELwaas1JKds2'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04ohabbdVXuHeCgYIARAAGAQSNwF-L9Ir0QwStdzsfpN00CGNKQjiYZ4DSjIu1CsPvYFDCl3IxGhnPT5Ye_O9t524DMNYdd7_Jyw'
        
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
        
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(email){
    console.log("entroooooooooooo gmaiiiiiiiiiiiiiiiiiiilllllllllllllllll");
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type : 'OAuth2',
                user : 'prosciencesearcher@gmail.com',
                clientId : CLIENT_ID,
                clientSecret : CLIENT_SECRET,
                refreshToken : REFRESH_TOKEN,
                accessToken : accessToken,
            },
        });

        const mailOptions = {
            from : 'Notificador ProScience Searcher <prosciencesearcher@gmail.com>',
            to : email,
            subject: "Notificación - Proscience Searcher",
            text: 'Notificacion 1',
            html: '<h1> Usted se ha suscrito a ProScien Searcher </h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;

    }catch(error){
        return error;
    }
}

sendMail('brayansierraf97@gmail.com')
.then(result => console.log('Enviando email...', result))
.catch(error => console.log(error.message));


