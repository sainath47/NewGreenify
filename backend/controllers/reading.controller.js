const readingModel = require('../models/reading.model')
const xlsx = require('xlsx');
//storing all the readings




//geting all readings
async function getAllReading(req,res){

try{
let data =await readingModel.find().sort({ createdAt: -1 })
res.status(200).send({status:"true", data})
    }
    catch(e){
    res.status(500).json({error: e.message})
    }

}

//uploading xlsv file
async function uploadReadings(req,res){
  function convertExcelDate(excelDate) {
    const date = new Date(Math.floor((excelDate - 25569) * 86400 * 1000));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
try{
    if (!req.file) {
        return res.status(400).json({ message: "No files were uploaded." });
      }
      const file = req.file;
        // Validate file type
        if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return res.status(400).json({ message: 'Please upload a valid XLSX file.' });
          }
    
          // Read the Excel file
          const filePath = file.path
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);
// console.log(data, "reeaaading");

// step:- data conversion to json & consoling it
const documents = data.map(row => {
    const isoDate = convertExcelDate( row['READING_DATE']);
    return {
        "HOUSE_NO": row['HOUSE_NO.'],
        "BLOCK_NO": row['BLOCK_NO.'],
    "READING": row['READING '],
    "READING_DATE": isoDate
    };
  });
  // console.log(documents, "doocummentsss");
const result = await readingModel.insertMany(documents);
   

      // console.log("Uploaded file details:", result);

      res.status(201).send({ message: "File uploaded successfully.", data: result });
    }
    catch(e){
        console.log(e.message);
    res.status(500).json({error: e.message})
    }

}



module.exports = {getAllReading, uploadReadings}