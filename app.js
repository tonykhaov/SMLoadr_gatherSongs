const fs = require("fs");
const path = require("path");

const DOWNLOADS_dir = path.join(__dirname, "/DOWNLOADS");

fs.readdir(DOWNLOADS_dir, {}, (err, files) => {
  if (err) return console.log(err);

  const artistFolders = files.filter((file) => file !== ".DS_Store");
  const artistFoldersPaths = artistFolders.map((artistName) =>
    path.join(DOWNLOADS_dir, artistName)
  );

  artistFoldersPaths.forEach((artistFolder) => {
    fs.readdir(artistFolder, {}, (err, files) => {
      if (err) return console.log(err);

      const albumFolders = files.filter((file) =>
        /\(Album|Single\)$/.test(file)
      );
      const albumFoldersPaths = albumFolders.map((albumName) =>
        path.join(artistFolder, albumName)
      );

      albumFoldersPaths.forEach((albumFolder) => {
        fs.readdir(albumFolder, {}, (err, files) => {
          if (err) console.log(err);

          const songs = files.filter((file) => /\.flac$/.test(file));
          const songsPaths = songs.map((song) => path.join(albumFolder, song));
        });
      });
    });
  });
});
