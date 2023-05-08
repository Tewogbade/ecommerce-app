import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDEyNTFhOTY3OGQ2ZmZhYTEyOWIyOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzU1NTYxMSwiZXhwIjoxNjgzODE0ODExfQ.C1F4cDjWwG2SvazwMlrolA7XHBhyIs7AABW7MM1KbKA";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
