import { differenceInYears } from 'date-fns/esm';

export function memberCheckOutChartData(checkOuts) {
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

export function femaleMaleRatioChart(members) {
  console.log(members, 'members');
  let data = {};

  members.forEach((member) => {
    const gender = member.gender;
    data[gender] = data[gender] ? data[gender] + 1 : 1;
  });

  const res = [
    ['gender', 'number of members'],
    ['male', data['male']],
    ['female', data['female']],
  ];

  return res;
}

export function occupationRatioChart(members) {
  let data = {};

  members.forEach((member) => {
    const occupation = member.occupation;
    data[occupation] = data[occupation] ? data[occupation] + 1 : 1;
  });

  const res = [['Occupations', 'number of members'], ...Object.entries(data)];

  return res;
}

export function membersAgeChart(members) {
  let data = {};

  members.forEach((member) => {
    const age = Math.abs(
      differenceInYears(new Date(), new Date(member.birthDate)),
    );
    data[age] = data[age] ? data[age] + 1 : 1;
  });

  const res = [['Age', 'number of members'], ...Object.entries(data)];

  return res;
}

export function membersActionsChart(sort, members) {
  let checkOutData = {};
  let missedBookData = {};
  let returnedBookData = {};

  for (let i = 1; i <= 12; i++) {
    checkOutData[i] = 0;
    missedBookData[i] = 0;
    returnedBookData[i] = 0;
  }

  members.forEach((member) => {
    if (sort !== 'all' && member.id !== sort) {
      return;
    }

    member.check_out_members.forEach((checkOut) => {
      const month = new Date(checkOut.check_out_date).getMonth() + 1;
      checkOutData[month] = checkOutData[month] + 1;

      if (checkOut.returned_date) {
        const month = new Date(checkOut.returned_date).getMonth() + 1;
        returnedBookData[month] = returnedBookData[month] + 1;
      }

      const missed = checkOut.missed_book;
      if (missed) {
        const month = new Date(checkOut.deadline).getMonth() + 1;
        missedBookData[month] = missedBookData[month] + 1;
      }
    });
  });

  const res = [
    [
      { id: 'month', label: 'Month' },
      'Check-Outs',
      'Missed-Books',
      'Returned_Books',
    ],
    [1, checkOutData[1], missedBookData[1], returnedBookData[1]],
    [2, checkOutData[2], missedBookData[2], returnedBookData[2]],
    [3, checkOutData[3], missedBookData[3], returnedBookData[3]],
    [4, checkOutData[4], missedBookData[4], returnedBookData[4]],
    [5, checkOutData[5], missedBookData[5], returnedBookData[5]],
    [6, checkOutData[6], missedBookData[6], returnedBookData[6]],
    [7, checkOutData[7], missedBookData[7], returnedBookData[7]],
    [8, checkOutData[8], missedBookData[8], returnedBookData[8]],
    [9, checkOutData[9], missedBookData[9], returnedBookData[9]],
    [10, checkOutData[10], missedBookData[10], returnedBookData[10]],
    [11, checkOutData[11], missedBookData[11], returnedBookData[11]],
    [12, checkOutData[12], missedBookData[12], returnedBookData[12]],
  ];

  return res;
}
