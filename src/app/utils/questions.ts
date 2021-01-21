import axios from 'axios';
import cheerio from 'cheerio';
import { Questions } from 'yeoman-generator';

const getQuestions = async (url: string): Promise<Questions> => {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const content = $('tbody').text().replace(' ', '').replace(/\n\t/g, '');
    // eslint-disable-next-line prettier/prettier
    return JSON.parse(content) as Questions;
  } catch (e) {
    return [];
  }
};

export default getQuestions;
