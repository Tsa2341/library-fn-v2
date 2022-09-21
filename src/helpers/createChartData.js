export default function generateChartData(checkOuts) {
  let data = {};

  checkOuts.forEach((checkOut) => {
    const month = new Date(checkOut.check_out_date).getMonth() + 1;
    data[month] = data[month] ? data[month] + 1 : 1;
  });

  const res = [
    [
      { id: 'month', type: 'number' },
      { label: 'Books checked-out', id: 'checkouts', type: 'number' },
    ],
    [1, data[1]],
    [2, data[2]],
    [3, data[3]],
    [4, data[4]],
    [5, data[5]],
    [6, data[6]],
    [7, data[7]],
    [8, data[8]],
    [9, data[9]],
    [10, data[10]],
    [11, data[11]],
    [12, data[12]],
  ];

  return res;
}
