import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`⏰ Request took too long! Timeout after ${sec} sec⏰`));
    }, sec * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchurl = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchurl, timeOut(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `We could not find the recipe, please try another one :)`
      );
    return data;
  } catch (err) {
    throw err;
  }
};
