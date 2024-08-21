module.exports =  (objectPage,query,countProduct) => {
  if (query.page) {
    objectPage.currentPage = parseInt(query.page);
    objectPage.skip = (objectPage.currentPage - 1) * objectPage.limit;
  }
  objectPage.totalPages = Math.ceil(countProduct / objectPage.limit);
  return objectPage;
};
