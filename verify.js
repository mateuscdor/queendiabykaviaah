const exec = require('child_process').exec;
const os = require("os");
async function startdiana() {
  var sdn = 'RUN git  https://github.com/diabykavii/queendiabykaaviaah /root/queendiana' + '\n'
  exec('sed -n 3p /root/queendiana/queendiabykaaviaah/Dockerfile', async (err, stdout, stderr) => {
    if (sdn !== stdout) {
      console.log("😒 Fake User Found •• Only For QUEEN DIANA-Bot Users !!");
    }
  })
}
     
module.exports = startdiana
