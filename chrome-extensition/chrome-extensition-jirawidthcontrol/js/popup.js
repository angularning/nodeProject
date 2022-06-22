// 这里的js其实是操作popup.html产生的dom的
document.addEventListener('DOMContentLoaded', function () {
    // 获取页面元素
    let enter = document.getElementById('enter');
    enter.onclick = function(element) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let classInput = document.getElementById('classInput');
            let dialogWidthInput = document.getElementById('dialogWidthInput');
            const classInputValue = classInput.value;
            const dialogWidthInputValue = dialogWidthInput.value;
            document.querySelector(classInputValue).style.width = dialogWidthInputValue + 'px';
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'document.querySelector("' + classInputValue + '").style.width = "' + dialogWidthInputValue + 'px";'}
            );
        });
    };

    // // 获取初始值
    // sendMessageToContentScript({ type: 'get_editable' }, (response) => {
    //   toggle.checked = ['true', true].includes(response) ? 'checked' : null;
    // });
    //
    // // 切换contentEditable状态
    // toggle.addEventListener('change', () => {
    //   sendMessageToContentScript({ type: 'toggle' });
    // });
  });

  // 向content_scripts发送消息的函数
  function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        if (callback) callback(response);
      });
    });
  }
