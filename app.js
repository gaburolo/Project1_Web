if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const path = require('path');

const app = express();

const { Readable } = require('stream');

/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
function bufferToStream(binary) {

    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });

    return readableInstanceStream;
}

app.use(express.json());
//app.get('/',(req,res) =>{});
app.use(express.static(path.join(__dirname,'public')));
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage:inMemoryStorage}).single('image');

const config = require('./config');

const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = 'archivo';



const getBlobName = originalName =>{
    const indetifier = Math.random().toString().replace(/0\./,'');
    return `${indetifier}=${originalName}`;
};

app.post('/upload',uploadStrategy,(req,res) =>{
    const blobName = getBlobName(req.file.originalname);
    const stream = bufferToStream(req.file.buffer);
    const streamLength = req.file.buffer.length;

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err=>{
        if(err){
            console.log(err);
            return;
        }

        res.status(200).send('Archivo subido'+`"https://${config.getStorageAccountName()}.blob.core.windows.net/${containerName}/${blobName}"`);
    });

});

app.get('/all',(req,res) =>{
    blobService.listBlobsSegmented(containerName, null, (err,data)=>{
        if(err){
            console.log(err);
            return;
        }else{
            let images = '';
            if(data.entries.length){
                
                data.entries.forEach(element =>{
                    images += `<img src="https://${config.getStorageAccountName()}.blob.core.windows.net/${containerName}/${element.name}" witdh="400"/>`
                });
                res.send(images);
            }
        }
    });


});
const port = process.env.port || 3030;
app.listen(port, () =>console.log('Esperando en '+port+'...'));

module.exports = app;