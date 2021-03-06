// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix";

let socket = new Socket("/socket", {});

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("team:all", {});

channel.on("stat", msg => {

  var status = document.getElementsByClassName('status')[0];

  if(!msg.error) {
    var online = msg.online;
    var total = msg.total;

    var statusText;

    if (online == 0) {
      statusText = "<b class=\"total\">" + total + "</b> user" + (total>1?"s":"") + " registered.";
    } else {
      statusText = "<b class=\"active\">" + online + "</b> user" + (online>1?"s":"") + " online now" +
        " of <b class=\"total\">" + total + "</b> registered.";
    }

    status.innerHTML = statusText;
    status.style.display = 'block';

    document.getElementsByClassName('api-available')[0].style.display = 'none';
  } else {
    status.style.display = 'none';
  }
});

channel.on("api-unavailable", msg => {
  document.getElementsByClassName('api-available')[0].style.display = 'block';
});

export default channel;
