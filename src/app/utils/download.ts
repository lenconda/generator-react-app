import download from 'download-git-repo';

export default async (repo: string, destination: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    download(repo, destination, { clone: false }, (error) => {
      if (error) {
        reject(error.message);
      }

      resolve(Date.now() - startTime);
    });
  });
};
