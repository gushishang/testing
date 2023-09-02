/**
 * 将文本中的项目名称替换为对应的链接标记。
 * @param {string} text - 要替换的文本。
 * @param {string} signal - 替换标记的信号，默认为 "%"，可为空。
 * @returns {string} - 替换后的文本。
 */
function replaceProjectNames(text, signal="%") {
  let replacedText = text;
  const replacements = [
    ["黑洞区精选条例", "6485d5f69b2695a9991939af"],
    ["实验区精选条例", "6302f66823f7f0000130d33a"],
    ["管理条例", "620665aad58bcf00016aeb8b"],
    ["新用户生存指南","6072a5cbf6fe9b0001d81703"],
    ["志愿者要求一览","63c02f294906dcddc28cea8f"],
    ["编辑大选流程","64de27297a183ea955748940"],
    ["问与答要求","64cb128ac4065fef0728879c"],
    ["违禁词修订","64df8b125b2d2f2c3ac8a7a4"],
    ["精选激励计划","64dde4a57a183ea955747948"],
    ["成为大佬","60da78eefdb33a0001226d07"],
    ["物实档案馆","63da10ebbb2954876dee6b20"],
    ["强基计划","626156d70948e50001d88cd6"],
    ["强基计划作品列表","6263e2be0948e50001d8eaa0"],
    ["解忧咨询室","62f1d55dafedf1000165551b"],
    ["物实里的城","63d4ae9d4906dcddc2928389"],
    ["物实百科全书2023.6.13词典版","6487e6b89b2695a999195323"],
    ["码字消失的解决方案","648effe89b2695a99919ff11"],
    ["你是多老的用户","62144cf131d9a6000148553a"], 
    ["导航-冰","6282fdecf1766800018dad23"],
    ["黑洞精选列表","639dec11232e9c2f98611f28"]
  ];
  replacements.forEach((replacement) => {
    const [find, replace] = replacement;
    replacedText = replacedText.replace(new RegExp(signal +find +signal, 'g'), "<discussion="+replace+">"+find+"</discussion>");
  });
  return replacedText;
}

/**
 * 用于替换特定格式的标签为指定内容。
 * @param {string} markdown - 待处理的 Markdown 字符串。
 * @returns {string} - 处理后的 Markdown 字符串。
 *
 * @example
 * // 示例用法
 * const markdown = "<实验 参数1 参数2>";
 * const replacedMarkdown = replaceContent(markdown);
 * console.log(replacedMarkdown);
 * // 输出结果： "<experiments=Tags/参数1 参数2></experiments>"
 *
 * const markdownWithDiscussion = "<讨论 参数3>";
 * const replacedMarkdownWithDiscussion = replaceContent(markdownWithDiscussion);
 * console.log(replacedMarkdownWithDiscussion);
 * // 输出结果： "<discussions=Tags/参数3></discussions>"
 *
 * const plainMarkdown = "这是一段普通的 Markdown 文本。";
 * const replacedPlainMarkdown = replaceContent(plainMarkdown);
 * console.log(replacedPlainMarkdown);
 * // 输出结果： "这是一段普通的 Markdown 文本。"
 */
function replacePhysicsUrl(markdown) {
  var regex = /<(实验|讨论) (.*?)>/g;

  return markdown.replace(regex, function(match, tag, param) {
    var replacedTag = tag.replace("实验", "experiment").replace("讨论", "discussion");
    return `<${replacedTag}s=Tags/${param}>最新${param}作品列表</${replacedTag}s>`;
  });
}

/**
 * 用于替换输入字符串中的 APP 标识符为指定格式的字符串。
 * @param {string} input - 待处理的字符串。
 * @param {boolean} [removeSize=false] - 是否移除字体大小标签，默认为 false。
 * @returns {string} - 处理后的字符串。
 *
 * @example
 * // 示例用法
 * const input = "我喜欢使用微信和支付宝。";
 * const replaced = replaceApps(input);
 * console.log(replaced);
 * // 输出结果： "我喜欢使用<size=60><color=#05ca64></color></size>和<size=60><color=#0e73fc></color></size>。"
 *
 * const inputWithSize = "我喜欢使用大号微信和小号支付宝。";
 * const replacedWithoutSize = replaceApps(inputWithSize, true);
 * console.log(replacedWithoutSize);
 * // 输出结果： "我喜欢使用和。"
 */
