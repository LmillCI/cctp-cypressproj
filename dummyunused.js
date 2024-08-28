// let date = new Date();
// console.log(date.toISOString());

   

// let date = new Date(+new Date());
//     console.log("Milliseconds = " + date.toString());

// function getCurrentLocalTimeWithMilliseconds() {
//     let now = new Date();
//     let hours = ('0' + now.getHours()).slice(-2);
//     let minutes = ('0' + now.getMinutes()).slice(-2);
//     let seconds = ('0' + now.getSeconds()).slice(-2);
//     let milliseconds = ('00' + now.getMilliseconds()).slice(-3);
  
//     return `${hours}:${minutes}:${seconds}.${milliseconds}`;
//   }
  
//   console.log(getCurrentLocalTimeWithMilliseconds());
  

// function getCurrentLocalTimeWithMilliseconds() {
//     let now = new Date();
//     let year = now.getFullYear();
//     let month = ('0' + (now.getMonth() + 1)).slice(-2);
//     let day = ('0' + now.getDate()).slice(-2);
//     let hours = ('0' + now.getHours()).slice(-2);
//     let minutes = ('0' + now.getMinutes()).slice(-2);
//     let seconds = ('0' + now.getSeconds()).slice(-2);
//     let milliseconds = ('00' + now.getMilliseconds()).slice(-3);

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
// }

// console.log(getCurrentLocalTimeWithMilliseconds());


function getUTC() {
    const now = new Date(1723100415217)
    console.log(now.toString())
    console.log(now.toISOString())
    console.log(now.toUTCString())
    return now.toISOString()

  }
  getUTC()