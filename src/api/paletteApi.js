import React from "react";
import { API_SERVER_HOST } from "./webtoonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/palette`;

export const getPalette = async (memberId) => {
  const res = await jwtAxios.get(`${prefix}/${memberId}`);
  return res.data;
};
