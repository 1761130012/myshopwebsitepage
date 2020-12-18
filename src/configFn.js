/**
 * 进行 换行
 * @param content 内容
 * @param size 间隔 距离
 * @returns {string|null}
 */
export function addLineBr(content, size) {
  if (typeof (content) === "string") {
    return addLineSub(content, 0, size);
  }
  return null;
}

function addLineSub(content, start, size) {
  if (content.substring(start, start + size).length > 0) {

    let value = content.substring(start, start + size);
    value += "</br>";
    value += addLineSub(content, start + size, size);
    return value;
  }
  return " ";
}

export default {
  addLineBr,
}
