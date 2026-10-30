var params = new URLSearchParams(location.search);
var herName = params.get("to") || CONFIG.herName || "";
var hisName = params.get("from") || CONFIG.yourName;
var nameBit = herName ? ", " + herName : "";
var rounds = CONFIG.rounds;
var step = 0, noClicks = 0, place = "";
var card = document.getElementById("card");

document.title = CONFIG.pageTitle;
var rs = document.documentElement.style;
rs.setProperty("--accent", CONFIG.accent);
rs.setProperty("--bg1", CONFIG.background1);
rs.setProperty("--bg2", CONFIG.background2);

function fill(s){ return String(s).replace(/\{name\}/g, nameBit); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

function floatHearts(n, emojis, minDur, spread, full){
  var box = document.getElementById("hearts");
  for (var i = 0; i < n; i++){
    var s = document.createElement("span");
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = (16 + Math.random() * 22) + "px";
    s.style.animationDuration = (minDur + Math.random() * spread) + "s";
    s.style.animationDelay = (full ? Math.random() * 1.5 : -Math.random() * 12) + "s";
    if (full) s.style.opacity = 1;
    box.appendChild(s);
  }
}

function dots(){
  var d = '<div class="dots">';
  for (var i = 0; i < rounds.length + 1; i++) d += '<i class="' + (i <= step ? "on" : "") + '"></i>';
  return d + '</div>';
}

function render(){
  if (step >= rounds.length) return renderDate();
  var r = rounds[step]; noClicks = 0;
  card.innerHTML = '<div class="fade"><div class="emoji">' + r.emoji + '</div><h1>' + esc(fill(r.title)) + '</h1><p>' + esc(fill(r.sub)) + '</p>' +
    '<div class="btns" id="btns"><button class="yes" id="yes">' + esc(r.yes) + '</button>' +
    '<button class="no" id="no">' + esc(r.no) + '</button></div>' + dots() + '</div>';
  var yes = document.getElementById("yes"), no = document.getElementById("no");
  yes.onclick = function(){ step++; render(); };

  function makeYes(){
    no.textContent = r.yes; no.className = "yes"; no.style.transform = "";
    no.onclick = yes.onclick; no.onmouseenter = no.ontouchstart = null;
  }

  if (r.mode === "dodge") {
    var run = function(e){
      if (e && e.preventDefault) e.preventDefault();
      var w = document.getElementById("btns").getBoundingClientRect().width;
      var x = (Math.random() - .5) * Math.max(0, w - 110);
      var y = (Math.random() - .5) * 90;
      noClicks++;
      no.style.transform = "translate(" + x + "px," + y + "px) scale(" + Math.max(.6, 1 - noClicks * .06) + ")";
      yes.style.transform = "scale(" + Math.min(1.5, 1 + noClicks * .07) + ")";
      if (noClicks > 6) makeYes();
    };
    no.onmouseenter = run; no.ontouchstart = run; no.onclick = run;
  } else {
    var texts = r.noTexts || [];
    no.onclick = function(){
      noClicks++;
      if (noClicks > texts.length) return makeYes();
      no.textContent = texts[noClicks - 1];
      yes.style.transform = "scale(" + Math.min(1.6, 1 + noClicks * .12) + ")";
      no.style.transform = "scale(" + Math.max(.7, 1 - noClicks * .07) + ")";
    };
  }
}

function renderDate(){
  var d = new Date(); d.setDate(d.getDate() + 1);
  var min = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  card.innerHTML = '<div class="fade"><div class="emoji">🎉</div><h1>' + esc(CONFIG.yayTitle) + '</h1><p>' + esc(CONFIG.yaySub) + '</p>' +
    '<label>📅 Which day?</label><input type="date" id="date" min="' + min + '">' +
    '<label>⏰ What time?</label><input type="time" id="time">' +
    '<label>💡 What should we do?</label><div class="chips">' +
    CONFIG.activities.map(function(p){ return '<button class="chip" type="button">' + esc(p) + '</button>'; }).join("") + '</div>' +
    '<label>💬 Anything to tell me? (optional)</label><textarea id="note" rows="2" placeholder="Your message…"></textarea>' +
    '<div class="err" id="err"></div><button class="yes" id="go">Confirm our date 💞</button>' + dots() + '</div>';
  var chips = card.querySelectorAll(".chip");
  chips.forEach(function(c){
    c.onclick = function(){ chips.forEach(function(x){ x.classList.remove("sel"); }); c.classList.add("sel"); place = c.textContent; };
  });
  document.getElementById("go").onclick = function(){
    var date = document.getElementById("date").value, time = document.getElementById("time").value;
    if (!date || !time) { document.getElementById("err").textContent = "Please pick a day and a time 🥺"; return; }
    renderDone(date, time, document.getElementById("note").value.trim());
  };
}

function renderDone(date, time, note){
  var pretty = new Date(date + "T12:00:00").toLocaleDateString(undefined, {weekday: "long", month: "long", day: "numeric"});
  var t = new Date("1970-01-01T" + time).toLocaleTimeString(undefined, {hour: "numeric", minute: "2-digit"});
  var msg = "💖 She said YES! 💖\n" + (herName ? herName : "She") + " accepted my love and our date is:\n📅 " + pretty + "\n⏰ " + t + (place ? "\n" + place : "") + (note ? "\n💬 " + note : "");
  var number = (params.get("wa") || CONFIG.whatsapp || "").replace(/\D/g, "");
  card.innerHTML = '<div class="fade"><div class="emoji">🥳</div><h1>' + esc(CONFIG.doneTitle) + '</h1>' +
    '<div class="summary">📅 <b>' + esc(pretty) + '</b><br>⏰ <b>' + esc(t) + '</b>' + (place ? '<br>' + esc(place) : '') + (note ? '<br>💬 ' + esc(note) : '') + '</div>' +
    '<p>Now let ' + esc(hisName) + ' know, he’s probably nervous right now 🫣</p>' +
    '<button class="yes" id="send">Send my answer 💌</button><div class="err" id="err"></div></div>';
  floatHearts(30, ["💖", "💗", "🎉", "✨", "🌹"], 3, 3, true);
  document.getElementById("send").onclick = function(){
    if (number) { window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(msg), "_blank"); return; }
    try { navigator.clipboard.writeText(msg).then(function(){ document.getElementById("err").textContent = "Copied! Paste it in a chat 💌"; }); }
    catch (e) { prompt("Copy this message:", msg); }
  };
}

floatHearts(16, ["💗", "💖", "💕", "🌸", "✨"], 7, 9, false);
render();
