import axios from 'axios';

const fetcher = (url: string) => axios.get("http://localhost:3000").then(res => res.data);

export default fetcher;