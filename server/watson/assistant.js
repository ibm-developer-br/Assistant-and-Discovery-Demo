/**
 * Arquivo de controle e conexao com Watson Assistant
 */

const Assistant = require('watson-developer-cloud/assistant/v1');
let assistantClient;

// Autenticacao no Assistant
if(process.env.ASSISTANT_APIKEY){
    /********  NOVA AUTENTICAÇÃO PARA NOVAS INSTANCIAS  *********/
    assistantClient = new Assistant({
        iam_apikey: process.env.ASSISTANT_APIKEY,
        version: '2018-07-10',
    });
} else {
    assistantClient = new Assistant({
        username: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD,
        version: '2018-07-10',
    });
}

const assistant = {
    message: (msg, ctx) => {
        // Ligacao com workspace e montagem dos parametros de requisicao
        const req = {
            workspace_id: process.env.ASSISTANT_WORKSPACE,
            input: msg,
            context: ctx || null
        }
        return new Promise((resolve, reject) => {
            // envia a messagem com Assistant
            assistantClient.message(req, (err, resp) => {
                if(err){
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }
}

module.exports = assistant;