export function useComptime(beginTime, endTime) {
  let a;
  let beginTimes;
  let endTimes;

  if (beginTime && endTime) {
    beginTimes = beginTime.substring(0, 10).split('-');
    endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

  }

  if (beginTime && endTime) {
    a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
  } else if (beginTime !== null && endTime === null) {
    return -1
  } else if (beginTime === null && endTime !== null) {
    return 1
  } else if (beginTime === null && endTime === null) {
    return -1
  }

  if (a && a < 0) {
    return 1;
  } else if (a > 0) {
    return -1;
  } else if (a == 0) {
    return 0;
  } else {
    return 'exception'
  }
}