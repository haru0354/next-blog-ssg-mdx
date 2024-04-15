const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const convertToWebp = async () => {
  const inputDirectory = path.join(__dirname, "..", "public");
  const outputDirectory = path.join(__dirname, "..", "public", "image_webp");
  const outputThumbnailDirectory = path.join(
    __dirname,
    "..",
    "public",
    "thumbnail_webp"
  );

  const fileNames = fs.readdirSync(inputDirectory);

  const supportedFormats = [".jpg", ".jpeg", ".png"];
  const supportedFileNames = fileNames.filter((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    return supportedFormats.includes(ext);
  });

  // 変換済みのファイル名のリストを読み込み
  const convertedFilePath = path.join(
    __dirname,
    "..",
    "scripts",
    "ConvertedFileNameList.json"
  );
  let convertedFileNames = [];
  if (fs.existsSync(convertedFilePath)) {
    const data = fs.readFileSync(convertedFilePath);
    convertedFileNames = JSON.parse(data);
  }

  // 変換済みのファイルは除外
  const uniqueFileNames = supportedFileNames.filter(
    (fileName) => !convertedFileNames.includes(fileName)
  );

  try {
    await Promise.all(
      uniqueFileNames.map(async (fileName) => {
        const inputPath = path.join(inputDirectory, fileName);
        const outputPath = path.join(
          outputDirectory,
          `${fileName.replace(/\.(jpe?g|png)$/, ".webp")}`
        );
        const outputThumbnailPath = path.join(
          outputThumbnailDirectory,
          `${fileName.replace(/\.(jpe?g|png)$/, ".webp")}`
        );

        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        await sharp(inputPath)
          .resize({ width: 300 })
          .webp({ quality: 80 })
          .toFile(outputThumbnailPath);

        convertedFileNames.push(fileName);
      })
    );
    console.log("画像の変換に成功しました");
  } catch (error) {
    console.log("画像の変換に失敗しました", error);
  }

  // 変換したファイル名を「ConvertedFileNameList.json」に書き込む
  fs.writeFileSync(
    convertedFilePath,
    JSON.stringify(convertedFileNames, null, 2)
  );
  console.log("webpに変換したファイル", uniqueFileNames);
};

convertToWebp();
