

// declare global {
//   interface Window {
//     serial: Serial
//   }
//   interface Navigator {
//     serial: NavigatorSerial
//   }
// }


import * as intel_hex from 'intel-hex';
import { version } from '../package.json';

export default async () => {
    const text = await fetch("hexFileHref")
    .then((response) => response.text())

    let { data: hex } = intel_hex.parse(text)

    navigator.serial
    .requestPort({ filters: [  { usbVendorId: 0x2341, usbProductId: 0x0001 }] })
    .then(async (port) => {
      const verify = false;

      const { usbProductId, usbVendorId } = port.getInfo();
      console.log(usbProductId, usbVendorId);
      await port.open({ baudRate: 115200 });
      const writer = port.writable.getWriter();





      const stk500 = new Stk500();
      let sent = 0;
      let total = hex.length / board.pageSize;

      if (verify) {
        total *= 2;
      }

      // arduino-web-uploader-master
      stk500.log = (what) => {
        // if (what === 'page done' || what === 'verify done') {
        //   sent += 1
        //   const percent = Math.round((100 * sent) / total)
        //   onProgress(percent)
        // }
        console.log(what, sent, total, hex.length, board.pageSize)
      }

      await async.series([
        // send two dummy syncs like avrdude does
        stk500.sync.bind(stk500, serialStream, 3, board.timeout),
        stk500.sync.bind(stk500, serialStream, 3, board.timeout),
        stk500.sync.bind(stk500, serialStream, 3, board.timeout),
        stk500.verifySignature.bind(stk500, serialStream, board.signature, board.timeout),
        stk500.setOptions.bind(stk500, serialStream, {}, board.timeout),
        stk500.enterProgrammingMode.bind(stk500, serialStream, board.timeout),
        stk500.upload.bind(stk500, serialStream, hex, board.pageSize, board.timeout, board.use_8_bit_addresseses),
        !verify ? noop : stk500.verify.bind(stk500, serialStream, hex, board.pageSize, board.timeout, board.use_8_bit_addresseses),
        stk500.exitProgrammingMode.bind(stk500, serialStream, board.timeout),
      ]);


      writer.releaseLock();
    })
    .finally(() => {

    })
    .catch((e) => {
      
    });

    

    const serialStream = await serial.connect({ baudRate: 115200 }, portFilters)
}

navigator.serial.addEventListener("connect", (e) => {
  // Connect to `e.target` or add it to a list of available ports.
});
  
  navigator.serial.addEventListener("disconnect", (e) => {
    // Remove `e.target` from the list of available ports.
  });
  
  navigator.serial.getPorts().then((ports) => {
    // Initialize the list of available ports with `ports` on page load.
  });
  
