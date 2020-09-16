const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const DOWNLOADS_DIR = path.join(__dirname, "/DOWNLOADS");

function getFiles(folderName) {
  return fsPromises.readdir(folderName, {}, (err, files) => {
    if (err) return err;
    return files;
  });
}

(async () => {
  try {
    const artists = await getFiles(DOWNLOADS_DIR);

    const artistsPaths = artists
      .filter((fileName) => fileName !== ".DS_Store")
      .map((fileName) => path.join(DOWNLOADS_DIR, fileName));

    artistsPaths.forEach(async (artistPath) => {
      const albums = await getFiles(artistPath);
      const albumsPaths = albums.map((album) => path.join(artistPath, album));
    });
  } catch (e) {
    throw new Error(e);
  }
})();

// artistFoldersPaths.forEach((artistFolder) => {
//   fs.readdir(artistFolder, {}, (err, files) => {
//     if (err) return console.log(err);

//     const albumFolders = files.filter((file) => /\(Album|Single\)$/.test(file));
//     const albumFoldersPaths = albumFolders.map((albumName) =>
//       path.join(artistFolder, albumName)
//     );

//     albumFoldersPaths.forEach((albumFolder) => {
//       fs.readdir(albumFolder, {}, (err, files) => {
//         if (err) console.log(err);

//         const songs = files.filter((file) => /\.flac$/.test(file));
//         const songsPaths = songs.map((song) => path.join(albumFolder, song));
//       });
//     });
//   });
// });
