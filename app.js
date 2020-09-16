const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const DOWNLOADS_DIR = path.join(__dirname, "/DOWNLOADS");

function getArtistsFolders(downloadsDir) {
  return fsPromises.readdir(downloadsDir, {}, (err, files) => {
    if (err) return err;
    return files;
  });
}

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

(async () => {
  try {
    const artistsFolders = await getArtistsFolders(DOWNLOADS_DIR);
    const artistsFoldersPaths = artistsFolders
      .filter((fileName) => fileName !== ".DS_STORE")
      .map((fileName) => path.join(DOWNLOADS_DIR, fileName));
  } catch (e) {
    throw new Error(e);
  }
})();
