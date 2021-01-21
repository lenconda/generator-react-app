import download from 'download-git-repo';

/**
 * @author lenconda <i@lenconda.top>
 * download a git repo into local filesystem, and returns
 * the whole duration of downloading process
 * @param repo string
 * @param destination string
 * @returns Promise<number>
 */
const downloadGitRepo = async (
  repo: string,
  destination: string
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // download git repository via HTTP, not SSL
    download(repo, destination, { clone: false }, (error) => {
      if (error) {
        reject(error.message);
      }
      // when download progress is completed, resolve the duration
      resolve(Date.now() - startTime);
    });
  });
};

export default downloadGitRepo;
