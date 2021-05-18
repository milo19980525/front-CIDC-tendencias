
export async function sendMail(email){
    console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    try{
        const nodemailer = require('nodemailer')
        const { google } = require('googleapis')

        const CLIENT_ID = '225068578618-9a435np32p9d4eidu3ohdbeog2gsqcjg.apps.googleusercontent.com'
        const CLIENT_SECRET = 'ZspbZO_GAs0BUUMghr3P5nvc'
        const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
        const REFRESH_TOKEN = '1//04i_m13cOuUqgCgYIARAAGAQSNwF-L9Ir6G4tP0rVJgC7Cd_VLZtb5Mnuik3eb11BfCzUIp2cKEnnx9p4tiWuqGN_oFrv9-_UNKE'

        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
        console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO GMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    }
    catch(error){
        return error;
    }    
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type : 'OAuth2',
                user : 'juegabrayan333@gmail.com',
                clientId : CLIENT_ID,
                clientSecret : CLIENT_SECRET,
                refreshToken : REFRESH_TOKEN,
                accessToken : accessToken,
            },
        });

        const mailOptions = {
            from : 'Notificador ProScience Searcher <juegabrayan333@gmail.com>',
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

sendMail()
.then(result => console.log('Enviando email...', result))
.catch(error => console.log(error.message));


