import { API_PREFIX } from '@/utils/helpers';
import axios from 'axios';

const config = {
  baseURL: API_PREFIX,
};

export default axios.create(config);
