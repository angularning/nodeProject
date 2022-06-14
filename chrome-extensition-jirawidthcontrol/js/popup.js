// 这里的js其实是操作popup.html产生的dom的
document.addEventListener('DOMContentLoaded', function () {
    // 获取初始值
    sendMessageToContentScript({ type: 'get_editable' }, (response) => {
      toggle.checked = ['true', true].includes(response) ? 'checked' : null;
    });
  
    // 切换contentEditable状态
    toggle.addEventListener('change', () => {
      sendMessageToContentScript({ type: 'toggle' });
    });
  });
  
  // 向content_scripts发送消息的函数
  function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        if (callback) callback(response);
      });
    });
  }
  