const fs = require('fs');
const path = require('path');

function deleteDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        console.log(directoryPath + ' is not exist.');
        return;
    }

    fs.readdirSync(directoryPath).forEach((file) => {
        const currentPath = path.join(directoryPath, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
            deleteDirectory(currentPath);
        } else {
            fs.unlinkSync(currentPath);
        }
    });

    fs.rmdirSync(directoryPath);
}

function clean() {
    const paths = require('../config/paths');
    deleteDirectory(paths.buildPath);
}

module.exports = clean;