function replaceApps(input, removeSize = false) {
  const rules = new Map([
    ['', { color: '#05ca64', replace: '微信' }],
    ['', { color: '#0e73fc', replace: '支付宝' }],
    ['', { color: '#e6162d', replace: '微博' }],
    ['', { color: '#3038c3', replace: '百度' }],
    ['', { color: '#c2172d', replace: '华为' }],
    ['', { color: '#fb6b04', replace: '小米' }],
    ['', { color: '#aacd06', replace: '安卓' }],
    ['', { color: '#1b71b0', replace: 'Intel' }],
    ['', { color: '#83b719', replace: 'Acer' }],
    ['', { color: '#77b900', replace: 'NVIDIA' }],
    ['', { color: '#144e81', replace: 'Steam' }],
    ['', { color: '#00a660', replace: '星巴克' }],
    ['', { color: '#ff001e', replace: 'YouTube' }],
    ['', { color: '#2d8dc5', replace: 'Twitter' }],
    ['', { color: '#1374f4', replace: 'Facebook' }],
    ['', { color: '#05adf0', replace: 'Skype' }],
    ['', { color: '#44d531', replace: '印象笔记' }],
    ['', { color: '#3374e3', replace: 'Dropbox' }],
    ['', { color: '#f90404', replace: 'Adobe' }],
    ['', { color: '#12b3fa', replace: 'Appstore' }]
  ]);

  let output = input;
  for (const [code, rule] of rules) {
    const regex = new RegExp(`:${rule.replace}:`, 'gi');
    output = output.replace(regex, removeSize ? code : `<size=60><color=${rule.color}>${code}</color></size>`);
  }

  return output;
}


/**
 * 对传入的 Markdown 文本进行处理，并返回处理后的结果。
 * @param {string} text - 需要处理的 Markdown 文本。
 * @returns {string} 处理后的 Markdown 文本。
 */
function processMarkdown(text) {
    console.log(typeof text);
  // 英文大小写规范化
  const dictionary = [
  'Gitee',
  'GitHub',
  'Foursquare',
  'Microsoft',
  'Google',
  "John Chen",
  "bushi",
  "doge",
  "issue",
  "issues",
  "Facebook",
  "Inc",
  'Pull Request',
  'PR',
  "repo",
  'Physics Lab',
  'turtlesim',
  'LLC',
  'PR']; 
  for (const word of dictionary) {
    const regExp = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regExp, word);
  }
const replacements = [
  [/([\u4e00-\u9fa5]+)([a-zA-Z]+)/g, '$1 $2'],
  [/([a-zA-Z]+)([\u4e00-\u9fa5]+)/g, '$1 $2'],
  [/([?!？！@])+/g, '$1'],
  [/\.{2,}|\。{2,}/g, '……'],
  [/:|,|;|\?|!|\./g, ' $&'],
  [/([,;.?!])([a-zA-Z\u4e00-\u9fa5])/g, '$1 $2'],
  [/(\d)([^a-zA-Z\u4e00-\u9fa5])/g, '$1$2'],
  [/([\u4e00-\u9fa5])(\d)/g, '$1 $2']
];

function p(text) {
  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
    console.log(text);
  }
  return text;
}
  return p(text);
}

/**
* 将Markdown转换为Unity富文本格式的函数，这个是简化版本
* @param {string} markdown - Markdown格式的文本
* @returns {string} - 转换为Unity富文本格式后的文本
*/

