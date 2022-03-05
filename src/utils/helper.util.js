function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}


function getDateAfterMonths(months)
{
  const dayNow = new Date();
  const dayFutureTstmp = new Date().setMonth(dayNow.getMonth() + months);
  const dayFuture = new Date(dayFutureTstmp);
  return `${dayFuture.toLocaleDateString('en-US')} ${dayFuture.getHours()}:${dayFuture.getMinutes()}:${dayFuture.getSeconds()}`;
}

function getDateAfterSeconds(seconds)
{
  const dayNow = new Date();
  const dayFutureTstmp = new Date().setSeconds(dayNow.getSeconds() + seconds);
  const dayFuture = new Date(dayFutureTstmp);
  return `${dayFuture.toLocaleDateString('en-US')} ${dayFuture.getHours()}:${dayFuture.getMinutes()}:${dayFuture.getSeconds()}`;
}

function getDateAfterMinutes(minutes)
{
  const dayNow = new Date();
  const dayFutureTstmp = new Date().setMinutes(dayNow.getMinutes() + minutes);
  const dayFuture = new Date(dayFutureTstmp);
  return `${dayFuture.toLocaleDateString('en-US')} ${dayFuture.getHours()}:${dayFuture.getMinutes()}:${dayFuture.getSeconds()}`;
}

function getDateAfterHours(hours)
{
  const dayNow = new Date();
  const dayFutureTstmp = new Date().setHours(dayNow.getHours() + hours);
  const dayFuture = new Date(dayFutureTstmp);
  return `${dayFuture.toLocaleDateString('en-US')} ${dayFuture.getHours()}:${dayFuture.getMinutes()}:${dayFuture.getSeconds()}`;
}

module.exports = {
  getOffset,
  emptyOrRows,
  getDateAfterMonths,
  getDateAfterMinutes,
  getDateAfterSeconds,
  getDateAfterHours
}
