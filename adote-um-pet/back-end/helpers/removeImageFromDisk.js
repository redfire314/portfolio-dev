// Dependencies
const fs = require('fs');

function removeImageFromDisk(img) {
    // Images default path
    const path = 'public\\upload\\images\\pets\\';
    fs.unlinkSync(`${path}${img}`, (err) => {
        console.log(err);
    });
}

// Export
module.exports = removeImageFromDisk;