function markdownToUnity(markdown) {
  const headers = [
    { r: /^#####\s(.*)/gm, s: 27 },
    { r: /^####\s(.*)/gm, s: 30 },
    { r: /^###\s(.*)/gm, s: 38 },
    { r: /^##\s(.*)/gm, s: 45 },
    { r: /^#\s(.*)/gm, s: 52 }
  ];

  headers.forEach(header => {
    markdown = markdown.replace(header.r, `<b><size=${header.s}>$1</size></b>`);
  });

  const replacements = [
    [/\<font size=(.*?)\>(.*?)<\/font\>/g, "<size=$1>$2</size>"],
    [/`(.*?)`/g, "<#AAA>`$1`</>"],
    [/<(.*?)>(.*?)<\/>/g, "<color=$1>$2</color>"],
    [/^~~~$|^---$|^\*\*\*$/gm, "==========换行========="],
    ["[F]", "<color=red></color>"],
    ["[T]", "<color=#4f0></color>"],
    [/^\s*-\s*(.*)$/gm, "<size=20>● </size> $1"],
    [/\*\*(.*?)\*\*/g, "<b>$1</b>"],
    [/\*(.*?)\*/g, "<i>$1</i>"]
  ];

  for (const [regex, replacement] of replacements) {
    markdown = markdown.replace(regex, replacement);
  }

  markdown = markdown.replace(/```(.*?)```/gs, (match, code) => {
    code = code.trim().replace(/^(.*)$/gm, "$1");
    return `<color=#AAAAAA>${code}</color>`;
  });

  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return `<color=#808080>[图片]</color>[${alt || '暂无描述'}]`;
    } else if (url.match(/^https:\/\/turtlesim\.com\/plc\/\?chinese-(experiment|user|discussion)-(\d+)\?$/)) {
      const keyword = RegExp.$1;
      const number = RegExp.$2;
      return `<${keyword}=${number}>${alt}</${keyword}>`;
    } else {
      return `<color=#2881e0></color><color=#2981E6>${alt}</color>`;
    }
  });

  markdown = markdown.replace(/^>(\s+)?([^ ].*)/gm, (match, space, content) => {
    if (space !== undefined) {
      return `  <color=#666> | ${content}</color>`;
    } else {
      return match;
    }
  });

  function replaceCounters(markdown) {
    const lines = markdown.split('\n');
    let counter = 1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('+ ')) {
        lines[i] = lines[i].replace(/^\+ /, `${counter}. `);
        counter++;
      } else {
        counter = 1;
      }
    }
    return lines.join('\n');
  }

  markdown = replaceCounters(markdown);

  function convertToStrikethrough(text) {
    const pattern = /~~(.*?)~~|<del>(.*?)<\/del>/g;

    const result = text.replace(pattern, (match, p1, p2) => {
      let str = '';
      const strikeThroughChar = '<size=60>̶</size>';
      if (p1) {
        str = p1.split('').map(char => char + strikeThroughChar).join('');
      } else if (p2) {
        str = p2.split('').map(char => char + strikeThroughChar).join('');
      }
      return str;
    });

    return result;
  }

  markdown = convertToStrikethrough(markdown);

  return markdown;
}
/**
 * 将特殊文本转换为Unity富文本格式的函数
 * @param {string} markdown - Markdown格式的文本
 * @returns {string} - 转换为Unity富文本格式后的文本
 */
function specialTextToUnity(markdown) {
  const rules = ['注释', '授权', '链接', '注意', '禁止', '遗憾', '启发', 'bug', '方法', '纪念', '改进', '支持', '修复','赞', '现象', '目标', '讨论'];
  const replacements = [
    '<color=#aaa> | ',
    '<color=#017f> | ',
    '<color=#28e> | ',
    '<color=#cb1> | ',
    '<color=#f00> | ',
    '<color=#2ae> | ',
    '<color=#380> | ',
    '<color=#511> | ',
    '<color=#a60> | ',
    '<color=#fb0> | ',
    '<color=#135> | ',
    '<color=#091> | ',
    '<color=#a1f> | ',
    '<color=#f79> | ',
    '<color=#140> | ',
    '<color=#a09> | ',
    '<color=#076> | '
  ];

  const lines = markdown.split('\n'); // 将文本按行分割
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j = 0; j < rules.length; j++) {
      const keyword = rules[j];
      const regex = new RegExp(`^${keyword}\\s`, 'g');
      line = line.replace(regex, `${replacements[j]}$</color>`);
    }
    lines[i] = line;
  }

  return lines.join('\n'); // 将处理后的行重新合并为文本
}

/**
 * 将Markdown转换为Unity格式的文本
 * @param {string} markdown - 要转换的Markdown文本
 * @param {Object} [config] - 配置选项（可选）
 * @param {boolean} [config.app=true] - 是否进行replaceApps操作，默认为true
 * @param {boolean} [config.process=true] - 是否进行processMarkdown操作，默认为true
 * @param {boolean} [config.special=true] - 是否进行specialTextToUnity操作，默认为true
 * @param {boolean} [config.url=true] - 是否进行replacePhysicsUrl操作，默认为true
 * @returns {string} - 转换后的Unity格式文本
 *
 * @example
 * const markdown = '# Hello world!';
 * const config = {
 *   app: true,
 *   process: true,
 *   special: false
 * };
 * console.log(main(markdown, config));
 */

function display(markdown, config = { app: true, process: true, special: true, url:true, project:true }) {
  markdown = markdownToUnity(markdown);
  console.log(markdown, "第1次转换结果");

  const functions = [
    { condition: config.url !== false, func: replacePhysicsUrl},
    { condition: config.app[0] !== false, func: replaceApps, param2: config.app[1] },
    { condition: config.process !== false, func: processMarkdown },
    { condition: config.special !== false, func: specialTextToUnity},
    { condition: config.project[0] !== false, func: replaceProjectNames, param2: config.project[1] }
  ];

  for (const funcObj of functions) {
    if (funcObj.condition) {
      markdown = funcObj.func(markdown, funcObj.param2); // 将参数2传递给函数
    }
    console.log(markdown);
  }

  const specialChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  unityText = markdown.replace(/[&<>"']/g, char => specialChars[char]);
  return unityText;
}
