// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// const moment = require('moment');
// const _ = require('lodash');
// const User = require('./model/user');
// const xl = require('excel4node');
// // const config = require('../config/config');

// const connString = "mongodb://localhost:27017/demoApi"

// const todayReport = () => {
//     new Promise((resolve, reject) => {
//         let startDay = new Date(moment().startOf('day'));
//         let endDay = new Date(moment().endOf('day'));

//         console.log(startDay)
//         console.log(endDay)

//         mongoose.connect(connString, (err) =>{
//             console.log(err)
//         })
//         //  {
//         //     promiseLibrary: require('bluebird')
//         // }
      
//         // const users = User.find({})
//         // console.log(users)

//         User.aggregate(
//             // { $unwind: '$users' },
//             // {
//             //     $match: {

//             //     }
//             // },
//             {
//                 $project: {
//                     username: 1,
//                     password: 1,
//                     role: 1
//                 }
//             }
//             // {
//             //     $group: {
//             //         _id: "$role"
//             //     }
//             // },
//             // { $sort: { total: -1 } }
//         )
//             .exec((err, records) => {
//                 console.log(records)
//                 if (err) {
//                     return reject(err);
//                 }
//                 mongoose.connection.close();
//                 return resolve({
//                     username: _.sumBy(records, function (o) { return o.username; }),
//                     password: _.sumBy(records, function (o) { return o.password; }),
//                     userRole: _.sumBy(records, function (o) { return o.role; }),
//                 });
//             });
//     })
//         .then((data) => {
//             let wb = new xl.Workbook();
//             let ws = wb.addWorksheet('Sheet 1');
//             let style = wb.createStyle({
//                 font: {
//                     color: '#FF0800',
//                     size: 12
//                 },
//                 numberFormat: '$#,##0.00; ($#,##0.00); -'
//             });

//             // Hàng đầu tiên trong file excel
//             ws.cell(1, 1).string('Ten tai khoan').style(style);
//             ws.cell(1, 2).string('Mat khau').style(style);
//             ws.cell(1, 3).string('Vai tro').style(style);

//             // Hàng thứ 2
//             ws.cell(2, 1).number(data.username).style(style);
//             ws.cell(2, 2).number(data.password).style(style);
//             ws.cell(2, 3).number(data.userRole).style(style);

//             // Xuất file và lưu vào public/report 
//             // wb.write(`public/report/${Date.now()}.xlsx`);
//             wb.write(`./report/${Date.now()}.xlsx`);
//         })
//         .catch((err) => {
//             throw new Error('Lỗi truy vấn');
//         });
// }

// module.exports = todayReport;