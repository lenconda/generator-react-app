import axios from 'axios';
import cheerio from 'cheerio';

/**
 * @author lenconda <i@lenconda.top>
 * get the code content from GitHub
 * pay attention that raw.githubusercontent.com has been blocked in China Mainland
 * so we have to use cheerio to parse the HTML on github.com
 *
 * @param url string
 * @returns string
 */
const getGitHubCodeContent = async (url: string): Promise<string> => {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    // get the code content
    return $('tbody').text().replace(' ', '').replace(/\n\t/g, '');
  } catch (e) {
    return '';
  }
};

export { getGitHubCodeContent };
