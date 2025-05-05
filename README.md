选译替换器
✨ 功能简介
该脚本允许用户在浏览器内的输入型元素中（如 <input>、<textarea> 或可编辑的 contenteditable 区域）进行如下操作：

选中文本后按下 Shift 键：自动将选中的文本翻译为目标语言，并替换原选中内容。

右上角浮动按钮：支持切换目标翻译语言。

若翻译 API 返回无效结果，会自动跳转至搜狗翻译页面以获取必要信息（如 Cookie、Code 等），这些信息每天会更新一次以保证翻译正常工作。

🖱️ 使用方法
用鼠标在网页上的输入框中选中一段文本。

按下 Shift 键。

选中的文本会被翻译成目标语言，并替换原文本内容。

🌐 支持的元素类型
<input type="text">

<textarea>

[contenteditable="true"]

其他用户可输入内容的 HTML 元素

🗺️ 语言切换功能
页面右上角会显示一个小按钮（悬浮样式）。

鼠标悬浮其上可切换翻译目标语言，自动检测需要翻译的文字。

当前语言状态会在按钮中简要显示。

🔁 翻译失败时的处理逻辑
如果接口响应异常、无翻译结果：

自动跳转 搜狗翻译页面。

自动提取并刷新以下信息：

并自动重新发起翻译请求。

💡 技术实现

使用 window.getSelection() 获取选中文本。
activeElement.selectionStart/End 计算选中文本位置。
selection.getRangeAt(0)适配 isContentEditable 为 true 的元素
