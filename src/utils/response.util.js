import { STATUS } from "../constants/constants.js";

export const successResponse = (data, req) => {
  // data
  const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = data;

  // current url without the page query
  let currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  currentUrl = !currentUrl.includes('?') ? `${currentUrl}?` : currentUrl;
  currentUrl = currentUrl.split('&').filter(q => !q.includes("page")).join('&');
  
  return {
    status: STATUS.SUCCESS,
    payload: docs,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
    prevLink: hasPrevPage ? `${currentUrl}&page=${prevPage}` : null,
    nextLink: hasNextPage ? `${currentUrl}&page=${nextPage}` : null
  }
}

export const errorResponse = (error) => {
  return {
    status: STATUS.FAIL,
    error: error.message
  }
}