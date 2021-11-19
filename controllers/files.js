const fs = require("fs");
const getFileList = async (req, res) => {
  let filesInfo = [];
  await fs.readdir("./uploads/", (err, files) => {
    if (err) console.log(err);
    files.forEach((element) => {
      const fileObj = {
        name: element,
        path: "/uploads/" + element,
      };
      filesInfo.push(fileObj);
    });
    console.log(filesInfo);
    return res.json(filesInfo);
  });
};

const uploadFile = async (req, res) => {
  // generate file name
  let text1 = require("crypto").randomBytes(7).toString("hex");
  let text2 = require("crypto").randomBytes(7).toString("hex");
  //   get file
  if (!req.files) {
    return res.json({ success: false });
  }
  let myFile = req.files.file;
  const extension = myFile.name.split(".")[1];
  const oldFileNAme = myFile.name.split(".")[0];
  //   rename file
  let targetDirFinal =
    "./uploads/" + text1 + "-" + text2 + oldFileNAme + "." + extension;
  //   move file
  await myFile.mv(targetDirFinal, (err) => {
    if (err) console.log(err);
  });
  res.json({ success: true });
};

const downloadFile = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.json({ msg: "none file selected", success: false });
  }
  const path = "./uploads/" + name;
  //   check if file exist
  await fs.exists(path, (exist) => {
    if (!exist) {
      return res.json({ success: false, msg: "none file whit that name" });
    }
    // download file
    res.download(path, name, (err) => {
      if (err) console.log(err);
      return res.render("index");
    });
  });
};

module.exports = { getFileList, uploadFile, downloadFile };
