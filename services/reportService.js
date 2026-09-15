// services/reportService.js
import axios from 'axios';
import { BASE_URL } from '../constants/api';

export const getReportSummary = async () => {
  const response = await axios.get(`${BASE_URL}/reports/summary`);
  return response.data;
};
 