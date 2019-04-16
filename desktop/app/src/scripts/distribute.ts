/**
 *  Package.json script.
 * 
 *  below is the old method of accomplishing the same tasks with terminal commands: (kept for referral purposes)
 *  "dist": "rm -rf ./dist && mkdir dist && find ./src \\( -name \\*.html -o -name \\*.css \\) -type f -exec cp --parents {} ./dist \\; && mv ./dist/src/* ./dist && rm -r ./dist/src && tsc"
 */

import fs, { Stats } from 'fs';
import path from 'path';

/**
 *  This script will find all files that are not .ts or .tsx files in the /src directory
 *  and copy them over to the /dist directory.
 * 
 *  @param start: Which directory it should start looking from
 *  @param filters: The type of files that we are looking for
 */

// The arguments to be passed into distributeToDist()
const src: string = './src', filetype: string[] = ['.html', '.css', '.eot', '.svg', '.ttf', '.woff', '.woff2', '.otf'];

const distributeToDist = (start: string, filters: string[]): void => {
    const files: string[] = fs.readdirSync(start);

    // loop through all the files in directory
    for (const file of files) {
        const filename: string = path.join(start, file);
        const stat: Stats = fs.lstatSync(filename);

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
                    const destination: string = filename.replace('src', './dist');
                    const destArray: string[] = destination.split(fileSeperator);
                    const popped: string | undefined = destArray.pop();
                    const afterPopped: string = destArray.join(fileSeperator);

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
