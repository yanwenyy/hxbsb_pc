export function creatH(vid) {
  var html = '<script src="https://p.bokecc.com/player?vid='+vid+'&siteid=A0123BC413D6FBAE&autoStart=false&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1" type="text/javascript"></script>';
  var cont = document.getElementById('cont');
  cont.innerHTML = html;
  var oldScript = cont.getElementsByTagName('script')[0];
  cont.removeChild(oldScript);
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = oldScript.src;
  cont.appendChild(newScript);
}
