const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const date = new Date();
http.createServer(function (req, res) { 
  
  if(req.url == "/fileupload"){
    const formData = new formidable.IncomingForm();
    
    formData.parse(req, function (err, fields, files) {
      const oldFilepath = files.filetoupload.filepath;
      const fileNameGenarate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}-${Math.floor((Math.random() * 1000000) + 1)}`;
      const getFileNameArr = files.filetoupload.originalFilename.split('.');
      const getFileExt = getFileNameArr[getFileNameArr.length-1]; 
      const newFilePath = `${__dirname}./uploads/${fileNameGenarate}.${getFileExt}`;
      console.log(newFilePath)
      fs.rename(oldFilepath, newFilePath, (err)=>{
        if (err) throw err;
        res.write('File Uploaded!');
        return res.end();
      });
    });
  }else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();

  }
  
}).listen(8089);