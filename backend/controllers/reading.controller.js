const readingModel = require("../models/reading.model");
const xlsx = require("xlsx");
const fs = require("fs");
const userModel = require("../models/user.model");



async function getReadings(req, res) {
  try {
    let { houseNo, blockNo, meterSNo, startDate, endDate } = req.query; // Get the formatted date from query darameters

    let { ReadAllReadings, email } = req.query;
   ReadAllReadings= req.query.ReadAllReadings === 'true'
    // console.log("ReadAllReadings", ReadAllReadings);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const query = {
      HOUSE_NO: houseNo,
      BLOCK_NO: blockNo,
      METER_S_NO: meterSNo,
    };
    
  
    let filteredQuery = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    const meterNumbers = user.meterNumbers;
    
    if (!ReadAllReadings) {
      filteredQuery = { ...filteredQuery, METER_S_NO: { $in: meterNumbers } };
    }
    
    // IF BOTH THE START DATE & END DATE BOTH ARE PRESENT THEN THE READING_DATE QUERY WILL RUN, WITH OTHER QUERIES INCLUDED
    // console.log(filteredQuery, "filteredQuery");
    

    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);

      const formattedStartDate = `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`;
      const formattedEndDate = `${
        endDate.getMonth() + 1
      }/${endDate.getDate()}/${endDate.getFullYear()}`;

      // const data = await readingModel
      //   .find({
      //     ...filteredQuery,
      //     $expr: {
      //       $and: [
      //         {
      //           $gte: [
      //             {
      //               $dateFromString: {
      //                 dateString: "$READING_DATE",
      //                 format: "%m/%d/%Y",
      //               },
      //             },
      //             {
      //               $dateFromString: {
      //                 dateString: formattedStartDate,
      //                 format: "%m/%d/%Y",
      //               },
      //             },
      //           ],
      //         },
      //         {
      //           $lte: [
      //             {
      //               $dateFromString: {
      //                 dateString: "$READING_DATE",
      //                 format: "%m/%d/%Y",
      //               },
      //             },
      //             {
      //               $dateFromString: {
      //                 dateString: formattedEndDate,
      //                 format: "%m/%d/%Y",
      //               },
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   })
      //   .sort({ createdAt: -1 })
      //   .select("HOUSE_NO BLOCK_NO READING READING_DATE createdAt METER_S_NO");

      filteredQuery = {
        ...filteredQuery,
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $dateFromString: {
                    dateString: "$READING_DATE",
                    format: "%m/%d/%Y",
                  },
                },
                {
                  $dateFromString: {
                    dateString: formattedStartDate,
                    format: "%m/%d/%Y",
                  },
                },
              ],
            },
            {
              $lte: [
                {
                  $dateFromString: {
                    dateString: "$READING_DATE",
                    format: "%m/%d/%Y",
                  },
                },
                {
                  $dateFromString: {
                    dateString: formattedEndDate,
                    format: "%m/%d/%Y",
                  },
                },
              ],
            },
          ],
        },
      };

      // const data = await readingModel
      // .find({...filteredQuery, READING_DATE: {
      //   $gte: startDate,
      //   $lte: endDate,
      // }, })

      // return res.status(200).send({ status: "true", data });
    }
// console.log(filteredQuery, 'filtered Query');
    const data = await readingModel
      .find({ ...filteredQuery })
      .sort({ createdAt: -1 })
      .select("HOUSE_NO BLOCK_NO READING READING_DATE createdAt METER_S_NO");


    return res.status(200).send({ status: "true", data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}




//uploading xlsv file
async function uploadReadings(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No files were uploaded." });
    }
    const file = req.file;
    // Validate file type
    if (
      file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return res
        .status(400)
        .json({ message: "Please upload a valid XLSX file." });
    }

    // Read the Excel file
    const filePath = file.path;
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    // console.log(data, "reeaaading");

    // step:- data conversion to json & consoling it
    const documents = data.map((row) => {
      // const isoDate = convertDateFormat( );
      return {
        HOUSE_NO: row["HOUSE_NO"],
        BLOCK_NO: row["BLOCK_NO"],
        READING: row["READING"],
        READING_DATE: row["READING_DATE"],
        METER_S_NO: row["METER_S_NO"],
      };
    });
    // console.log(documents, "doocummentsss");
    const result = await readingModel.insertMany(documents);

    // console.log("Uploaded file details:", result);
    // Delete the file after use
    fs.unlinkSync(filePath);

    res
      .status(201)
      .send({ message: "File uploaded successfully.", data: result });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getReadings, uploadReadings };
