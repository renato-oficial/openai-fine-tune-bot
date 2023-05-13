const openai = require('openai')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const { OPENAI_API_KEY } = process.env
const fs = require('fs')

class OpenaiController {

    constructor( opeaiApaiKey ){

        const configuration = new Configuration({
            apiKey: opeaiApaiKey
        });
        
        this.openai = new OpenAIApi(configuration);

    }

    async listFiles(){
          
          try {

            const response = await this.openai.listFiles();
            const dataObject = response.data
            const { object , data } = dataObject
            return data
/*
[
  {
    object: 'file',
    id: 'file-RcFj7chNTlKDImpJlqRMTdby',
    purpose: 'fine-tune',
    filename: 'amazon_livro.jsonl',
    bytes: 839,
    created_at: 1683855886,
    status: 'processed',
    status_details: null
  }
]

*/
          } catch (error) {
            console.error(error)
          }

    }


    async uploadFile(filePath){

        try {

            const response = await this.openai.createFile(
                fs.createReadStream(filePath),
                "fine-tune"
            )
            const data = response.data
/*
 data: {
    object: 'file',
    id: 'file-RcFj7chNTlKDImpJlqRMTdby',
    purpose: 'fine-tune',
    filename: 'amazon_livro.jsonl',
    bytes: 839,
    created_at: 1683855886,
    status: 'uploaded',
    status_details: null
  }

*/

        } catch (error) {
            console.error(error)    
        }

    }


    async retrieveFile(fileName){
        try {

            return await this.openai.retrieveFile(fileName)

        } catch (error) {
            console.error(error)
        }
    }

    async createFineTune(fineTuneId){
        try{
             return  await openai.createFineTune({
                training_file: fineTuneId,
            });

        } catch (error){
            console.error(error)
        }
    }
}

module.exports = { OpenaiController }