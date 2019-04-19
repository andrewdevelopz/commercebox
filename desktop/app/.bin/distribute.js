/**
 *  Package.json script.
 * 
 *  below is the old method of accomplishing the same tasks with terminal commands: (kept for referral purposes)
 *  "dist": "rm -rf ./dist && mkdir dist && find ./src \\( -name \\*.html -o -name \\*.css \\) -type f -exec cp --parents {} ./dist \\; && mv ./dist/src/* ./dist && rm -r ./dist/src && tsc"
 * 
 */

const fs = require('fs');
const path = require('path');

/**
 *  This script is ran inside the terminal with node. This script will find all files that are not .ts 
 *  or .tsx files in the /src directory and copy them over to the /dist directory.
 * 
 *  @param start: Which directory it should start looking from
 *  @param filters: The type of files that we are looking for
 */

// The arguments to be passed into distributeToDist()
const src = './src', filetype = ['.html', '.css', '.eot', '.svg', '.ttf', '.woff', '.woff2', '.otf', '.ico', '.icns', '.png'];

const distributeToDist = (start, filters) => {
    const files = fs.readdirSync(start);

    // loop through all the files in directory
    for (const file of files) {
        const filename = path.join(start, file);
        const stat = fs.lstatSync(filename);

        // if the file is a directory we recurse to go in deeper
        if (stat.isDirectory()) {
            distributeToDist(filename, filters);
        } else {
            // loop through the filters and if the file matches the filter we get the result
            for (const filter of filters) {
                if (filename.indexOf(filter) >= 0) {
                    const fileSeperator = path.sep;

                    // copy the found file to it's respected directory in /dist.
                    //  - destination: the full path including the file
                    //  - destArray: the full path including the file in array form
                    //  - popped: the last item removed from destArray
                    //  - afterPopped: the directory path after filename has been removed
                    const destination = filename.replace('src', './dist');
                    const destArray = destination.split(fileSeperator);
                    const popped = destArray.pop();
                    const afterPopped = destArray.join(fileSeperator);

                    // if the directory does not exists, create it
                    if (!fs.existsSync(afterPopped)) {
                        fs.mkdirSync(afterPopped, { recursive: true });
                    }
                    fs.copyFileSync(filename, destination);
                }
            }
        }
    }
}
distributeToDist(src, filetype); // initiate the function
