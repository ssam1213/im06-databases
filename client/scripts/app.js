// URL 설정
var userName = prompt('이름을 입력 해주세요');
if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  newSearch += 'username=' + (userName || 'anonymous');
  window.location.search = newSearch;
}

// app 모듈화
var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  storage : ['room1', 'room2', 'room3'],
  friends : [],
  init : () => $(document).ready(() => {
    app.fetch();
    app.makeRoomList();

    $(document).on('click', '#index', app.fetch);
    $(document).on('click', '#post-message', app.send);
    $(document).on('click', '.username span', app.beFriend);
    $(document).on('click', '#roomChoice', app.showSpecificRoom);
  }),

  send : (data) => $.ajax({
    url : app.server,
    type : 'POST',
    contentType : 'application/json',
    data: JSON.stringify({
      username: userName,
      text: $('#massage').val(),
      roomname: $('#roomSelect option:selected').val()
    }),
    success: () => app.fetch()
  }),

  fetch: () => $.ajax({
    url : app.server,
    type : 'GET',
    success : (data) => {
      $('#chats').html('');
        data.forEach(({username, text, roomname, date}) => {
        username = XSSFilter(username);
        text = XSSFilter(text);
        roomnname = XSSFilter(roomname);
        var result = moment(date).startOf().fromNow();
        const $p = $(`<p class="username"><a href="#"><span id="name">${username}</span></a><br>${text}<br><span id="time">${result}</span></p>`);
        $('#chats').prepend($p);
      });
    }
  }),

  clearMessages : () => {$('#chats').html('');},

  // 친구
  beFriend : (event) => {
    var target = $(event.target).text();
    if(!app.friends.includes(target)){
      app.friends.push(target);
      console.log('Be friend!');
      app.friendFilter();
    }
    else console.log('Already your friend');
  },

  friendFilter : () => $.ajax({
    url : app.server,
    success :(data) => {
        $('#chats').html('');
        data.forEach(({username, text, roomname, date}) => {
          var result = moment(date).startOf().fromNow();
          if(app.friends.includes(username)) {
            var $friend = $(`<p class="username"><a href="#"><span id="name">${username}</span></a><br>${text}<br><span id="time">${result}</span></p>`);
            $('#chats').prepend($friend);
          }
        });
    }
  }),

  // 룸 카테고리
  renderRoom: (string) => {
    var $add = $(`<option value=${string}>${string}</option>`);
    $('#roomSelect').append($add);
  },

  roomFilter : () => $.ajax({
    url : app.server,
    success :(data) => {
        data.forEach(({roomname}) => {
        if(!app.storage.includes(roomname)) app.storage.push(roomname);
        });
        app.makeRoomList();
    }
  }),

  makeRoomList : () => {
    for(var i = 0; i < app.storage.length; i++){
      app.renderRoom(app.storage[i]);
    }
  },

  showSpecificRoom : () => $.ajax({
    url : app.server,
    success : (data) => {
      var target = $('#roomSelect').val();
      console.log(target);
      console.log(data);
      $('#chats').html('');
        data.forEach(({username, text, roomname, date}) => {
          var result = moment(date).startOf().fromNow();
          if(target === roomname){
            var $t = $(`<p class="username"><a href="#"><span id="name">${username}</span></a><br>${text}<br><span id="time">${result}</span></p>`);
            $('#chats').append($t);
          }
      });
    }
  }),
};

// 실행
app.init();

var XSSFilter = (target) => {
  var output = target.replace("<", "&lt;");
  output = output.replace(">", "&rt;");
  return output;
};


