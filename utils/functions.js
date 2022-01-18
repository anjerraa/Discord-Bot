// For reading from a directory.
const fs = require("fs");

// Helper function to get all the files in a specific directory.
const getFiles = (path, ending) => {
    // Read all information in the specificed directory synchroniously.
    // Filter out any files that doesn't have the specified ending.
    return fs.readdirSync(path).filter(f => f.endsWith(ending));
}

// Export functions to be used in other files.
module.exports = {
    getFiles
}