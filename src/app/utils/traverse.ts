import fs from 'fs-extra';
import path from 'path';

const traverse = (
  startPath: string,
  callback: (pathname: string) => void,
  callbackReg?: RegExp
) => {
  const currentEntities = fs.readdirSync(startPath);
  currentEntities.forEach((entity) => {
    const currentEntityPath = path.resolve(startPath, entity);
    const stat = fs.statSync(currentEntityPath);

    if (stat.isFile()) {
      if (
        callbackReg &&
        callbackReg instanceof RegExp &&
        callbackReg.test(currentEntityPath)
      ) {
        callback(currentEntityPath);
      }
    } else if (stat.isDirectory()) {
      traverse(currentEntityPath, callback, callbackReg);
    }
  });
};

export default traverse;
